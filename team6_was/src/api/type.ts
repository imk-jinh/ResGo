// 기본 타입
type LatLng = {
  latitude: number;
  longitude: number;
};

// 카카오 음식 분석
interface KakaoFoodDetectionResponse {
  created: string;
  proc_secs: number;
  request_id: string;
  version: string;
  result: KakaoFoodDetectionResult[];
}

interface KakaoFoodDetectionResult {
  x: number;
  y: number;
  w: number;
  h: number;
  class_info: Class_Info[];
}

interface Class_Info {
  rank: number;
  food_name: string;
  prob: number;
  food_nutrients: any;
}

// 네이버 장소 검색
interface NaverLocationResponse {
  display: number;
  items: ResultItem[];
  lastBuildDate: string;
  start: number;
  total: number;
}

interface ResultItem {
  id: number;
  title: string;
  link: string;
  category: string;
  description: string;
  telephone: string;
  address: string;
}

// 네이버 geocoding
interface NaverGeocodingResponse {
  addresses: Address[];
  errorMessage: string;
  meta: Meta;
  status: string;
}

interface Address {
  addressElements: AddressElement[];
  roadAddress: string;
  jibunAddress: string;
  englishAddress: string;
  x: string;
  y: string;
}

interface Meta {
  totalCount: number;
  page: number;
  count: number;
}

interface AddressElement {
  types: string[];
  longName: string;
  shortName: string;
  code: string;
}

// 네이버 지도 크롤링
interface CrawNaverMapResponse {
  star: number;
  lists: MenuContent[];
  openTime: string;
}

interface MenuContent {
  food_name: string;
  food_price: string | number;
}

type Recommend = {
  searchword: string;
  cnt: number;
};
type GetRecommend = Recommend[];

export type {
  KakaoFoodDetectionResponse,
  KakaoFoodDetectionResult,
  Class_Info,
  NaverLocationResponse,
  ResultItem,
  NaverGeocodingResponse,
  CrawNaverMapResponse,
  MenuContent,
  LatLng,
  GetRecommend,
  Recommend,
};
