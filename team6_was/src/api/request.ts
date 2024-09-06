import axios from 'axios';
import {
  CrawNaverMapResponse,
  GetRecommend,
  KakaoFoodDetectionResponse,
  LatLng,
  NaverGeocodingResponse,
  NaverLocationResponse,
} from './type';

// BASE URLS
const kakaoBaseUrl = '/api/ai/vision/c55bd2a0b70647ed97519363a94e3648';
const naverBaseUrl = '/naver/v1/search/local.json';
const geocodingReverseBaseUrl = '/geocoding/map-reversegeocode/v2/gc';
const geocodingBaseUrl = '/geocoding/map-geocode/v2/geocode';
const crawlBaseUrl = '/craw';

// API KEYS
const {
  VITE_KAKAO_KEY,
  VITE_NAVER_CLIENT_KEY,
  VITE_NAVER_SECRET_KEY,
  VITE_GEOCODING_CLIENT_KEY,
  VITE_GEOCODING_SECRET,
} = import.meta.env;

// HEADERS
const kakaoBaseHeaders = {
  'x-api-key': VITE_KAKAO_KEY,
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'multipart/form-data',
};

const naverBaseHeaders = {
  'X-Naver-Client-Id': VITE_NAVER_CLIENT_KEY,
  'X-Naver-Client-Secret': VITE_NAVER_SECRET_KEY,
  'Access-Control-Allow-Origin': '*',
  'content-type': 'application/json',
};

const geocodingBaseHeaders = {
  'X-NCP-APIGW-API-KEY-ID': VITE_GEOCODING_CLIENT_KEY,
  'X-NCP-APIGW-API-KEY': VITE_GEOCODING_SECRET,
};

// 카카오 음식 인식 요청
const kakaoFoodDetectionRequest = (formData: FormData) => {
  return axios.post<KakaoFoodDetectionResponse>(kakaoBaseUrl, formData, {
    headers: kakaoBaseHeaders,
  });
};

// 네이버 장소 검색 요청
const naverLocationSearchRequest = (query: string) => {
  const url = `${naverBaseUrl}?query=${query}&display=10&start=3&sort=random`;
  return axios.get<NaverLocationResponse>(url, { headers: naverBaseHeaders });
};

// 네이버 [위도, 경도] -> [주소]
const geocodingReverseRequest = (latlng: LatLng) => {
  const url = `${geocodingReverseBaseUrl}?coords=${latlng.longitude},${latlng.latitude}&output=json&orders=addr`;
  return axios.get<NaverGeocodingResponse>(url, {
    headers: geocodingBaseHeaders,
  });
};

// 네이버 [주소] -> [위도, 경도]
const geocodingRequest = (address: string) => {
  const url = `${geocodingBaseUrl}?query=${address}`;
  return axios.get<NaverGeocodingResponse>(url, {
    headers: geocodingBaseHeaders,
  });
};


const crawlRequest = (address: string) => {
  const url = `${crawlBaseUrl}?search=${address}`;
  return axios.get<CrawNaverMapResponse>(url, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
};
const getRecommend = () => {
  const url = '/db/recommend';
  return axios.get<GetRecommend>(url);
};

const searchResultRequest = (tag: string[]) => {
  const body = {
    searchword: tag
  }

  const url = '/db/searchpost'
  return axios.post<any>(url, body)
}

export {
  kakaoFoodDetectionRequest,
  naverLocationSearchRequest,
  geocodingReverseRequest,
  geocodingRequest,
  crawlRequest,
  getRecommend,
  searchResultRequest
};
