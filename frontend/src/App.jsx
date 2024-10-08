import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/login';
import UserList from './components/UserList';
import Products from './components/Products';
import { Box } from '@mui/material';

function App() {
  return (
    <Box>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/usersList' element={<UserList />} />
        <Route path='/products' element={<Products />} />
      </Routes>
    </Box>
  );
}

export default App;
