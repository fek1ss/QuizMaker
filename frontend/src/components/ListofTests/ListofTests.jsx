import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { addTest, getAllTests } from '../../services/testService';
import { useSelector } from 'react-redux';
import Test from '../Test/Test';

const ListofTests = () => {
  const [tests, setTests] = useState([]);
  const user = useSelector(state => state.auth.user);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (user) {
      getAllTests()
        .then(data => {
          setTests(data);
        })
        .catch(err => {
          console.error('Error fetching tests: ', err);
        });
    }
  }, [user]);
  console.log(tests);

  const handleAddTest = async () => {
    console.log('data: ', title, description, tags, user);
    const newTest = {
      title,
      description,
      tags,
      userId: user.userId,
    };

    try {
      const response = await addTest(newTest);
      if (response) {
        setTests(prev => [...prev, response]);
        setTitle('');
        setShow(false);
      } else alert('Failed to add new test');
    } catch (error) {
      console.log('Server error', error);
    }
  };

  return (
    <div className={styles.list}>
      {tests.map(test => (
        <Test
          id={test.id}
          title={test.title}
          description={test.description}
          tags={test.tags}
        />
      ))}
      <button
        className={styles.add_btn}
        onClick={() => setShow(true)}
      >
        +
      </button>
      {show && (
        <div className={styles.emptyCard}>
          title:{' '}
          <input
            className={styles.inp_emp}
            type="text"
            onChange={e => setTitle(e.target.value)}
          />
          description:{' '}
          <input
            className={styles.inp_emp}
            type="text"
            onChange={e => setDescription(e.target.value)}
          />
          tags:{' '}
          <input
            className={styles.inp_emp}
            type="text"
            onChange={e => setTags(e.target.value)}
          />
          <button
            onClick={handleAddTest}
            className={styles.btn_create_test}
          >
            create test
          </button>
        </div>
      )}
    </div>
  );
};

export default ListofTests;
