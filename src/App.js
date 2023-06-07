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
    <div className="bg_work">
    
    <BrowserRouter>
    <NavbarMenu />
    <FirstLanding />
    
    <Toaster
    />
    <Routes>
    <Route path="/" exact element={<Dashboard />} />
    </Routes>
    <Footer />
    </BrowserRouter>
    </div>
  );
}

export default App;
