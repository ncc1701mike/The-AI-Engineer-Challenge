'use client';

import { useState, useRef, useEffect } from 'react';
import ChatInterface from '@/components/ChatInterface';
import BackgroundMusic from '@/components/BackgroundMusic';

export default function Home() {
  return (
    <main>
      <div className="background-gradient"></div>
      <div className="background-glow"></div>
      <div className="gradient-wash"></div>
      <div className="gradient-wave"></div>
      <div className="container">
        <ChatInterface />
      </div>
      <BackgroundMusic />
    </main>
  );
}

