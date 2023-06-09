import './App.css';
import Intro from './components/HowItWork/Intro';
import NavbarMenu from './components/Navbar/Navbar';
import 'react-loading-skeleton/dist/skeleton.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Footer from './components/Footer/Footer';
import toast, { Toaster } from 'react-hot-toast';
import Dashboard from './components/dashboard/DashBoard';
import { usePublicClient } from 'wagmi';
import { useEffect, useMemo, useRef } from 'react';
import FirstLanding from './components/firstLanding/FirstLanding';
import Eth from './components/Eth/Eth';
function App() {
  const {chain:{id}} = usePublicClient()
  const firstRender = useRef(true)
  useMemo(()=>{
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }else{
      window.location.reload(true)
    }
  },[id])
  return (
    <div className="bg_work bg-dark">
    
    <BrowserRouter>
    <NavbarMenu />
   
    
    <Toaster
    />
    <Routes>
    <Route path="/" exact element={<Dashboard />} />
    <Route path="/eth" exact element={<Eth />} />
    <Route path="/howwork" exact element={<Intro />} />
    </Routes>
    <Footer />
    </BrowserRouter>
    </div>
  );
}

export default App;
