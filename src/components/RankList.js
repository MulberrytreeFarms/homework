import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import "../styles/RankList.scss"
import { comicsList, loadingComponent } from '../services/rankListSet'
import { nextPage, getComicList, setFilterList, rankListState } from '../stores/comics/rankListSlice'

function RankList({pageSet}) {
  const TOTAL_PAGES = Number(pageSet.totalPage)
  const GENRES = pageSet.genres

  const dispatch = useDispatch()
  const { list, page, isLoading, filter, filterResult } = useSelector(rankListState)
  const [lastElement, setLastElement] = useState(null)

  const observer = useRef(
    new IntersectionObserver(
			entries => {
				const first = entries[0]
				if (first.isIntersecting) {
          dispatch(nextPage())
          dispatch(setFilterList())
        }
			})
	)

  useEffect(()=> {
    if (page <= TOTAL_PAGES) dispatch(getComicList({
      genres: GENRES,
      page: page
    }))
  }, [dispatch, TOTAL_PAGES, GENRES, page])
  
  useEffect(() => {
    const currentElement = lastElement
    const currentObserver = observer.current
    if (currentElement) currentObserver.observe(currentElement)
    return () => {
        if (currentElement) currentObserver.unobserve(currentElement)
    }
  }, [lastElement])

  const setList = () => {
    let LIST = list
    if(filter.length !== 0 && filter.length !== 3) LIST = filterResult
    return (
      LIST.length > 0 && 
      LIST.map((comic, i) => {
          return i === LIST.length -1 && !isLoading && page <= TOTAL_PAGES ?
          <li	key={`${comic.name}-${i}`} ref={setLastElement}>
            { comicsList(comic) }
          </li>
          :
          <li key={`${comic.name}-${i}`}>
            { comicsList(comic) }
          </li>
        }
      )
    )
  }
  

  return (
    <div className="rank-list">
      <ul className="infinite-container">
        {
          setList()
				}
      </ul>
      {isLoading && loadingComponent(true)}
      {page-1 === TOTAL_PAGES && loadingComponent(false)}
    </div>
  )
}

export default RankList