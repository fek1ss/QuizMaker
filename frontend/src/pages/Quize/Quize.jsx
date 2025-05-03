import { useSelector } from 'react-redux';
import styles from './styles.module.css';

const Quize = () => {
  const user = useSelector(state => state.auth.user);

  console.log(user);
  return <div className={styles.quize}></div>;
};
export default Quize;
