import React, { useState } from 'react';
import classnames from 'classnames'
import { useDispatch } from 'react-redux'

import '../styles/Filter.scss'
import { filterSet, setFilterList } from '../stores/comics/rankListSlice'
import { LIST_STATE } from '../models/comics'

function Filter() {
  const dispatch = useDispatch()
  const [getActive, setActive] = useState([])
  const listState = LIST_STATE
  
  const switchActive = i => {
    let copyArr = getActive
    const numb = copyArr.indexOf(Number(i))
    if(numb >= 0) copyArr.splice(numb,1)
    else {
      copyArr.push(Number(i))
    }
    setActive([...copyArr])
    dispatch(filterSet(getActive))
    dispatch(setFilterList())
  }

  return (
    <ul className="filter-wrapper">
      {
        Object.entries(listState).map(([key,val]) => 
          <li key={key} className={classnames({'active': getActive.indexOf(Number(key)) >= 0})}>
            <button onClick={()=> switchActive(key) }>{val.name}</button>
          </li>
        )
      }
    </ul>
  )
}

export default Filter