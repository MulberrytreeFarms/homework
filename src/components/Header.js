import React from 'react';
import '..//styles/Header.scss'

function Header({title}) {
  return (
    <header className="header">
      <h1>{title} 장르 랭킹</h1>
    </header>
  )
}

export default Header