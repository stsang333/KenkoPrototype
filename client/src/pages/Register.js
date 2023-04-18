import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function App() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function registerUser (event) {
    event.preventDefault()

    const response = await fetch('http://localhost:1337/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })

    const data = await response.json()

    if (data.status === 'ok') {
      navigate('/login')
    }

    console.log(data)
  }

  return (
    <div className = "registerPage">
      <a href = "/"><img className = "kenkologo" src = "/kenkologo.png" alt = "Logo"/></a>
      <div className = "registerBox">
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="name"
          placeholder="name"
        />
        <br/>
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
        <input type="submit" value="Register"/>
      </form>
      </div>
    </div>
  );
}

export default App;
