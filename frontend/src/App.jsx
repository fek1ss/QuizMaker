import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './pages/Home/Home';
import { useSelector } from 'react-redux';
import AuthContainer from './pages/AuthPages/AuthContainer';
import NavBar from './components/NavBar/NavBar';
import QuizeContainer from './pages/QuizesCards/QuizeContainer';

function App() {
  const user = useSelector(state => state.auth.user);

  return (
    <BrowserRouter>
      {user && <NavBar />}
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <AuthContainer />}
        />
        <Route path="/login" element={<AuthContainer />} />
        <Route
          path="/create-quize"
          element={user ? <QuizeContainer /> : <AuthContainer />}
        />
        <Route path="/results" element={''} />
        <Route path="/profile" element={''} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
