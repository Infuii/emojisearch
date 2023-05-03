import { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

type Emoji = {
  character: string;
  unicodeName: string;
  codePoint: string;
};

const Home: NextPage = () => {
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const [originalEmojis, setOriginalEmojis] = useState<Emoji[]>([]);

  useEffect(() => {
    void fetch("https://emoji-api.com/emojis?access_key=0de652cb45c68cb6fb71f76d18af45b441eeb752")
      .then((resolve) => {
        return resolve.json();
      })
      .then((data) => {
        setEmojis(data);
        setOriginalEmojis(data);
        console.log(emojis)
      });
  }, []);
  
  function emojiSearch(event: Event): void {
    const input = event.target.value.toLowerCase();
    const filteredEmojis = emojis.filter((emoji) => {
      return emoji.unicodeName.toLowerCase().includes(input);
    });
    setEmojis(filteredEmojis);
  }
  
  function resetEmojis(event: React.KeyboardEvent<HTMLInputElement>): void {
    if(event.key === "Backspace") {
      setEmojis(originalEmojis);
    }
  }
  
  async function saveEmoji(emoji: Emoji) {
    const response = await fetch('/api/saveemoji');
    const data = await response.json();
    console.log(response);
    console.log(data)
  }

  function copyEmojis(emoji: Emoji): void {
    void navigator.clipboard.writeText(emoji.character).then(() => {
      toast.success('Copied ' + emoji.character + ' to clipboard!')
      console.log(emoji.character)
      saveEmoji(emoji);
    })
  }

  return (
    <>
    <Toaster/>
      <Head>
        <title>Emoji Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-4xl text-center">Emoji Search</h1>
      <br/>
      <p className="text-center"> Emoji Fun by Ayaan Rao </p>
      <br />
    <input type="text" className="shadow-md block mx-auto text-center w-1/2 py-2 px-4 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="Search for emoticon" onChange={emojiSearch} onBlur={resetEmojis} onKeyDown={resetEmojis} />
       <ul className="grid grid-cols-4 gap-4 mx-auto max-w-xl">
        {emojis.map((emoji, index) => (
          <div key={index}>
            <span className="text-3xl" onClick={() => copyEmojis(emoji)}>{emoji.character}</span>
            <span className="text-xl">{emoji.unicodeName}</span>
          </div>
        ))}
      </ul>
    </>
  );
};

export default Home;
