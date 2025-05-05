import { useState } from 'react';
import styles from '../../styles/auth.module.css';
import { registerRequest } from '../../services/userService';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async e => {
    e.preventDefault();

    const { name, email, password } = formData;

    const response = await registerRequest({
      name,
      email,
      password,
    });

    if (response) {
      setFormData({
        name: '',
        email: '',
        password: '',
      });
      setMessage(
        `Registration was successful, please log in to your account.`,
      );
    } else {
      setMessage(response);
    }
  };

  return (
    <div className={styles.auth}>
      <form onSubmit={handleRegister} className={styles.form_auth}>
        <h1 className={styles.auth_h1}>Sign Up</h1>

        <div className={styles.inps}>
          <input
            className={styles.auth_inp}
            type="text"
            placeholder="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className={styles.auth_inp}
            type="email"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className={styles.auth_inp}
            type="password"
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className={styles.btn_auth}>Sign Up</button>
        <p className={styles.error}>{message}</p>
      </form>
    </div>
  );
};

export default SignUp;
