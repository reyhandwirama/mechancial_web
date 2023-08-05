import {Footer, NavigationBar} from './components/NavigationBar';
import {MarketPlace} from './components/MarketPlace';
import "./style/landingPage.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Home} from './components/Home';
import About from './components/About';
import { Cart, Order, ShowCheckout } from './components/Cart';
import { Detail } from './components/detail';
import { Login, Profile} from './components/Profile';
import { userData } from './components/global';
function App() {
  const isLoggin = userData;
  return (
    <div class>
      <BrowserRouter>
      <NavigationBar value={isLoggin}/>
          <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/marketplace" element={<MarketPlace/>}></Route>
          <Route path="/marketplace/:category" element={<MarketPlace/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path={"/cart"} element={<Cart/>}></Route>
          <Route path="/detail/:id_produk" element={<Detail/>}></Route>
          <Route path="/profile/login" element={<Login/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/admin" element={<Profile/>}></Route>
          <Route path="/checkout" element={<ShowCheckout/>}></Route>
          <Route path="/order/:id_order" element={<Order/>}></Route>


          </Routes>
          </BrowserRouter>
      <Footer/>
    </div>
    
    
  );
}

export default App;
