import React from 'react';

export default function TetrisLoader() {
  return (
    <div className="flex items-center justify-center gap-1">
      <div className="w-3 h-3 bg-blue-500 rounded-sm animate-bounce" style={{ animationDelay: '0s' }} />
      <div className="w-3 h-3 bg-purple-500 rounded-sm animate-bounce" style={{ animationDelay: '0.1s' }} />
      <div className="w-3 h-3 bg-pink-500 rounded-sm animate-bounce" style={{ animationDelay: '0.2s' }} />
      <div className="w-3 h-3 bg-cyan-500 rounded-sm animate-bounce" style={{ animationDelay: '0.3s' }} />
    </div>
  );
}
