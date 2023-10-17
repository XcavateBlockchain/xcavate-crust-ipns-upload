import Navbar from './components/Navbar'
import Home from './components/Home'
import Marketplace from './components/main/Marketplace'
import Profile from './components/main/Profile'
import PropertyListing from './components/main/PropertyListing'
import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import LinkCredential from './components/main/LinkCredential'
import UserRole from './components/main/UserRole'
import PropertyDetail from './components/main/PropertyDetail'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import WalletDownload from './components/main/WalletDownload'
import DidPayment from './components/main/DidPayment'
import { TermsAndCondition } from './components/TermsAndCondition'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import BuyProcess from './components/main/BuyProcess'

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/market-place' element={<Marketplace />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/list-property' element={<PropertyListing />} />
        <Route path='/user-role' element={<UserRole />} />
        <Route path='/wallet-download' element={<WalletDownload />} />
        <Route path='/did-payment' element={<DidPayment />} />
        <Route path='/link-credential' element={<LinkCredential />} />
        <Route path='/terms-and-conditions' element={<TermsAndCondition />} />
        <Route path='/property-detail/:id' element={<PropertyDetail />} />
        <Route path='/buy-process/:id' element={<BuyProcess />} />
      </Routes>
      <ToastContainer />      
      <Footer /> 
    </Provider>
  );
}

export default App;
