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

//包装单个dispatch函数
//addGun(参数)
//dispatch(addGun(参数))
function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args))
}

//包装多个dispatch的工具函数
// 形参creators 好比是 {addGun,removeGun,..} 对象里每项是函数
export function bindActionCreators(creators, dispatch) {
  let bound = {}
  Object.keys(creators).forEach(v => {
    let creator = creators[v]
    bound[v] = bindActionCreator(creator, dispatch)
  })
  return bound
}