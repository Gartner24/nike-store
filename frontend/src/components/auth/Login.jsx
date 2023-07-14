import { useState } from 'react';
import '../css/login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password
    };

    fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result.token);
        if (result.token) {
          localStorage.setItem('token', result.token);
          setLoginSuccessful(true);
          navigate('/home'); // Redireccionar al usuario a la página de inicio después de iniciar sesión exitosamente
        } else {
          setLoginSuccessful(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loginSuccessful) {
    return null; // Opcionalmente puedes retornar null si no quieres renderizar nada en este componente después del inicio de sesión exitoso
  }

  return (
    <div className="custom-form">
      <form>
        <label className="custom-label">Username:</label>
        <input
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          placeholder="username"
          className="custom-input"
          type="text"
        />
        <label className="custom-label">Password:</label>
        <input
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="password"
          className="custom-input"
          type="password"
        />
        <button className="custom-button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
