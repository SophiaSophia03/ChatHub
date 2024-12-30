import React from 'react'
import { useThemeStore } from '../../store/useThemeStore'
import { Themes } from '../../constants';
import {Image, Send} from "lucide-react"

const previewMsg = [
  {id:1, content:"Hey! How's it going?", isSent:false},
  {id:2, content:"I'm doing great! Just working on some new features.", isSent:true}
];

function Setting() {
  const {theme,setTheme} = useThemeStore();

  return (
    <div className='min-h-screen container mx-auto px-4 pt-20 max-w-5xl my-8'>
      <div className='space-y-6'>

        {/* Header Section */}
        <div className='flex flex-col gap-2 justify-center items-center mt-8'>
          <h2 className='text-3xl font-bold'>Theme</h2>
          <p className='text-xl text-zinc-500 font-semibold mb-8'>Choose a theme for your chat interface</p>
        </div>

        {/* Themes Grid */}
        <div className='grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2'>
          {Themes.map((t) => (
            <button
              key={t}
              className={`flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${
                theme === t ? 'bg-base-200' : 'hover:bg-base-200/50'
              }`}
              onClick={() => setTheme(t)} // Update theme when clicked
            >
            <div className='relative h-8 w-full rounded-md overflow-hidden' data-theme={t}>
            <div className='absolute inset-0 grid grid-cols-4 gap-px p-1'>
              <div className='rounded bg-primary'></div>
              <div className='rounded bg-secondary'></div>
              <div className='rounded bg-accent'></div>
              <div className='rounded bg-neutral'></div>
            </div>
            </div>
            <span className='text-[15px] font-medium truncate w-full text-center'>
              {t.charAt(0).toUpperCase()+ t.slice(1)}
            </span>
            </button>
          ))}
        </div>

        {/* Preview Section */}
        <h3 className='text-2xl font-semibold text-center mb-1'>Preview</h3>
        <p className='text-xl text-zinc-500 font-semibold mb-8 text-center'>This is how your chat section will look like..</p>
        <div className='rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-xl '>
        <div className='p-4 bg-base-200'>
        <div className='max-w-lg mx-auto'>
        <div className='bg-base-100 rounded-xl shadow-md overflow-hidden'>

{/* CHat Header */}
        <div className='px-4 py-2 border-b border-base-300 bg-base-100'>
          <div className='flex items-center gap-4'>
            <div className='w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium'>J</div>
            <div>
              <h2 className='font-medium text-sm'>John Doe</h2>
              <p className='text-xs text-base-content/70'>Online</p>
            </div>
          </div>
          </div>

{/* Chat messages section */}
          <div className='p-4 mt-4 space-y-4 min-h-[200px] overflow-y-auto bg-base-100'>
            {previewMsg.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isSent ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-xl px-3 shadow-md ${msg.isSent ? "bg-primary text-primary-content" : "bg-base-200"}`}>
                  <p>{msg.content}</p>
                  <p className={`text-[11px] mt-2 ${msg.isSent ? "text-primary-content/70" : "text-base-content/70"}`}>10:00 AM</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Send Input */}
          <div className='p-4 border-t border-base-200 bg-base-100'>
          <div className='flex gap-2'>
            <input type='text'
            className='input input-bordered flex-1 text-sm h-10' value="This is a preview" placeholder='Type a message...' readOnly
            ></input>
            <div className='btn btn-secondary btn-circle min-h-0'><Image size={18} /> </div>
            <div className='btn btn-primary btn-circle min-h-0'><Send size={18} /> </div>
          </div>
          </div>

        </div>

        </div>

        </div>
        </div>
      </div>
    </div>
  )
}

export default Setting