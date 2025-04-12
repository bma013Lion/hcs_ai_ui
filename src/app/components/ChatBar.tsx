import React from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useRef, useState, useEffect } from 'react';

function ChatBar() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [height, setHeight] = useState(40); 

  const resizeTextarea = () => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.min(textarea.scrollHeight, 100); 
      textarea.style.height = `${newHeight}px`;
      setHeight(newHeight + 32); 
      }
  };
  
  useEffect(() => {
    resizeTextarea(); 
  }, []); 
  
  const handleInput = () => {
    resizeTextarea();
  };

  return (
    <div className=" flex w-full items-end">
      <textarea
        ref={inputRef}
        className="w-full bg-zinc-200 text-sm text-gray-700 border-none outline-none resize-none overflow-auto rounded-lg p-3"
        placeholder="Type your question here..."
        rows={1}
        onInput={handleInput}
        style={{
          lineHeight: '1.5',
          maxHeight: '100px',
          minHeight: '45px',
        }}
      />
      <button className="p-2 w-[45px] h-[45px] ml-2 rounded-lg bg-zinc-950 hover:bg-neural-300">
        <ArrowUpwardIcon className="text-white"/>
      </button>
    </div>
  )
}

export default ChatBar