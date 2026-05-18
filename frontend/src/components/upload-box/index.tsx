import { useState } from 'react'

export function UploadBox() {

  const [status, setStatus] =
    useState('')

  async function simulateDeploy() {

    setStatus('Uploading ZIP...')

    setTimeout(() => {
      setStatus('Building application...')
    }, 2000)

    setTimeout(() => {
      setStatus('Deploying project...')
    }, 4000)

    setTimeout(() => {
      setStatus('Project online 🚀')
    }, 6000)
  }

  return (
    <div className="border border-dashed border-zinc-700 rounded-2xl p-10 bg-zinc-900/40">

      <h2 className="text-2xl font-bold mb-3">
        Upload Project ZIP
      </h2>

      <p className="text-zinc-400 mb-6">
        Simulate a frontend deployment
      </p>

      <input
        type="file"
        className="mb-6 block"
      />

      <button
        onClick={simulateDeploy}
        className="bg-white text-black px-5 py-2 rounded-lg hover:bg-zinc-200 transition-colors"
      >
        Deploy ZIP
      </button>

      {status && (
        <div className="mt-6 border border-zinc-800 rounded-xl p-4 bg-black">

          <p className="text-emerald-400 font-mono text-sm">
            {status}
          </p>

        </div>
      )}

    </div>
  )
}
