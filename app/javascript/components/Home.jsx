import React from 'react';
import KanjiList from './KanjiList';


export default () => (
  <>
    <div className='jumbotron'>
      <h1 className="display-5">
        Welcome to Kanji Explorer
      </h1>
      <p className="lead">
        Use this site to explore all kinds of Japanese Kanji
      </p>
    </div>
    <KanjiList />
  </>
)