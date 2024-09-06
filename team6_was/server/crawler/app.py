from flask import Flask, escape, request
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC #selenium에서 사용할 모듈 import
import json
import time
import requests
from bs4 import BeautifulSoup
import re
import csv

options = webdriver.ChromeOptions()


driver = webdriver.Chrome("./chromedriver", chrome_options=options) #selenium 사용에 필요한 chromedriver.exe 파일 경로 지정:

def crawlNaver(query):
    driver.get("https://map.naver.com/v5/") #네이버 신 지도 
    try:
        element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "input_search"))
        ) #입력창이 뜰 때까지 대기
    finally:
        pass   
    search_box = driver.find_element(By.CLASS_NAME, "input_search")
    search_box.send_keys(query)
    search_box.send_keys(Keys.ENTER)

    time.sleep(4) #화면 표시 기다리기
    # frame = driver.find_element(By.CSS_SELECTOR, "iframe#searchIframe")


    # '//*[@id="app-root"]/div/div/div/div[2]'

    # driver.switch_to.frame(frame)
    frame = driver.find_element(By.CSS_SELECTOR, '#entryIframe')
    driver.switch_to.frame(frame)

    star = 0

    # 별점
    try:
      star = driver.find_element(By.XPATH, '/html/body/div[3]/div/div/div/div[2]/div[1]/div[2]/span[1]/em').text
    except:
      star = 0

    print(star)

    # 음식
    menus = driver.find_elements(By.CLASS_NAME, 'gHmZ_')
    lists = []

    # 이미지가 없을 경우
    for menu in menus:
      food_name_container = menu.find_element(By.CLASS_NAME, 'place_bluelink')
      food_price_container = menu.find_element(By.CLASS_NAME, 'awlpp')
      food_price = food_price_container.text
      food_name = food_name_container.text
      
      lists.append({ 'food_name': food_name, 'food_price': food_price})
      print(food_name, food_price)


    # 이미지가 있을 경우
    if len(lists) == 0:
       food_containers = driver.find_elements(By.CLASS_NAME, 'yhGu6')
       for food_container in food_containers:
          food_name_container = food_container.find_element(By.CLASS_NAME, 'MENyI')
          food_price_container = food_container.find_element(By.CLASS_NAME, 'gl2cc')
          lists.append({ 'food_name': food_name_container.text, 'food_price': food_price_container.text})

    # 영업 시작 시간 추출
    openTimeWrapper = driver.find_element(By.CLASS_NAME, 'U7pYf')
    openTime = openTimeWrapper.find_element(By.TAG_NAME, 'time').text
    
    food_dict = {
      'star': star,
      'lists': lists,
      'openTime': openTime
    }
    return food_dict

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

@app.route('/')
def main():
    query = request.args.get('search')
    result = crawlNaver(query)
    res = json.dumps(result, ensure_ascii=False).encode('utf8')
    return res

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
