import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

type Emoji = {
  character: string;
  unicodeName: string;
  codePoint: string;
};

const Home: NextPage = () => {
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const [originalEmojis, setOriginalEmojis] = useState<Emoji[]>([]);

  useEffect(() => {
    fetch("https://emoji-api.com/emojis?access_key=0de652cb45c68cb6fb71f76d18af45b441eeb752")
    .then((res) => {
      return res.json();
    })
      .then((data) => {
        setEmojis(data);
        setOriginalEmojis(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [])
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
  
  return (
    <>
    hi
      <Head>
        <title>Emoji Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-4xl text-center">Emoji Search</h1>
      <br/>
      <p className="text-center"> Emoji Fun by Ayaan Rao </p>
      <br />
    <input type="text" className="shadow-md block mx-auto text-center w-1/4 py-1 px-4 rounded-lg border border-gray-300 shadow-sm" placeholder="Search for emoticon" onChange={emojiSearch} onBlur={resetEmojis} onKeyDown={resetEmojis} />
       <ul className="grid grid-cols-4 gap-4 mx-auto max-w-xl">
        {emojis.map((emoji, index) => (
          <div key={index}>
            <span className="text-3xl">{emoji.character}</span>
            <span className="text-xl">{emoji.unicodeName}</span>
          </div>
        ))}
      </ul>
    </>
  );
};

export default Home;
