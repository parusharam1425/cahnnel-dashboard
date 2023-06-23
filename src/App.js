import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/login/Login';
import Register from './components/login/Register';
import Data from './components/login/Data';
import Project from './components/routes/Project';
import Customers from './components/routes/Customers';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/data" element={<Data />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
