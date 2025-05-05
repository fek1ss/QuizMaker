import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import { useSelector } from 'react-redux';
import AuthContainer from './pages/AuthPages/AuthContainer';
import NavBar from './components/NavBar/NavBar';
import ListofTests from './components/ListofTests/ListofTests';
import QuestionCard from './pages/QuizesCards/QuestionCard';
import TestRunner from './components/TestRunner/TestRunner';

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
          path="/create-quize/:testId"
          element={user ? <QuestionCard /> : <AuthContainer />}
        />
        <Route path="/results" element={''} />
        <Route path="/all-quizis" element={<ListofTests />} />
        <Route path="/get-start/:testId" element={<TestRunner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
