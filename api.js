import {kebabCase} from './helpers'

const url = 'http://127.0.0.1:5001'

const processMovie = movie => ({
  title: movie.title,
  poster: movie.poster_thumb.url,
  year: movie.movie.release,
  type: 'Film',
  id: movie.id, // movie_t_id
})

export const getPage = async (input, nextPage = null) => {
  try {
    let url = ''
    if (nextPage) url = nextPage 
    else url = `https://api.cinetimes.org/fr/movie?query=${input}`

    console.log(url)

    const result = await fetch(url)
    const page = await result.json()
    
    if (page.count === 0) {
      return undefined
    }

    return {
      data: page.results.map(processMovie), 
      nextPage: result.next,
    }
  } catch (err) {
    console.log(err)
  }
}

export const fetchMovieData = async id => {
  const response = await fetch(`https://api.cinetimes.org/fr/movie/${id}`)
  const result = await response.json()

  return {
    title: result.title,
    slug: result.slug,
    poster: result.poster_thumb.url,
    storyline: result.synopsis,
    awards: null, //result.Awards,
    ratings: null, // result.Ratings, result.avg_rating
    boxOffice: result.movie.box_office,
  }
}


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