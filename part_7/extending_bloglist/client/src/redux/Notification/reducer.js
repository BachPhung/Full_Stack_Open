import { combineReducers } from 'redux'
import blogService from '../../services/blogs'

const notiReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_MESSAGE': {
    return action.payload
  }
  case 'CLEAR_MESSAGE': {
    return ''
  }
  default: return state
  }
}
const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'SET_BLOG': {
    return action.payload
  }
  case 'ADD_BLOG': {
    return state.concat(action.payload)
  }
  case 'REMOVE_BLOG':{
    return state.filter(s => s.id!==action.payload)
  }
  default: return state
  }
}

const reducer = combineReducers({
  noti: notiReducer,
  blog: blogReducer
})

export const fetchBlogs = () => async (dispatch) => {
  const res = await blogService.getAll()
  dispatch({
    type: 'SET_BLOG',
    payload: res
  })
}

export default reducer