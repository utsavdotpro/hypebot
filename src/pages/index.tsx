import Loader from "@elements/Loader";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const Home: NextPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [hypeMessage, setHypeMessage] = useState("");
  const [hypeImageURL, setHypeImageURL] = useState("");

  const generateHype = async () => {
    // @ts-ignore: user can input a number
    if (!isNaN(input)) {
      setHypeMessage("Do I look like a calculator to you? 🤨");
      return;
    }

    setLoading(true);

    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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",
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `I am thinking to do something. Write a motivational message to hype me up accomplishing it. Make it comedic, fun and use a few emojis. I am thinking to ${input}`,
        temperature: 0.7,
        max_tokens: 1839,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    });

    setLoading(false);

    const data = await response.json();

    setHypeMessage(data.choices[0].text);

    generateGif();
  };

  const generateGif = async () => {
    const apiKey = "JhvEcKFN3ndwPEMqO29ojkjj0ymHIug2";
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${input}&rating=g`
    );

    const data = await response.json();

    setHypeImageURL(data.data.images.original.url);
  };

  return (
    <div>
      <Head>
        <title>Hypebot</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-8">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold">Hypebot</h1>
          <p>We help you do whatever you want to do but not feel like doing!</p>

          <hr className="w-40 mx-auto mt-4" />
        </div>

        <div className="md:flex flex-column">
          <div className="flex-1">
            <textarea
              className="w-full p-2 mb-2 bg-white rounded-md"
              placeholder="What are you thinking to do?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button
              className="inline-block px-4 py-3 text-sm font-semibold text-center text-white uppercase transition duration-200 ease-in-out bg-gray-800 rounded-md cursor-pointer hover:bg-gray-900"
              onClick={generateHype}
              disabled={isLoading}
            >
              {!isLoading ? "Hype me!" : <Loader />}
            </button>
          </div>

          <div className="w-10 h-10" />

          <div className="flex-1 items-top">
            {hypeMessage && (
              <>
                <div className="flex w-full p-4 rounded-md bg-slate-800 min-h-40">
                  <div className="mr-2 text-4xl">{'"'}</div>
                  <div className="text-lg text-white ">{hypeMessage}</div>
                </div>

                <img
                  src={hypeImageURL}
                  className="w-[90%] mx-auto mt-4 rounded-md"
                />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
