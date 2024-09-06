import cocoSsd from '@tensorflow-models/coco-ssd'

type AsyncState<T, E = any> = {
  loading: boolean
  data: T | null | undefined
  error: E | null
}

type StoreStates = {
 model: AsyncState<Model>,
 imgResult: AsyncState<ImgResult>
}

type ImgResult = cocoSsd.DetectedObject[]
type Model = Readonly<cocoSsd.ObjectDetection>


type Effect = {  

  /**
   * 요청할 비동기 함수입니다.
   * @param arg 비동기 함수에 넣을 인자입니다.
   */
  callback: (arg?: any) => Promise<any>

  /**
   * 요청된 결과를 통해 행할 추가 작업입니다.
   * @param result callback 비동기함수에서 반환한 결과값입니다.
   */
  onLoaded?: (result: any) => void | null
  
  /**
   * 에러 처리 리터럴입니다.
   * @param error 
   */
  onError?: ((error: unknown | undefined) => void) | null
}

type AsyncStore = {
  imgResult: AsyncState<any>
  model: AsyncState<any>
  result: AsyncState<string[]>
  naverLocationSearchResult: AsyncState<any[]>
}

export type {
  AsyncState,
  StoreStates,
  ImgResult,
  Model,
  Effect,
  AsyncStore,
}