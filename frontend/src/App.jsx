import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    // Note: We are hardcoding the URL for local dev. 
    // In later phases, we will use Environment Variables for K8s.
    fetch('http://localhost:5000/api/v1/welcome')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setMessage(data.message))
      .catch(err => {
        console.error("Failed to fetch:", err);
        setError("Backend not reachable. Is it running?");
      });
  }, [])

  return (
    <div className="App" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Three-Tier DevOps Project</h1>
      <div className="card">
        <h2>Backend Response:</h2>
        {error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <p style={{ color: 'green', fontWeight: 'bold' }}>
            {message || "Loading..."}
          </p>
        )}
      </div>
    </div>
  )
}

export default App