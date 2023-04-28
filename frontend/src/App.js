import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import AddBook from './pages/AddBook';
import Search from './components/search';
import Welcome from './pages/Welcome';
import Me from './pages/me';
import BookDetail from './components/BookDetail';
import AddEdition from './pages/AddEdition';
import UpdateBook from './pages/UpdateBook';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/addBook' element={<AddBook />} />
        <Route path='/books/search/:searchTerm' element={<Search />} />
        <Route path='/welcome/:user' element={<Welcome />} />
        <Route path='/me' element={<Me />} />
        <Route path='/books/:id' element={<BookDetail />} />
        <Route path='/books/editions/:id' element={<AddEdition />} />
        <Route path='/books/update/:id' element={<UpdateBook />} />
      </Routes>
    </BrowserRouter>
    );
}

export default App;
