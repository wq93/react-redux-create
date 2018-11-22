// 迷你redux
export function createStore(reducer) {
  let currentState = {}
  let currentListeners = []
  const getState = () => currentState
  const subscribe = listener => {
    currentListeners.push(listener)
  }
  const dispatch = action => {
    currentState = reducer(currentState, action)
    currentListeners.forEach(v => v())
    return action
  }
  dispatch({type: '@MY_REDUX'})
  return {getState, subscribe, dispatch}
}