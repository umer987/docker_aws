import React from 'react'
import Editor from '@monaco-editor/react';

function App() {
  return (
    <main className='w-full h-screen bg-gray-950 flex gap-4 p-4'>
<aside className='h-full w-1/4 bg-amber-50 rounded-2xl'></aside>
    <section className='w-3/4 bg-neutral-800 rounded-2xl p-5'>
      <Editor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue="// some comment"
     theme='vs-dark'
    />
    </section>
    </main>
  )
}

export default App
