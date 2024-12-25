import React from 'react'
import { useThemeStore } from '../../store/useThemeStore'
import { Themes } from '../../constants';

const previewMsg = [
  {id:1, content:"Hey! How's it going?", isSent:false},
  {is:2, content:"I'm doing great! Just working on some new features.", isSent:true}
];

function Setting() {
  const {theme,setTheme} = useThemeStore();

  return (
    <div className='h-screen container mx-auto px-4 pt-20 max-w-5xl'>
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

      </div>
    </div>
  )
}

export default Setting