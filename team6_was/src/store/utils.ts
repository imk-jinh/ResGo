import { UnwrapNestedRefs } from "vue"
import { AsyncState, AsyncStore, Effect, StoreStates } from "./type"

export const asyncUtils = {
  initial: <T, E = any>(data?: T, error?: E): AsyncState<T, E> => ({
    loading: true,
    data: data ?? null,
    error: error || null
  }),

  loading: <T, E>(): AsyncState<T, E> => ({
    loading: true,
    data: null,
    error: null
  }),

  fulfilled: <T>(data: T): AsyncState<T> => ({
    loading: false,
    data, 
    error: null
  }),

  error: <T, E = any>(error: E): AsyncState<T, E> => ({
    loading: false,
    data: null,
    error
  }),
}

/**
 * 비동기 처리과정을 일괄 수행하는 흐름을 만듭니다.
 * @param states 관리할 스토어의 states 객체입니다. 
 */
export const createAsyncStoreCallback = (states: AsyncStore) => {
  const { loading, fulfilled, error } = asyncUtils

  type State = keyof StoreStates
  
  /**
   * @param state 관리할 state 입니다.
   * @param effect 요청할 비동기 함수와 추가 효과입니다.
   */
  return async (state: State, effect: Effect | Effect["callback"]): Promise<void> => {    
    const { callback , onLoaded, onError } = typeof effect === 'function' ? { 
      callback: effect, 
      onLoaded: null,
      onError: (e: unknown) => console.log(e)
    } : effect

    states[state] = loading()

    callback()
      .then(result => {
        states[state] = fulfilled(result)
        onLoaded && onLoaded(result)
      })      
      .catch((e: unknown) => {
        states[state] = error(e)
        onError && onError(e)
      })
  }
}
