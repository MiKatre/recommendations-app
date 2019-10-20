import {kebabCase} from './helpers'

const url = 'http://127.0.0.1:5001'

export const login = async (email, password) => {
  
  return 'faketoken'

  const response = await fetch(url + '/api/login', {
    method: 'POST', 
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({email, password}),
  })

  
  if (response.ok) {
    const {token} = await response.json()
    return token
  }

  const errMessage = await response.text()
  throw new Error(errMessage)
}

export const fetchPages = async () => {
  const response = await fetch(url + '/api/get_pages')
  
  if (response.ok) {
    const pages = await response.json()
    return pages
  } 

  const errMessage = await response.text()
  throw new Error(errMessage)
}

export const fetchPageSections = async (pageId) => {
  const response = await fetch(url + '/api/sections', {
    headers: {'content-type': 'application/json'},
    method: 'POST',
    body: JSON.stringify({page_id: pageId}),
  })

  if (response.ok) {
    const {sections} = await response.json()
    return sections
  }

  const errMessage = await response.text()
  throw new Error(errMessage)
}

export const postNewPageSection = async (pageId, sectionTitle, sectionContent) => {
  const response = await fetch(url + '/api/create_section', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({page_id: pageId, title: sectionTitle, content: sectionContent}),
  })

  if (response.ok) {
    const {successMessage} = await response.json()
    return successMessage
  }

  const errMessage = await response.json()
  throw new Error(errMessage.message)
}

export const createPage = async (title, tags, token) => {
  const response = await fetch(url + '/api/create_page', {
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    method: 'POST',
    body: JSON.stringify({
      title: title,
      path: kebabCase(title),
    }),
  })
  
  if (response.ok){
    const {message} = await response.json()
    console.log('response.ok ', message)
    return message
  }
  
  const errMessage = await response.json()
  throw new Error(errMessage.message)
}