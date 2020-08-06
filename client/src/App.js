import React, { useState, useRef } from 'react';
import './App.css';

function App() {

  const [shortUrl, setShortUrl] = useState("")

  const [longUrl, setLongUrl] = useState("")

  const textAreaRef = useRef(null);
  const inputRef = useRef(null);

  //test


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if (longUrl == "") {
        setShortUrl("none")
        return
      }
      const res = await fetch(process.env.REACT_APP_API_URL + '/api/url/shorten', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ longUrl }),
      }
      );
      const parseData = await res.json()
      setShortUrl(parseData.shortUrl)
      console.log("res", parseData)
    }
    catch (error) {
      console.log(error.message)
    }
  }



  function copyToClipboard(e) {
    console.log(textAreaRef)
    textAreaRef.current.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus();
  };

  const clear = () => {

    setShortUrl(null)
    setLongUrl(null)
    inputRef.current.value = "";
  }

  console.log("long", longUrl, "short", shortUrl)


  return (
    <div className="App">
      <div><h1>stumpy</h1></div>
      <div className="subText">MAKE ANY URL SHORTER</div>
      <form className="urlForm" onSubmit={handleSubmit}>
        <label>
          URL to shorten:
    <input ref={inputRef} className="inputBox" type=" text" name="name" onChange={(e) => setLongUrl(e.target.value)} />
        </label>
        <input className="btn btn-primary" type="submit" value="stump it" />
      </form>


      {shortUrl === "none" ? <div div className="text-center text-danger my-3">please enter a URL to shorten</div> :
        shortUrl ?
          <div className="text-center results">
            <div className="my-3">Your new stumpy URL:</div>
            <a href={shortUrl} target="blank"><textarea className="my-3 text-primary textA" ref={textAreaRef} value={shortUrl}>{shortUrl}</textarea></a>
            <div>
              <button className="btn btn-primary copy" onClick={copyToClipboard}>Copy URL</button>


              <button className="btn btn-warning copy ml-1" onClick={clear}>Clear</button>
            </div>
          </div>
          : null
      }

    </div>
  );
}

export default App;



