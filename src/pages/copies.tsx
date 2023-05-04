import { AssertionError } from 'assert';
import React, { useState, useEffect } from 'react';

type Emoji = {
  character: string;
  unicodeName: string;
  codePoint: string;
}

function Copies() {
  const [emojis, setEmojis] = useState<Emoji[]>([]);

  useEffect(() => {
    async function fetchEmoji() {
      const response = await fetch("/api/getemoji");
      let data = await response.json();
      data = [...new Set(data)]
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
