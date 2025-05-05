import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from './../../reducers/AuthReducer';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const NavBar = () => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className={styles.navBar}>
      <div className={styles.inner_navbar}>
        <Link to="/" className={styles.link}>
          Welcome
        </Link>{' '}
        &nbsp;
        <Link to="/all-quizis" className={styles.link}>
          Tests
        </Link>
        &nbsp;
        <Link to="/start-quize" className={styles.link}>
          Start the test
        </Link>
        &nbsp;
        <Link to="/statistics" className={styles.link}>
          Statistics
        </Link>
        {user && (
          <button
            onClick={handleLogout}
            className={`${styles.logout_btn} ${styles.btn}`}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
