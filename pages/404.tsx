import Layout from '../components/Layout'
import React from 'react'

export default function Custom404() {
  // Include a client-side redirect script to preserve path in the hash so SPA can handle it on GitHub Pages
  const redirectScript = `
    (function(){
      try {
        var p = window.location.pathname
        // If we're not at root, redirect to index with hash for client-side routing
        if (p && p !== '/' && p !== '') {
          var target = './#' + p
          window.location.replace(target)
        }
      } catch (e) {
        console.error('404 redirect failed', e)
      }
    })();
  `

  return (
    <Layout title="404 — Redirecting">
      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold">Omdirigerar…</h2>
        <p className="mt-2">Sidan finns inte direkt på GitHub Pages — omdirigerar till startsidan.</p>
      </div>
      {/* inject script directly so exported 404.html contains it */}
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
    </Layout>
  )
}