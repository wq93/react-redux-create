import {createStore} from "./my_redux";

const ADD_GUN = 'ADD_GUN'
const REMOVE_GUN = 'REMOVE_GUN'

export function counter(state = 0, action) {
  switch (action.type) {
    case ADD_GUN:
      return state + 1
    case REMOVE_GUN:
      return state - 1
    default:
      return 10
  }
}

export function addGun() {
  return {type: ADD_GUN}
}

export function removeGun() {
  return {type: REMOVE_GUN}
}

const store = createStore(counter)
const init = store.getState()
console.log(`一开始有${init}`)

function listener() {
  const current = store.getState()
  console.log(`现在有${current}`)
}

store.subscribe(listener)

store.dispatch(addGun())
store.dispatch(removeGun())
