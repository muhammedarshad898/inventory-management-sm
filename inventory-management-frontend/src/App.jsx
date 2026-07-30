
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import './bootstrap.min (6).css'
import {Routes,Route, BrowserRouter} from 'react-router-dom'
import ProductsList from './pages/ProductsList';
import Authentication from './pages/Authentication';

function App() {
 
  return (
    <>
    <BrowserRouter>

    <Routes>
<Route path='/dashboard' element={<ProductsList></ProductsList>}></Route>
<Route path='/' element={<Authentication></Authentication>}></Route>

    </Routes>
    </BrowserRouter>
    <ToastContainer></ToastContainer>
    
    
      
    </>
  )
}

export default App
