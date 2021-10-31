const WEEK = {
  MON: '월',
  TUE: '화',
  WED: '수',
  THU: '목',
  FRI: '금',
  SAT: '토',
  SUN: '일'
}

export const setRank = (crr, pre) => {
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

export const filterArtist = val => {
  const display = val.filter(({role}) => /writer|painter|scripter/.test(role))
  return (
    display.map(v =>
      <li key={v.id}>{v.name}</li>
    )
  )
}

export const filterSchedule = (state, {periods}) => {
  if(state === 'completed') return '완결'
  if(periods.length > 0) {
    return (
      periods.map((v, k) => 
        <span key={k}>매주 {WEEK[v]}요일 연재</span>
      )
    )
  }
}
