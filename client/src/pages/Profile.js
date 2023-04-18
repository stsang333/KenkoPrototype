import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  async function updateName(event) {
    event.preventDefault()

    const response = await fetch('http://localhost:1337/api/updateName', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({
        email,
        name,
      })
    })

  }

  return (
    <div>
        <h1>{name}'s Profile</h1>
        <form onSubmit={updateName}>
            <input
                type="text"
                placeholder="Quote"
                value={name}
                onChange={e => setName(e.target.value) }
            />
            <input type="submit" value="Update name"/>
        </form>
    </div>
  );
}

export default App;
