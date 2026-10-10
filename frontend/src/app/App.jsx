import React, { useRef, useMemo, useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { MonacoBinding } from 'y-monaco';
import * as Y from 'yjs';
import { SocketIOProvider } from 'y-socket.io';

function App() {
  const [username, setUsername] = useState(() =>
    new URLSearchParams(window.location.search).get('username') || ''
  );

  const editorRef = useRef(null);
  const providerRef = useRef(null);
  const bindingRef = useRef(null);

  const ydoc = useMemo(() => new Y.Doc(), []);
  const ytext = useMemo(() => ydoc.getText('monaco'), [ydoc]);

  // Just store the editor on mount — nothing else
  const handleMount = (editor) => {
    editorRef.current = editor;
  };

  // Create provider + binding AFTER editor exists AND username is set
  useEffect(() => {
    if (!username || !editorRef.current) return;

    const provider = new SocketIOProvider(
      'http://localhost:3000',
      'monaco',
      ydoc,
      { autoConnect: true }
    );
    providerRef.current = provider;

    const binding = new MonacoBinding(
      ytext,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      provider.awareness
    );
    bindingRef.current = binding;

    return () => {
      binding.destroy();
      provider.destroy();
    };
  }, [username, ydoc, ytext]);

  const handleJoin = (e) => {
    e.preventDefault();
    const name = e.target.username.value;
    setUsername(name);
    window.history.pushState({}, '', '?username=' + name);
  };

  if (!username) {
    return (
      <main className="w-full text-amber-50 h-screen items-center justify-center bg-gray-950 flex gap-4 p-4">
        <h1>everyone is offline</h1>
        <form onSubmit={handleJoin}>
          <input
            type="text"
            className="p-2 rounded-lg bg-gray-800 text-amber-50"
            name="username"
          />
          <button className="p-2 rounded-lg bg-amber-50 text-gray-950 font-bold">
            join
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="w-full h-screen bg-gray-950 flex gap-4 p-4">
      <aside className="h-full w-1/4 bg-amber-50 rounded-2xl"></aside>
      <section className="w-3/4 bg-neutral-800 rounded-2xl p-5">
        <Editor
          height="90vh"
          defaultLanguage="javascript"
          defaultValue="// some comment"
          theme="vs-dark"
          onMount={handleMount}
        />
      </section>
    </main>
  );
}

export default App;