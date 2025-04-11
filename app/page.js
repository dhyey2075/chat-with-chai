"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [persona, setPersona] = useState("Hitesh");

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">Chat with <span>
          <select className="bg-black" onChange={(e) => {
            setPersona(e.target.value)
            document.getElementById('response').innerText = "Response will appear here..."
          }} value={persona}>
            <option value="Hitesh">Hitesh</option>
            <option value="Piyush">Piyush</option>
          </select>
          </span> Sir</h1>
        <div className="flex flex-col space-y-4">
          <textarea
            className="w-full p-4 border rounded-lg"
            placeholder="Ask your question..."
            rows={4}
          />
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
            onClick={async () => {
              setIsLoading(true);
              try {
                const response = await fetch('api/get-response', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ query: document.querySelector('textarea').value, persona: persona}),
                });
                const data = await response.json();
                document.getElementById('response').innerText = data.message;
              } finally {
                setIsLoading(false);
              }
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
            ) : null}
            Ask {persona} Sir
          </button>
          <div className="flex w-full items-start">
            <Image className="mt-4 mr-3 rounded-full" src={persona === "Hitesh" ? "https://yt3.googleusercontent.com/6tLBV-DRVemxhmanuezR5HkHshX2g7Y46Rq8cysyO1V-nd2SaQ2Fi8cdgVM-n6v_8XZ5BEimxXI=s160-c-k-c0x00ffffff-no-rj" : "https://yt3.googleusercontent.com/3acddexuFlA5yKRS2--11NeqhCiik-0cntUPjk_QjlsA4ScmQUPWNmeBLweVUQjWXTCLT26lsw=s160-c-k-c0x00ffffff-no-rj"} height={50} width={50} alt="Resp. Images" />
            <div id="response" className="mt-4 p-4 border rounded-lg min-h-[100px] w-full">
              Response will appear here...
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
