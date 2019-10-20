import {combineReducers} from 'redux'
import {LOG_IN_SENT, LOG_IN_FULFILLED, LOG_IN_REJECTED,
  FETCHING_PAGES_REQUEST_SENT, FETCHING_PAGES_REQUEST_FULFILLED, FETCHING_PAGES_REQUEST_REJECTED,
  FETCHING_SECTIONS_REQUEST_SENT, FETCHING_SECTIONS_REQUEST_FULFILLED, FETCHING_SECTIONS_REQUEST_REJECTED,
  POST_SECTION_REQUEST_SENT, POST_SECTION_REQUEST_FULFILLED, POST_SECTION_REQUEST_REJECTED,
  PAGE_CREATION_REQUEST_SENT, PAGE_CREATION_REQUEST_FULFILLED, PAGE_CREATION_REQUEST_REJECTED,
  RESET_ERROR_MESSAGE, RESET_FEEDBACK_MESSAGES
} from './actions'

const merge = (prev, next) => Object.assign({}, prev, next)

const userReducer = (state = {}, action) => {
  switch(action.type) {
    case LOG_IN_FULFILLED:
      return merge(state, {token: action.payload})
    case LOG_IN_REJECTED:
      return merge(state, {loginErr: action.payload})
    default:
      return state
  }
}

const pageReducer = (state = {}, action) => {
  switch(action.type) {
    case FETCHING_SECTIONS_REQUEST_FULFILLED:
      return merge(state, {sections: action.payload})
    case FETCHING_SECTIONS_REQUEST_REJECTED:
      return merge(state, {fetchingErr: action.payload})

    case POST_SECTION_REQUEST_FULFILLED:
      return merge(state, {sectionPostSuccess: action.payload})
    case POST_SECTION_REQUEST_REJECTED:
      return merge(state, {sectionPostErr: action.payload})

    case PAGE_CREATION_REQUEST_FULFILLED:
      return merge(state, {pageCreatedMessage: action.payload})
    // case PAGE_CREATION_REQUEST_REJECTED:
    //   return merge(state, {pageCreationErr: action.payload})

    default:
      return state
  }
}

const pagesReducer = (state = {}, action) => {
  switch(action.type) {
    case FETCHING_PAGES_REQUEST_FULFILLED:
      return merge(state, {recent: action.payload.recent, popular: action.payload.popular})
    case FETCHING_PAGES_REQUEST_REJECTED:
      return merge(state, {fetchingErr: action.payload})
    default:
      return state
  }
} 

const feedbackMessagesReducer = (state = null, action) => {
  if (action.type === RESET_FEEDBACK_MESSAGES) {
      return {success: null, error: null}
  } else if (action.error) {
    return merge(state, {error: action.error})
  } else if (action.success) {
    return merge(state, {success: action.success})
  }
  return state
}


export default combineReducers({
  user: userReducer,
  page: pageReducer,
  pages: pagesReducer,
  feedbackMessage: feedbackMessagesReducer,
})