import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllQuestions } from '../../services/questionService';
import styles from './styles.module.css';

const TestRunner = () => {
  const { testId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    getAllQuestions().then(data => {
      const filtered = data.filter(q => q.testId === Number(testId));
      setQuestions(filtered);
    });
  }, [testId]);

  const handleAnswerChange = (questionId, optionId) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleNext = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const handleFinish = () => {
    let correct = 0;
    let totalEarnedPoints = 0;

    questions.forEach(q => {
      const answer = selectedAnswers[q.id];

      if (q.type === 'text') {
        const userAnswer = answer?.trim().toLowerCase();
        const correctAnswer = q.options[0]?.text.trim().toLowerCase();
        if (userAnswer === correctAnswer) {
          correct++;
          totalEarnedPoints += q.points || 0; // ← добавлено
        }
      } else {
        const correctOption = q.options.find(opt => opt.isCorrect);
        if (Number(answer) === correctOption?.id) {
          correct++;
          totalEarnedPoints += q.points || 0; // ← добавлено
        }
      }
    });

    setScore(correct);
    setPoints(totalEarnedPoints); // ← добавлено
  };

  if (questions.length === 0) return <p>Loading...</p>;

  if (score !== null) {
    return (
      <div className={styles.results}>
        <h1 style={{ color: 'black' }}>Test Completed</h1>
        <p style={{ color: 'black' }}>
          Your score: {score} / {questions.length}
        </p>
        <p style={{ color: 'black' }}>
          Total points earned: {points}
        </p>{' '}
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  return (
    <div className={styles.container}>
      <h2 className={styles.question}>
        {currentIndex + 1}. {currentQuestion.text}
      </h2>
      {currentQuestion.type === 'text' ? (
        <input
          type="text"
          value={selectedAnswers[currentQuestion.id] || ''}
          onChange={e =>
            handleAnswerChange(currentQuestion.id, e.target.value)
          }
        />
      ) : (
        <ul>
          {currentQuestion.options.map(option => (
            <li key={option.id}>
              <label>
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={option.id}
                  checked={
                    selectedAnswers[currentQuestion.id] === option.id
                  }
                  onChange={() =>
                    handleAnswerChange(currentQuestion.id, option.id)
                  }
                />
                {option.text}
              </label>
            </li>
          ))}
        </ul>
      )}

      {currentIndex < questions.length - 1 ? (
        <button
          onClick={handleNext}
          disabled={!selectedAnswers[currentQuestion.id]}
        >
          Next
        </button>
      ) : (
        <button
          onClick={handleFinish}
          disabled={!selectedAnswers[currentQuestion.id]}
        >
          Finish
        </button>
      )}
      {score}
    </div>
  );
};

export default TestRunner;
