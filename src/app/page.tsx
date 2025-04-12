"use client"
import React from "react";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@heroui/dropdown";

import { useRef, useState, useEffect } from 'react';
import ChatBar from "./components/ChatBar";


export default function Home() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [height, setHeight] = useState(40); 
  const classes = [
    'COMP-SCI 1240',
    'MATH 55',
    'STAT 110',
  ]
  const [selectedClass, setSelectedClass] = useState<string>(classes[0]);

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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col w-full gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-row justify-between items-center w-full fixed top-0 left-0 z-50 p-5">
          <div>
            <Dropdown>
              <DropdownTrigger className="bg-black text-white font-bold">
                <div className="w-[200px] px-3 py-2 rounded-lg flex items-center justify-between">
                  <p>{selectedClass}</p>
                  <ExpandMoreIcon className="text-white" />
                </div>
              </DropdownTrigger>
              <DropdownMenu
                className="w-[200px] bg-neutral-800 shadow-lg rounded-lg p-2"
                disallowEmptySelection
                aria-label="Class Selector"
                closeOnSelect={true}
                selectedKeys={new Set([selectedClass])}
                selectionMode="single"
                variant="flat"
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys as Set<string>)[0];
                  if (selected) setSelectedClass(selected);
                }}
              >
                {classes.map((cls) => (
                  <DropdownItem
                    key={cls}
                    className={`py-1 text-neutral-700 rounded-md px-2 transition-colors duration-150 ${selectedClass === cls ? 'bg-neutral-700  text-white' : 'hover:bg-black'}`}
                  >
                    {cls}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div>
            <h1>HCS AI Course Assistant</h1>
          </div>
          <div className="flex flex-row gap-2 px-4 py-2 bg-neutral-800 rounded-lg align-center items-center ">
            <p className="text-white">Save Chat</p>               
            <SaveAltIcon className="!w-4 !h-4 text-white"/>
          </div>
        </div>
        <div className="flex flex-col  w-full">
          <div className="flex flex-col gap-4 mb-5">
            <h1 className="text-4xl font-bold text-center sm:text-left">
              How can I help you?
            </h1>
            <p className="text-lg text-center sm:text-left">
              Let's chat about anything {` `}
              <span style={{ color: '#bf0036', fontWeight: 'bold' }}>{selectedClass}</span>
              .
            </p>
          </div>
          <ChatBar/>
        </div> 
      </main>
    </div>
  );
}
