import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function App() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function loginUser (event) {
    event.preventDefault()

    const response = await fetch('http://localhost:1337/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    const data = await response.json()

    if (data.user) {
      localStorage.setItem('token', data.user)
      alert('Login successful')
      window.location.href = '/dashboard'
      navigate('/dashboard')
    } else {
      alert('Please check your username and password')
    }
  }

  return (
    <div>
      <img className = "kenkologo" src = "/kenkologo.png" alt = "Logo"/>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email"
        />
        <br/>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <br/>
        <input type="submit" value="Login"/>
      </form>
    </div>
  );
}

export default App;
