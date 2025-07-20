// client/src/pages/Landing.js
import React from 'react';

function Landing() {
  const introText = `✨ Organize Your Thoughts. Anytime. Anywhere.

Welcome to Note Nest — your simple, fast, and secure online note-taking companion.

Whether you're jotting down ideas, managing to-dos, or keeping your daily journal, NoteNest helps you stay organized and focused across all your devices. No clutter. No distractions. Just notes.

📝 Create, edit, and manage notes with ease
🔒 Your data stays private and secure
🌐 Access from anywhere, anytime`;

  return (
    <div className="hero">
      <h1>Note Nest</h1>
      <p className="subtitle">Your Personal Digital Notebook</p>
      <p className="intro-text">{introText}</p>
    </div>
  );
}

export default Landing;
