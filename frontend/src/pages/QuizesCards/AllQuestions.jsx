import { useEffect, useState } from 'react';
import { getAllQuestions } from '../../services/questionService';
import styles from './styles.module.css';

const AllQuestions = ({ testId }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getAllQuestions()
      .then(data => {
        setQuestions(data);
      })
      .catch(err => {
        console.error('Error fetching memes: ', err);
      });
  }, []);

  const filteredQuestions = questions.filter(
    q => q.testId === Number(testId),
  );

  return (
    <ul>
      {filteredQuestions.map(question => (
        <li key={question.id} className={styles.qst}>
          <h1>{question.text}</h1>
          <p>type: {question.type}</p>
          <p>points: {question.points}</p>
          <p>
            Created at:{' '}
            {new Date(question.createdAt).toLocaleString()}
          </p>
          <ul>
            {question.options.map(option => (
              <li key={option.id}>
                {option.text} {option.isCorrect && '✅'}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default AllQuestions;
