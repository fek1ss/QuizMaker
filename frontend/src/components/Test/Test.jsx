import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

const Test = ({ id, title, description, tags }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.testCard} key={id}>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>tags: {tags}</p>
      <button onClick={() => navigate(`/create-quize/${id}`)}>
        Edit
      </button>
      <button onClick={() => navigate(`/get-start/${id}`)}>
        Start
      </button>
    </div>
  );
};
export default Test;
