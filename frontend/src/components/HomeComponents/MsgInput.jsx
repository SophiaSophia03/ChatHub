import React, { useRef } from 'react'
import { useState } from 'react'
import { useChatStore } from '../../store/useChatStore';
import { Camera, Image, Send, X } from 'lucide-react';
import toast from 'react-hot-toast';


function MsgInput() {
  const [text, settext] = useState("");
  const [imagePreview, setimagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const {sendMsg} = useChatStore();

  const handleImageChange= (e)=> {
    const file = e.target.files[0];
    if(!file.type.startsWith("image/")){
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setimagePreview(reader.result);
    }
    reader.readAsDataURL(file);
  }
  const handleSendMessage = (e) => {
    e.preventDefault();
    if(!text.trim() && !imagePreview) return;
    try{
      sendMsg({
        text:text.trim(),
        image:imagePreview,
      });
      settext("");
      setimagePreview(null);
      if(fileInputRef.current) fileInputRef.current.value = "";
    }
    catch(error){
      toast.error("Failed to send message!!")
      console.error("Failed to send message", error);
    }
  }
  const removeImage = (e) => {
    setimagePreview(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div className='p-4 w-full'>
    {imagePreview && (
      <div className='mb-3 flex items-center gap-2'>
        <div className='relative '>
          <img src={imagePreview} className='w-20 h-20 object-cover rounded-lg border border-zinc-700' />
          <button onClick={removeImage} className='absolute h-5 -top-1.5 -right-1.5 rounded-full bg-base-300 flex items-center justify-center' type='
          button'><X className='size-5'/></button>
        </div>
      </div>
    )}
    <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
          <div className='flex-1 flex gap-2'>
           <input
            type='text'
            className='input input-bordered input-sm sm:input-md flex-1 text-sm h-10'
            value={text}
            placeholder='Type a message...'
            onChange={(e)=> {settext(e.target.value)}}
            />
            <input
            type='file'
            accept='image/*'
            className='hidden'
            ref={fileInputRef}
            onChange={handleImageChange}
            />
            <button type='button' className={`hidden sm:flex btn btn-circle ${imagePreview ? "text-emerald-500": " bg-secondary"}`} onClick={()=> fileInputRef.current?.click()}>
            <Image size={20} />
            </button>

          </div>
          <button type='submit' onClick={handleSendMessage} className='btn btn-primary btn-circle min-h-0' disabled={!text.trim() && !imagePreview}><Send size={20} /> </button>
      </form>
          </div>
  )
}

export default MsgInput