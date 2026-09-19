import { useState } from 'react'

const API_BASE_URL = 'http://127.0.0.1:5000'

function App() {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      setError('Please choose a PDF file first.')
      return
    }

    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
    if (!isPdf) {
      setError('Please upload a valid PDF file.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch(`${API_BASE_URL}/upload-menu`, {
        method: 'POST',
        body: formData,
      })

      const contentType = response.headers.get('content-type') || ''
      const data = contentType.includes('application/json')
        ? await response.json()
        : { message: await response.text() }

      if (!response.ok) {
        throw new Error(data.error || data.message || `Request failed with status ${response.status}`)
      }

      setResult(data)
    } catch (err) {
      const message = err?.message || 'Failed to fetch'
      setError(`Upload failed: ${message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: 800, margin: '40px auto', padding: 20 }}>
      <h1>MenuOptimizer</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit" style={{ marginLeft: 12 }} disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Menu'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <div style={{ marginTop: 20 }}>
          <h2>{result.restaurant_name || 'Restaurant Menu'}</h2>

          {result.extracted_text && (
            <pre style={{ whiteSpace: 'pre-wrap', background: '#f5f5f5', padding: 12 }}>
              {result.extracted_text}
            </pre>
          )}

          {Array.isArray(result.items) && result.items.length > 0 && (
            <ul>
              {result.items.map((item, index) => (
                <li key={`${item.name}-${index}`}>
                  <strong>{item.name}</strong> - {item.category || 'General'} - {item.price ? `₹${item.price}` : 'Price not available'}
                  {item.description ? ` - ${item.description}` : ''}
                </li>
              ))}
            </ul>
          )}

          {result.saved_file && (
            <p>
              Saved file: <strong>{result.saved_file}</strong>
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default App
