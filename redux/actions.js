import {login, fetchPages, fetchPageSections, postNewPageSection, createPage} from '../api'

// action types
export const UPDATE_QUESTION = 'UPDATE_QUESTION'
export const LOG_IN_SENT = 'LOG_IN_SENT'
export const LOG_IN_FULFILLED = 'LOG_IN_FULFILLED'
export const LOG_IN_REJECTED = 'LOG_IN_REJECTED'

export const FETCHING_PAGES_REQUEST_SENT = 'FETCHING_PAGES_REQUEST_SENT'
export const FETCHING_PAGES_REQUEST_FULFILLED = 'FETCHING_PAGES_REQUEST_FULFILLED'
export const FETCHING_PAGES_REQUEST_REJECTED = 'FETCHING_PAGES_REQUEST_REJECTED'

export const FETCHING_SECTIONS_REQUEST_SENT = 'FETCHING_SECTIONS_REQUEST_SENT'
export const FETCHING_SECTIONS_REQUEST_FULFILLED = 'FETCHING_SECTIONS_REQUEST_FULFILLED'
export const FETCHING_SECTIONS_REQUEST_REJECTED = 'FETCHING_SECTIONS_REQUEST_REJECTED'

export const POST_SECTION_REQUEST_SENT = 'POST_SECTION_REQUEST_SENT'
export const POST_SECTION_REQUEST_FULFILLED = 'POST_SECTION_REQUEST_FULFILLED'
export const POST_SECTION_REQUEST_REJECTED = 'POST_SECTION_REQUEST_REJECTED'

export const PAGE_CREATION_REQUEST_SENT = 'PAGE_CREATION_REQUEST_SENT'
export const PAGE_CREATION_REQUEST_FULFILLED = 'PAGE_CREATION_REQUEST_FULFILLED'
export const PAGE_CREATION_REQUEST_REJECTED = 'PAGE_CREATION_REQUEST_REJECTED'

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'
export const RESET_FEEDBACK_MESSAGES = 'RESET_FEEDBACK_MESSAGES'

// action creators
export const addQuestion = newQuestion => ({
  type: UPDATE_QUESTION,
  payload: newQuestion,
})


// async action creators
export const logInUser = (email, password) => async dispatch => {
  dispatch({type: LOG_IN_SENT})
  try {
    const token = await login(email, password)
    dispatch({type: LOG_IN_FULFILLED, payload: token})
  } catch (err) {
    dispatch({type: LOG_IN_REJECTED, payload: err.message})
  }
} 

export const getPages = () => async dispatch => {
  dispatch({type: FETCHING_PAGES_REQUEST_SENT})
  try {
    const pages = await fetchPages()
    dispatch({type: FETCHING_PAGES_REQUEST_FULFILLED, payload: pages})
  } catch (err) {
    dispatch({type: FETCHING_PAGES_REQUEST_REJECTED, error: err.message || 'Something went wrong' })
  }
}

export const getPageSectionsWithId = (pageId) => async dispatch => {
  dispatch({type: FETCHING_SECTIONS_REQUEST_SENT})
  try {
    const sections = await fetchPageSections(pageId)
    dispatch({type:FETCHING_SECTIONS_REQUEST_FULFILLED, payload: sections})
  } catch (err) {
    dispatch({type:FETCHING_SECTIONS_REQUEST_REJECTED, error: err.message || 'Something went wrong' })
  }
}

export const postPageSection = (pageid, sectionTitle, sectionContent) => async dispatch => {
  dispatch({type: POST_SECTION_REQUEST_SENT})
  try {
    const message = await postNewPageSection(pageid, sectionTitle, sectionContent)
    dispatch({type: POST_SECTION_REQUEST_FULFILLED, payload: message})
  } catch (err) {
    dispatch({type: POST_SECTION_REQUEST_REJECTED, payload: err.message})
  }
}

export const createNewPage = (title, tags, token) => async dispatch => {
  dispatch({type: PAGE_CREATION_REQUEST_SENT})
  try {
    const message = await createPage(title, tags, token)
    dispatch({type: PAGE_CREATION_REQUEST_FULFILLED, success: message})
  } catch (err) {
    console.log('error: ', err.message)
    dispatch({type: PAGE_CREATION_REQUEST_REJECTED, error: err.message || 'Something went wrong'})
  }
}

export const resetErrorMessage = () => dispatch => {
  setTimeout(() => {
    return dispatch({ type: RESET_ERROR_MESSAGE })
  }, 2000)
}
  
export const resetFeedbackMessages = () => dispatch => {
  setTimeout(() => {
    return dispatch({ type: RESET_FEEDBACK_MESSAGES })
  }, 2000)
}
  
