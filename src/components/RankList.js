import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { initialList, getComicList, selectRank } from '../features/comics/rankListSlice';
import "@/styles/RankList.scss"
import { comicsList, loadingComponent } from '../services/comics/rankListSet'


function RankList() {
  const list = useSelector(selectRank)

  const TOTAL_PAGES = 5 - 1
  const [loading, setLoading] = useState(true)
  const [getList, setList] = useState([])
  const [pageNum, setPageNum] = useState(1)
  const [lastElement, setLastElement] = useState(null)

  const dispatch = useDispatch();


  const observer = useRef(
    new IntersectionObserver(
			entries => {
				const first = entries[0];
				if (first.isIntersecting) {
					setPageNum(no => no + 1)
				}
			})
	)

  const getApi = async () => {
    try{
      setLoading(true)
      const { data } = await axios.get(`./api/comics/romance/page_${pageNum}.json`)
			let all = [...getList, ...data.data]
			setTimeout(() => {
				setList([...all])
				setLoading(false)
			}, 1000)
			console.log(list)
    } catch(e) {
      console.error(e)
    }
  }

  useEffect(()=> {
    if (pageNum <= TOTAL_PAGES) {
      getApi()
			dispatch(initialList())
    }
  }, [pageNum])

  
  useEffect(() => {
    const currentElement = lastElement
    const currentObserver = observer.current

    if (currentElement) {
        currentObserver.observe(currentElement)
    }

    return () => {
        if (currentElement) {
            currentObserver.unobserve(currentElement)
        }
    };
  }, [lastElement])
  

  return (
    <div className="rank-list">
      <ul className="infinite-container">
        {getList.length > 0 && 
          getList.map((comic, i) => {
            return i === getList.length -1 && !loading && pageNum <= TOTAL_PAGES ?
							<li	key={`${comic.name}-${i}`} ref={setLastElement}>
								{ comicsList(comic) }
							</li>
							:
							<li key={`${comic.name}-${i}`}>
							{ comicsList(comic) }
							</li>
          	}
        	)
				}
      </ul>
      {loading && loadingComponent(true)}
      {pageNum - 1 === TOTAL_PAGES && loadingComponent(false)}
    </div>
  )
}

export default RankList