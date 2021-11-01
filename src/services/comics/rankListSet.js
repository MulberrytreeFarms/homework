const WEEK = {
  MON: '월',
  TUE: '화',
  WED: '수',
  THU: '목',
  FRI: '금',
  SAT: '토',
  SUN: '일'
}

export const comicsList = (data) => { // 만화 리스트
  return (
    <div className="comics-wrapper">
      <figure className="img-wrapper">
        <img src={data.thumbnailSrc} alt={data.title} />
        <figcaption>{data.title}</figcaption>
      </figure>
      
      <div className="rank-wrapper">
        <p>{data.currentRank}</p>
        {setRank(data.currentRank, data.previousRank)}
      </div>

      <section className="info-wrapper">
        <p className="title">{data.title}</p>
        <ul className="artist-list">
          {filterArtist(data.artists)}
        </ul>
        <p className="free-episode">{data.freedEpisodeSize}화 무료</p>
        <p className="schedule-info">
          { filterSchedule(data.contentsState, data.schedule) }
        </p>
      </section>
    </div>
  )
}

export const setRank = (crr, pre) => { // 순위 계산
  const sum = pre-crr
  if(sum > 0) return (
    <span className="rank-up">▲{sum}</span>
  )
  if(sum < 0) return (
    <span className="rank-down">▼{sum*(-1)}</span>
  )
  return (
    <span>-</span>
  )
}

export const filterArtist = val => { // 작가 필터
  const display = val.filter(({role}) => /writer|painter|scripter/.test(role))
  return (
    display.map(v =>
      <li key={v.id}>{v.name}</li>
    )
  )
}

export const filterSchedule = (state, {periods}) => { // 연재 요일, 완결 유무
  if(state === 'completed') return '완결'
  if(periods.length > 0) {
    return (
      periods.map((v, k) => 
        <span key={k}>매주 {WEEK[v]}요일 연재</span>
      )
    )
  }
}

export const loadingComponent = bool => { // 로딩 화면
  if (bool) return  <div className='loading-wrapper'>
    <p>loading...</p>
  </div>
  else return <div className='loading-wrapper'>
    <p>끝 페이지</p>
  </div>
}