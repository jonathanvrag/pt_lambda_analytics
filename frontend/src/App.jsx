import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Login from './components/login';
import UserList from './components/UserList';
import Products from './components/Products';
import WishList from './components/WishList';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Box>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path='/usersList' element={<UserList />} />
          <Route path='/products' element={<Products />} />
          <Route path='/wishList' element={<WishList />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
