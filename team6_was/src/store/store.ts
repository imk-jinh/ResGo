import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { ImgResult, Model } from './type';
import { asyncUtils } from './utils';

import {
  CrawNaverMapResponse,
  GetRecommend,
  KakaoFoodDetectionResult,
  Recommend,
  crawlRequest,
  geocodingRequest,
  geocodingReverseRequest,
  getRecommend,
  kakaoFoodDetectionRequest,
  naverLocationSearchRequest,
  searchResultRequest,
} from '../api';

import { LatLng, ResultItem } from '../api';

import axios from 'axios';

const { initial } = asyncUtils;

export const useStore = defineStore('store', () => {
  // 비동기 상태
  const asyncStates = reactive({
    imgResult: initial<ImgResult>(),
    model: initial<Model>(),
    result: initial<string[]>(),
    naverLocationSearchResult: initial<(ResultItem & LatLng)[]>(),
    currentPosition: initial<LatLng>(),
    address: initial<any>(),
    location: initial<any>(),
    storeDetail: initial<CrawNaverMapResponse>(),
    recommends: initial<string[]>([]),
  });

  // 상태
  const states = reactive({
    imgTags: [],
    imgUrl: '',
    currentSearch: '',
    selectedStoreId: null as number | null,
    isSearchSuccess: true as boolean,
  });

  // 비동기스토어 관리함수 초기화
  // const asyncStateCallback = createAsyncStoreCallback(asyncStates)

  // 카카오 음식 인식 요청
  const requestKakao = async (img: File): Promise<string[]> => {
    const { result } = asyncStates;
    result.loading = true;

    const imgBinary = new FormData();
    imgBinary.append('image', img);

    try {
      const res = await kakaoFoodDetectionRequest(imgBinary);

      result.data = [
        ...new Set(
          res.data.result
            .filter(
              (value: KakaoFoodDetectionResult) => value.h * value.w > 10000
            )
            .sort((value, target) =>
              value.h * value.w > target.h * target.h ? -1 : 1
            )
            .map((value) => value.class_info[0].food_name)
        ),
      ];

      postSearch(result.data);

      return result.data;
    } catch (e: unknown) {
      throw e;
    } finally {
      result.loading = false;
    }
  };

  // 네이버 장소 검색 요청
  const requestNaver = async (query: string): Promise<void> => {
    states.isSearchSuccess = true;
    const { naverLocationSearchResult } = asyncStates;
    naverLocationSearchResult.loading = true;

    if (!query) states.isSearchSuccess = false;
    const qs = query ?? '주변맛집';

    try {
      const res = await naverLocationSearchRequest(qs);
      const items = res.data.items;
      const locations = await axios.all(
        items.map((item: ResultItem) => loadLocationByAddress(item.address))
      );
      naverLocationSearchResult.data = items.map(
        (item: ResultItem, i: number) => ({
          ...item,
          ...locations[i],
          id: i,
          title: item.title.replace(/<\/?b>/gi, ''),
        })
      );

      states.currentSearch = qs;
    } catch (e: unknown) {
      throw e;
    } finally {
      naverLocationSearchResult.loading = false;
    }
  };

  // 현재 위치 불러오기
  const loadLatLng = async () => {
    const { currentPosition } = asyncStates;
    currentPosition.loading = true;

    navigator.geolocation.getCurrentPosition(
      (success: GeolocationPosition) => {
        const { latitude, longitude } = success.coords;
        currentPosition.data = { latitude, longitude };
      },
      (error: unknown) => {
        console.log(error);
      }
    );

    currentPosition.loading = false;
  };

  // 네이버 [주소] -> [위도, 경도]
  const loadAddressByLocation = async (latlng: LatLng) => {
    const { address } = asyncStates;
    address.loading = true;

    try {
      const res = await geocodingReverseRequest(latlng);
    } catch (e) {
      console.log(e);
    } finally {
      address.loading = false;
    }
  };

  // 네이버 [위도, 경도] -> [주소]
  const loadLocationByAddress = async (address: string): Promise<LatLng> => {
    const { location } = asyncStates;
    location.loading = true;

    try {
      const res = await geocodingRequest(address);
      const { x: longitude, y: latitude } = res.data.addresses[0];

      return {
        latitude: Number(latitude),
        longitude: Number(longitude),
      };
    } catch (e) {
      return {
        latitude: 0,
        longitude: 0,
      };
    } finally {
      location.loading = false;
    }
  };

  const loadStoreDetail = async (address: string) => {
    const { storeDetail } = asyncStates;
    storeDetail.loading = true;

    try {
      const res = await crawlRequest(address);
      storeDetail.data = res.data;
    } catch (e) {
      console.log(e);
    } finally {
      storeDetail.loading = false;
    }
  };

  const loadRecommend = async () => {
    const { recommends } = asyncStates;

    recommends.loading = true;

    try {
      const res = await getRecommend();
      console.log(res);
      recommends.data = res.data.map((d: Recommend) => d.searchword);
    } catch (e) {
      console.log(e);
    } finally {
      recommends.loading = false;
    }
  };

  // tag 포스트 요청
  const postSearch = async (tags: string[]) => {
    try {
      await searchResultRequest(tags);
      console.log('post 요청 성고');
    } catch (e: unknown) {
      console.log('post 요청 실패');
    }
  };

  return {
    asyncStates,
    states,

    requestKakao,
    requestNaver,
    loadAddressByLocation,
    loadLocationByAddress,
    loadLatLng,
    loadStoreDetail,
    loadRecommend,
    postSearch,
  };
});
