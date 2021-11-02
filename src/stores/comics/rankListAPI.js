import axios from 'axios'

export async function fetchComics({genres, page}) {
  try{
    const { data } = await axios.get(`./api/comics/${genres}/page_${page}.json`)
    // const { data } = await axios.get(`/api/comics/${genres}?page=${page}`)
      return data.data
  } catch(e) {
    console.error(e)
  }
}