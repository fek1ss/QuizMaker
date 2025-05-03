import { useState } from 'react';
import MultipleQuize from './MultipleQuize';
import SingleQuize from './SingleQuize';
import TextQuize from './TextQuize';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import styles from './styles.module.css';

const categories = ['single', 'multiple', 'text'];

const QuizeContainer = () => {
  const [cards, setCards] = useState(false);
  const [category, setCategory] = useState('multiple');

  const renderCard = () => {
    switch (category) {
      case 'multiple':
        return <MultipleQuize />;
      case 'single':
        return <SingleQuize />;
      case 'text':
        return <TextQuize />;
      default:
        return null;
    }
  };

  const toggle = () => {
    setCards(!cards);
  };

  return (
    <div>
      <h1 className={styles.title}>
        Create your quize or start exist
      </h1>
      <button onClick={toggle}>
        {cards ? 'close' : 'create your own quize'}
      </button>
      {cards && (
        <>
          <div className={styles.options}>
            <h3>Question type: </h3>
            <select
              onChange={e => setCategory(e.target.value)}
              value={category}
            >
              {categories.map(option => (
                <option key={option} value={option}>
                  <p>{option}</p>
                </option>
              ))}
            </select>
          </div>

          <div
            style={{
              position: 'relative',
              height: '200px',
              marginTop: '20px',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={category}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  width: '100%',
                }}
              >
                {renderCard()}
                <div className={styles.button_container}>
                  <button className={styles.btn_next}>Next</button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
};

export default QuizeContainer;
