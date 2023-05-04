import { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

type Emoji = {
  character: string;
  unicodeName: string;
  codePoint: string;
};

const Home: NextPage = () => {
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const [originalEmojis, setOriginalEmojis] = useState<Emoji[]>([]);

  useEffect(() => {
    void fetch(
      "https://emoji-api.com/emojis?access_key=0de652cb45c68cb6fb71f76d18af45b441eeb752"
    )
      .then((resolve) => {
        return resolve.json();
      })
      .then((data) => {
        setEmojis(data);
        setOriginalEmojis(data);
        console.log(emojis);
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
    if (event.key === "Backspace") {
      setEmojis(originalEmojis);
    }
  }

  async function saveEmoji(emoji: Emoji) {
    try {
      const response = await fetch("/api/saveemoji", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emoji),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  function copyEmojis(emoji: Emoji): void {
    void navigator.clipboard.writeText(emoji.character).then(() => {
      toast.success("Copied " + emoji.character + " to clipboard!");
      console.log(emoji.character);
      saveEmoji(emoji);
    });
  }

  return (
    <>
      <Toaster />
      <Head>
        <title>Emoji Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-center text-4xl">Emoji Search</h1>
      <br />
      <p className="text-center"> Emoji Fun by Ayaan Rao </p>
      <br />
      <input
        type="text"
        className="mx-auto block w-1/2 rounded-lg border border-gray-300 px-4 py-2 text-center shadow-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        placeholder="Search for emoticon"
        onChange={() => emojiSearch}
        onBlur={resetEmojis}
        onKeyDown={resetEmojis}
      />
      <ul className="mx-auto grid max-w-xl grid-cols-2 gap-4">
        {emojis.map((emoji, index) => (
          <div
            key={index}
            className="w-full border border-gray-300 py-5 text-center"
          >
            <span className="text-3xl" onClick={() => copyEmojis(emoji)}>
              {emoji.character}
            </span>
            <span className="text-xl">{emoji.unicodeName}</span>
          </div>
        ))}
      </ul>
    </>
  );
};

export default Home;
