import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'
import "@/styles/RankList.scss"
import { setRank, filterArtist, filterSchedule } from './rankListSet'

function RankList() {
  const currentPage = useRef(1)
  const totalPage = useRef(5)

  const [getList, setList] = useState([])

  const [loading, setLoading] = useState(false)

  const rootRef = useRef(null);
  const targetRef = useRef(null);

  const getApi = async query => {
    try{
      const { data } = await axios.get(`./api/comics/romance/page_${query}.json`)
      setList(data.data)
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(()=> {
    getApi(1)
  })


  // const ioOptions = {
  //   root: null,
  //   threshold: 1,
  // }

  // const loadingNewCats = (newCats) => {
  //   const loadingTemplate = `<li><span>Loading New Cats...</span></li>`;
  //   return new Promise((resolve, reject) => {
  //     container.insertAdjacentHTML('beforeend', loadingTemplate);
  //     setTimeout(() => {
  //       resolve(newCats);
  //       container.removeChild(container.lastChild);
  //     }, 1000)
  //   })
  // }

  // const handleInfiniteScrolling = (entries, observer) => {
  //   const $last = [...entries].pop();
  //   if ($last.isIntersecting) {
  //     loadingNewCats(createNewCats()).then(newCats => {
  //       container.append(...newCats);
  //       currentLast = lastChild();
  //       observer.unobserve($last.target);
  //       observer.observe(currentLast);
  //     });
  //   }
  // }

  // const io = new IntersectionObserver(handleInfiniteScrolling, ioOptions)
  

  return (
    <div className="rank-list">
      <ul className="infinite-container">
        {getList.map((val) => 
        <li key={val.id}>
          <div className="comics-wrapper">
            <figure className="img-wrapper">
              <img src={val.thumbnailSrc} alt={val.title} />
              <figcaption>{val.title}</figcaption>
            </figure>
            
            <div className="rank-wrapper">
              <p>{val.currentRank}</p>
              {setRank(val.currentRank, val.previousRank)}
            </div>

            <section className="info-wrapper">
              <p className="title">{val.title}</p>
              <ul className="artist-list">
                {filterArtist(val.artists)}
              </ul>
              <p className="free-episode">{val.freedEpisodeSize}화 무료</p>
              <p className="schedule-info">
                { filterSchedule(val.contentsState, val.schedule) }
              </p>
            </section>
          </div>
        </li>
        )}
      </ul>
    </div>
  )
}

export default RankList