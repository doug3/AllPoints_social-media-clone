import { ArrowLeft, Sparkle, TextIcon, Upload } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const StoryModal = ({setShowModal, fetchStories}) => {

  const bgColors = ['#4f46e5', '#7c3aed', '#db2777', '#e11d48', '#ca8a04', '#0d9488']

  const [mode, setMode] = useState('text')
  const [background, setBackground] = useState(bgColors[0])
  const [text, setText] = useState('')
  const [media, setMedia] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleMediaUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setMedia(file)
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const handleCreateStory = async() => {

  }

  return (
    <div className='fixed inset-0 z-110 min-h-screen bg-black/80 backdrop-blur text-white flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <div className='text-center mb-4 flex items-center justify-between'>
          <button onClick={() => setShowModal(false)} className='text-white p-2 cursor-pointer'>
            <ArrowLeft />
          </button>
          <h2 className='text-lg font-semibold'>Create a Story</h2>
          <span className='w-10'></span>
        </div>
        <div className='rounded-lg h-96 flex items-center justify-center relative' style={{backgroundColor: background}}>
          {mode === 'text' && (
            <textarea className='bg-transparent text-white w-full h-full p-6 text-lg resize-none focus:outline-none' placeholder="What's on your mind?" onChange={(e) => setText(e.target.value)} value={text} />
          )}
          {
            mode === 'media' && previewUrl && (
              media?.type.startsWith('image') ? (
                <img src={previewUrl} alt="preview" className='max-h-full object-contain' />
              ) : (
                <video src={previewUrl} className='max-h-full object-contain' controls />
              )
            )
          }
        </div>
        <div>
          <div className='flex gap-2 mt-4'>
            {bgColors.map((color) => (
              <div key={color} className='w-6 h-6 rounded-full cursor-pointer ring' style={{backgroundColor: color}} onClick={() => setBackground(color)} />
            ))}
          </div>
          <div className='flex gap-2 mt-4'>
              <button onClick={() => {setMode('text'); setMedia(null); setPreviewUrl(null);}} className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer ${mode === 'text' ? 'bg-white text-black' : 'bg-zinc-800'}`}>
                <TextIcon size={18} />Text
              </button>
              <label
                className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer ${mode === 'media' ? 'bg-white text-black' : 'bg-zinc-800'}`}
                htmlFor="story-media-upload"
                onClick={() => setMode('media')}
              >
                <input
                  id="story-media-upload"
                  onChange={handleMediaUpload}
                  type="file"
                  accept="image/*, video/*"
                  className='hidden'
                />
                <Upload size={18} />Photo/Video
              </label>
          </div>
          <button onClick={() => toast.promise(handleCreateStory(), {
            loading: 'Creating story...',
            success: <p>Story created!</p>,
            error: e => <p>{e.message}</p>
          })} className='flex items-center justify-center gap-2 text-white py-3 mt-4 w-full rounded bg-gradient-to-r from-indigo--500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition cursor-pointer' >
            <Sparkle className='inline-block mr-2' size={18} />Create Story
          </button>
        </div>

      </div>
    </div>
  )
}

export default StoryModal