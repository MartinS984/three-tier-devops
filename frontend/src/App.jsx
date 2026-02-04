import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [users, setUsers] = useState([]) // State for users
  const [error, setError] = useState(null)

  useEffect(() => {
    // 1. Fetch the Welcome Message
    fetch('/api/v1/welcome')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error("Welcome Error:", err));

    // 2. Fetch the Users from DB
    fetch('/api/v1/users')
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then(data => setUsers(data))
      .catch(err => {
        console.error("Users Error:", err);
        setError("Could not load users. Is the database running?");
      });
  }, [])

  return (
    <div className="App" style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
      <h1>Three-Tier DevOps Project</h1>
      
      {/* Backend Status Section */}
      <div className="card" style={{ border: '1px solid #ddd', padding: '20px', margin: '20px auto', maxWidth: '400px' }}>
        <h2>Backend Status:</h2>
        <p style={{ color: 'green', fontWeight: 'bold' }}>{message || "Loading..."}</p>
      </div>

      {/* Database Data Section */}
      <div className="card" style={{ border: '1px solid #ddd', padding: '20px', margin: '20px auto', maxWidth: '400px' }}>
        <h2>Users from Database:</h2>
        {error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {users.length === 0 ? <p>Loading users...</p> : 
              users.map(user => (
                <li key={user.id} style={{ background: '#f9f9f9', margin: '5px', padding: '10px', borderRadius: '5px' }}>
                  <strong>{user.name}</strong> <br/>
                  <small>{user.email}</small>
                </li>
              ))
            }
          </ul>
        )}
      </div>
    </div>
  )
}

export default App