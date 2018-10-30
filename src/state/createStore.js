import { createStore as reduxCreateStore } from "redux"

const reducer = (state, action) => {
  if (action.type === `VOTE`) {
    return Object.assign({}, state, {
      guesses: [...state.guesses, {
        name: action.name,
        photo: action.photo
      }]
    });
  }

  if (action.type === `REGISTER`) {
    return Object.assign({}, state, {
      name: action.name
    });
  }

  return state
}

const initialState = { guesses: [], name: '' }

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore
