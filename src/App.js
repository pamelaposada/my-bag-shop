import ProductList from './components/ProductList';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import NotFound from './components/NotFound';

import './App.css';
import SubmitPurchase from './components/SubmitPurchase';
import SignUpSession from './components/SignUpSession';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList/>}/>
        <Route path="/checkout" element={<SubmitPurchase/>}/>
        <Route path="/signup" element={<SignUpSession/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  
  );
}

export default App;
