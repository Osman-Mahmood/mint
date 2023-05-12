import './App.css';
import Intro from './components/HowItWork/Intro';
import NavbarMenu from './components/Navbar/Navbar';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Transfer from './components/Transfer/Transfer';
import Mint from './components/Mint/Mint';
import Claim from './components/Claim/Claim';
import Footer from './components/Footer/Footer';
function App() {
  return (
    <div className="">
    
    <BrowserRouter>
    <NavbarMenu />
    <Routes>
    <Route path="/" exact element={<Intro />} />
    <Route path="/transfer" exact element={<Transfer />} />
    <Route path="/mint" exact element={<Mint />} />
    <Route path="/claim" exact element={<Claim />} />
    </Routes>
    <Footer />
    </BrowserRouter>
    </div>
  );
}

export default App;
