import React, { useState } from 'react';
import classnames from 'classnames'
import '@/styles/Filter.scss'

function Filter() {
  const [getActive, setActive] = useState([0,1,2])

  const filterList = [
    {
      status: 'scheduled',
      name: '연재 중'
    }, {
      status: 'completed',
      name: '완결'
    }, {
      status: 'test',
      name: '무료회차 3개'
    }
  ]

  const switchActive = i => {
    let copyArr = getActive
    const numb = copyArr.indexOf(Number(i))
    if(numb >= 0) copyArr.splice(numb,1)
    else {
      copyArr.push(Number(i))
    }
    setActive([...copyArr])
  }

  return (
    <ul className="filter-wrapper">
      {
        Object.entries(filterList).map(([key,val]) => 
          <li key={key} className={classnames({'active': getActive.indexOf(Number(key)) >= 0})}>
            <button onClick={()=> switchActive(key) }>{val.name}</button>
          </li>
        )
      }
    </ul>
  )
}

export default Filter