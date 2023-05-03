import React, { useState, useEffect } from 'react';

function Copies() {
  const [emojis, setEmojis] = useState([]);

  useEffect(() => {
    async function fetchEmoji() {
      const response = await fetch("/api/getemoji");
      let data = await response.json();
      data = data.filter((item, index) => data.indexOf(item) === index)
      setEmojis(data);
    }
    fetchEmoji();
  }, [])

  return (
    <div>
      <h1>Copies</h1>
      <ul>
        {emojis.map((emoji) => (
          <li key={emoji.unicodeName}>
            <button onClick={() => console.log("Copy", emoji.character)}>
              {emoji.character}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Copies;
