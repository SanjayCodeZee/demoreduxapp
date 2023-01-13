import './style.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Login from './pages/Login';
import TodoList from './pages/TodoList';
import Contact from './pages/Contact';
import Register from './pages/Register';
//import Banner from './components/Banner';
import CheckoutForm from './pages/CheckoutForm';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import Shop from './pages/Shop';
import PrivateRoute from './helpers/PrivateRoute';


function App() {

  return (
    <>
    <BrowserRouter>
      <Navbar />
      {/* <Banner/> */}
      <Routes>
          <Route path="/" exact={true} element={<Home/>}></Route>
          <Route path="/todoList" element={<TodoList/>}></Route>
          <Route path="/contact" element={<Contact/>}></Route>
          <Route element={<PrivateRoute/>}>
              <Route path="/shop" element={<Shop/>} exact></Route>
              <Route path="/checkout" element={<CheckoutForm/>} exact></Route>
              <Route path="shop/product/:productId" element={<ProductDetail/>}></Route>
          </Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/blog" element={<Blog/>}></Route>
          <Route path="*" element={<PageNotFound/>}></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  );
}


function PageNotFound() {
  return (<div>
    <h1>404 Page</h1>
    <p>This is Not found</p>
  </div>)
}

export default App;
