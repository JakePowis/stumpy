import React, { useState, useRef } from 'react';
import './App.css';
import URL_SHORTEN from './URL_SHORTEN';
import FILE_UPLOAD from './FILE_UPLOAD'

function App() {

  const [urlMode, setUrlMode] = useState(true)

  return (
    <div className="App">

      <div><h1>stumpy</h1></div>

      {urlMode ?
        <URL_SHORTEN />
        :
        <FILE_UPLOAD />
      }

      <div className="modeChange text-primary" onClick={() => setUrlMode(!urlMode)}>{urlMode ? "OR UPLOAD IMAGE" : "OR SHORTEN URL"}</div>

    </div>
  );
}

export default App;



