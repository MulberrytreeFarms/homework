import axios from 'axios'

export async function fetchComics(query) {
  try{
    const { data } = await axios.get(`./api/comics/romance/page_${query}.json`)
    setTimeout(() => {
      return data.data
    }, 1000)
  } catch(e) {
    console.error(e)
  }
}