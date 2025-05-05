import { useState } from 'react';
import styles from './styles.module.css';
import { addQuestion } from '../../services/questionService';
import { useParams } from 'react-router-dom';
import AllQuestions from './AllQuestions';

const QuestionCard = () => {
  const { testId } = useParams();
  const [question, setQuestion] = useState('');
  const [type, setType] = useState('multiple');
  const [options, setOptions] = useState([
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
  ]);
  const [points, setPoints] = useState(1);
  const [show, setShow] = useState(false);

  const handleOptionTextChange = (index, value) => {
    const updated = [...options];
    updated[index].text = value;
    setOptions(updated);
  };

  const handleCorrectChange = index => {
    const updated = [...options];
    if (type === 'single') {
      updated.forEach((opt, i) => (opt.isCorrect = i === index));
    } else {
      updated[index].isCorrect = !updated[index].isCorrect;
    }
    setOptions(updated);
  };

  const handleAddOption = () => {
    setOptions([...options, { text: '', isCorrect: false }]);
  };

  const handleRemoveOption = index => {
    const updated = options.filter((_, i) => i !== index);
    setOptions(updated);
  };

  const handleTypeChange = value => {
    setType(value);
    if (value === 'text') {
      setOptions([{ text: '', isCorrect: true }]);
    } else if (value === 'single') {
      setOptions([{ text: '', isCorrect: false }]);
    } else if (value === 'multiple') {
      setOptions([
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
      ]);
    }
  };

  const handleSubmit = async () => {
    if (!question.trim()) {
      alert('fill in all the fields');
      return;
    }

    if (type === 'text' && question.trim() === '') {
      alert('Please provide a text question.');
      return;
    }

    if (type !== 'text') {
      const notEmptyOptions = options.filter(
        opt => opt.text.trim() !== '',
      );
      if (notEmptyOptions.length === 0) {
        alert('Please add at least one option.');
        return;
      }

      const notEmptyCheckbox = options.some(opt => opt.isCorrect);
      if (!notEmptyCheckbox) {
        alert('Please mark at least one correct option.');
        return;
      }
    }
    if (type === 'text') {
      if (options[0]?.text.trim() === '') {
        alert('Please provide a text option.');
        return;
      }
    } else {
      const notEmptyOptions = options.filter(
        opt => opt.text.trim() !== '',
      );
      if (notEmptyOptions.length === 0) {
        alert('Please add at least one option.');
        return;
      }

      const notEmptyCheckbox = options.some(opt => opt.isCorrect);
      if (!notEmptyCheckbox) {
        alert('Please mark at least one correct option.');
        return;
      }
    }

    const payload = {
      testId,
      text: question, // текст вопроса
      type, // тип вопроса
      points, // количество баллов
      options:
        type === 'text'
          ? []
          : options.map(opt => ({
              text: opt.text,
              isCorrect: opt.isCorrect,
            })), // если тип 'text', передаем пустой массив, иначе - опции
    };

    try {
      const res = await addQuestion(payload);
      if (res) {
        setQuestion('');
        setPoints(1);
        handleTypeChange('multiple');
      } else {
        alert('Failed to add question');
      }
    } catch (e) {
      console.log('SErver error: ', e);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.question}>
        <p>Question:</p>
        <input
          type="text"
          className={styles.inp_qst}
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />
      </div>

      <div className={styles.question}>
        <p>Type:</p>
        <select
          className={styles.inp_qst}
          value={type}
          onChange={e => handleTypeChange(e.target.value)}
        >
          <option value="multiple">Multiple</option>
          <option value="single">Single</option>
          <option value="text">Text</option>
        </select>
      </div>

      {type !== 'text' ? (
        <div className={styles.container}>
          <p>Answer options:</p>
          <div className={styles.options_container}>
            {options.map((opt, i) => (
              <div
                key={i}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <textarea
                  className={styles.inp_opt}
                  value={opt.text}
                  onChange={e =>
                    handleOptionTextChange(i, e.target.value)
                  }
                />
                <input
                  type="checkbox"
                  checked={opt.isCorrect}
                  onChange={() => handleCorrectChange(i)}
                  style={{ marginLeft: '10px' }}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {options.map((opt, i) => (
            <input
              type="text"
              className={styles.inp_opt}
              value={opt.text}
              onChange={e =>
                handleOptionTextChange(i, e.target.value)
              }
            />
          ))}
        </>
      )}

      {type === 'multiple' && (
        <div className={styles.btns}>
          <button
            type="button"
            className={styles.btn}
            onClick={handleAddOption}
          >
            add new option
          </button>
          <button
            type="button"
            className={styles.btn}
            onClick={() => handleRemoveOption(options.length - 1)}
            disabled={options.length <= 1}
          >
            delete
          </button>
        </div>
      )}

      <div className={styles.grades}>
        <p>Points per question:</p>
        <input
          type="number"
          className={styles.points}
          value={points}
          onChange={e => setPoints(Number(e.target.value))}
        />
      </div>
      <div style={{ display: 'flex' }}>
        <button
          className={styles.save}
          onClick={() => setShow(!show)}
        >
          {show ? 'hide' : 'show'} all questions
        </button>
        <button className={styles.save} onClick={handleSubmit}>
          Next
        </button>
      </div>

      {show && <AllQuestions testId={testId} />}
    </div>
  );
};

export default QuestionCard;
