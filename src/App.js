import React from 'react';
import { Counter } from './features/counter/Counter';
import '@/styles/Reset.scss';
import './styles/App.scss';

import Header from './components/Header'
import Filter from './components/Filter'
import RankList from './components/RankList'

function App() {
  return (
    <div className="App">
      <Header />
      <Filter />
      <RankList />
      <header className="App-header">
        <Counter />
      </header>
    </div>
  );
}

export default App;
