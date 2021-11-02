import React from 'react';
import './styles/_reset.scss';

import Header from './components/Header'
import Filter from './components/Filter'
import RankList from './components/RankList'
import { GENRES_OBJ } from './models/comics'

const PAGE_SET = { // 초기 페이지 속성
  genres: 'romance',
  totalPage: 5,
}

function App() {
  return (
    <div className="App">
      <Header title={GENRES_OBJ[PAGE_SET.genres]} />
      <main>
        <Filter />
        <RankList pageSet={PAGE_SET} />
      </main>
    </div>
  );
}

export default App
