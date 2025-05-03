import { useState } from 'react';
import styles from '../../styles/auth.module.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../reducers/AuthReducer';
import { loginRequest } from './../../services/userService';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const data = await loginRequest({ email, password });

      if (data.token) {
        dispatch(login({ user: data, token: data.token }));
        navigate('/create-quize');
      } else {
        setMessage(data || 'Invalid credentials');
      }
    } catch (err) {
      setMessage('Server error');
      console.error(err);
    }
  };

  return (
    <div className={styles.auth}>
      <form onSubmit={handleLogin} className={styles.form_auth}>
        <h1 className={styles.auth_h1}>Login</h1>

        <div className={styles.inps}>
          <input
            className={styles.auth_inp}
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="email: "
            required
          />
          <input
            className={styles.auth_inp}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="password: "
            required
          />
        </div>

        <div className="btn_error">
          <p className={styles.error}>{message}</p>
          <button type="submit" className={styles.btn_auth}>
            login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
