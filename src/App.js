import './App.css';
import { Routes, Route } from 'react-router-dom';
import { LoginPage, ShowAlbums, NavBar, Logout } from './components';

function App() {
  return (
    <div className='app'>
      <NavBar/>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/albums/show' element={<ShowAlbums />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </div>
  );
};

export default App;
