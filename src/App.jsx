import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import AdminPage from './pages/AdminPage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
// import Dashboard from './pages/Dashboard.jsx';
import HomePage from './pages/HomePage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        {/* <Route path="/admin" element={<AdminPage />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
