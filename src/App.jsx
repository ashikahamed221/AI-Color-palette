import React, { useState } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
const App = () => {
  const [prompt, setprompt] = useState("");
  const [colors, setcolors] = useState([]);
  const [Loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true)
    toast.success("Please Wait few second Your Palette is Generating...")
    setcolors([]);
    try {

      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Give me 6 Hexa colors for ${prompt}`
            }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AI_COLOR}`,
            'Content-Type': 'application/json'
          }
        }
      )
      const result = response.data.choices[0].message.content

      const hexmatch = result.match(/#[A-Fa-f0-9]{6}/g);

      if (hexmatch) setcolors(hexmatch)



    }
    catch (error) {
      console.error('Error', error);
      setcolors(["#FF4500", "#DC143C", "#336699"])
    }
    finally {
      setLoading(false);
      toast.success("Successfully Generated Your Palette")
      setprompt("");
    }
  }

  const handlecopy = () => {
    navigator.clipboard.writeText(colors);
    toast.success("Copied")
  }
  return (
    <div className='bg-black min-h-screen text-white flex flex-col justify-center items-center
    px-4 py-10'>
      <Toaster />
      <h1 className=' text-2xl md:text-4xl font-bold mb-4 text-center font-serif'>🎨AI Color Palette</h1>

      <input type="text"
        placeholder='Enter Your Brand / Mood (e.g: Sun, Moon)'
        className='w-full border max-w-md p-2 md:p-3 rounded bg-gray-600 text-white mb-4'
        value={prompt}
        onChange={(e) => setprompt(e.target.value)} />

      <button className='bg-white text-black font-bold py-2 px-6  hover:bg-gray-500 rounded '
        disabled={Loading}
        onClick={handleGenerate}>
        {Loading ? "Generating...." : "Let's Generate"}
      </button>

      {/* result */}

      {colors.length > 0 && (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-10'>
          {colors.map((colors, index) => (
            <div key={index} className='flex flex-col items-center'>
              <div className='w-20 h-20 rounded shadow-lg' style={{ background: colors }}></div>
              <span className='mt-3'>{colors}</span>
              <button className='bg-white text-black mt-4 px-4 py-2 rounded font-bold' onClick={handlecopy}>Copy</button>
            </div>

          ))}
        </div>
      )}

    </div>
  )
}

export default App
