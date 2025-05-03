const API = 'http://localhost:3000/api/auth';

export const loginRequest = async credentials => {
  try {
    const res = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (data.token) return data;
    else return data.message;
  } catch (e) {
    console.log('Server error ', e);
  }
};

export const registerRequest = async userData => {
  try {
    const res = await fetch(`${API}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await res.json();

    if (res.token) return data;
    else return data.message;
  } catch (e) {
    console.log('Server error ', e);
  }
};
