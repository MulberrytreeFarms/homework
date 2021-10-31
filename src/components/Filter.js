import React, { useState } from 'react';
import classnames from 'classnames'
import '@/styles/Filter.scss'

function Filter() {
  const [getActive, setActive] = useState(0)

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

  // const activeFilter = setActive(false)

  const switchActive = i => {
    setActive(i)
  }

  return (
    <ul className="filter-wrapper">
      {
        Object.entries(filterList).map(([key,val]) => 
          <li key={key} className={classnames({'active': key === getActive})}>
            <button onClick={()=> switchActive(key) }>{val.name}</button>
          </li>
        )
      }
    </ul>
  )
}

export default Filter