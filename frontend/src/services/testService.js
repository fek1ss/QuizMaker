const API = 'http://localhost:3000/api/tests';

export const getAllTests = async () => {
  try {
    const response = await fetch(API);

    const data = await response.json();
    if (data) return data;
    else return data.error;
  } catch (err) {
    console.log('Server error: ', err);
  }
};

export const addTest = async test => {
  try {
    const response = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(test),
    });
    const data = await response.json();

    if (!data.error) return data;
    else return data.error;
  } catch (error) {
    console.log('server error: ', error);
  }
};
