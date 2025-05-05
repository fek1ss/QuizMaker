const API = 'http://localhost:3000/api/questions';

export const getAllQuestions = async () => {
  try {
    const response = await fetch(API);
    const data = await response.json();

    if (!data.error) return data;
    else return data.error;
  } catch (e) {
    console.log('Server error: ', e);
  }
};

export const addQuestion = async question => {
  try {
    console.log('Sending question:', question);
    const response = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(question),
    });

    let data;
    try {
      data = await response.json();
    } catch (e) {
      console.error('Ошибка парсинга JSON:', e);
      throw new Error('Invalid JSON response from server');
    }

    if (response.ok) {
      return data;
    } else {
      throw new Error(data?.message || 'Failed to add question');
    }
  } catch (e) {
    console.error('Server error in addQuestion():', e);
    throw e;
  }
};
