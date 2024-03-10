import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

function App() {

  const [shortUrl, setShortUrl] = useState('');
  const [userLink, setUserLink] = useState('');

  const shortLink = async () => {
    const options = {
      method: 'POST',
      url: 'https://url-shortener42.p.rapidapi.com/shorten/',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '89a70ee230msh5cd3e527f447396p19d58cjsnab0cbda29d4e',
        'X-RapidAPI-Host': 'url-shortener42.p.rapidapi.com'
      },
      data: {
        url: userLink,
        validity_duration: '1',
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setShortUrl(response.data.url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container-fluid bg-dark text-white'>
      <div className='box'>
        <h1 className='title'>URL Shortener</h1>
        <div className='input-group mb-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Enter the URL'
            value={userLink}
            onChange={(e) => setUserLink(e.target.value)}
          />
          <button className='btn btn-primary' onClick={shortLink}>
            Shorten
          </button>
        </div>
        <div className='result'>
          {shortUrl && (
            <><a href={shortUrl} target='_blank' rel='noreferrer' className='shortUrlLink'>
              {shortUrl}
            </a><button
              type='button'
              className='copyButton'
              onClick={() => navigator.clipboard.writeText(shortUrl)}
            >
                Copy
              </button></>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
