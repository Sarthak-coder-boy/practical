
import React, { useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';

const App = () => {
  const [videoId, setVideoId] = useState('');
  const [player, setPlayer] = useState(null);
  const API = 'AIzaSyCRjMi7ReavYZaJ4rs58yzOTP3bWRhtMKs';

  const fetchVideo = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API}&part=snippet`,
      );

      if (response.data.items.length === 0) {
        console.error('Video not found');
        return;
      }

      
      setPlayer(response.data.items[0]);
    } catch (error) {
      console.error('Error fetching video:', error);
    }
  };

  const onReady = (event) => {
    
    event.target.playVideo();
  };

  return (
    <div className="App">
      <h1>YouTube Video Player</h1>
      <label htmlFor="videoId">Enter YouTube Video ID:</label>
      <input
        type="text"
        id="videoId"
        placeholder="Enter video ID"
        value={videoId}
        onChange={(e) => setVideoId(e.target.value)}
      />
      <button onClick={fetchVideo}>Load Video</button>

      {player && (
        <YouTube
          videoId={videoId}
          opts={{
            height: '360',
            width: '640',
            playerVars: {
              autoplay: 1,
              controls: 1,
              showinfo: 0,
              rel: 0,
            },
          }}
          onReady={onReady}
        />
      )}
    </div>
  );
};

export default App;
