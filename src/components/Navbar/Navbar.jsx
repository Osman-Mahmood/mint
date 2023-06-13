import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "../../assets/logo.png"
import logo1 from "../../assets/logo1.png"
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '../style.css'
import { walletShortFormer } from '../../utils';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function NavbarMenu() {
  const dispatch = useDispatch()
  let { userWallet, isWalletConnected } = useSelector((state) => state.connect);
 
//   .mobile_btn{
//     display: none;
// }
// .dekstop_btn{
//     display: block;
// }
// @media only screen and (max-width: 425px) {
//     .mobile_btn{
//         display: block;
//     }
//     .dekstop_btn{
//         display: none;
//     }
//   }
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        {/* <Navbar.Brand><img src={logo} className='img-fluid img_logo'/></Navbar.Brand> */}
     <Navbar.Brand as={Link} to="/" className='text-center d-flex align-items-center'><img src={logo1} className='img-fluid img_logo' /><div className="ms-2 fw" style={{fontSize:"16px"}}>u369.eth</div></Navbar.Brand>
        <button className='new_btn w-50 mobile_btn text-end justify-content-end' >
        <ConnectButton />
        </button>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className='' id="responsive-navbar-nav">
          <Nav className=''></Nav>
          <Nav className="px-3">
          {/* <NavLink className="ms-2 p-1 text-white text-decoration-none" to="/"></NavLink> */}
            <NavLink className="ms-3 text-dark text-decoration-none hover fw" to="/eth">What is u369.eth?</NavLink>
            <NavLink className="ms-3 text-dark text-decoration-none hover fw" to="/howwork">How it works</NavLink>
          

          </Nav>
          <Nav className='justify-content-end ms-auto d-lg-block d-none'>
          <ConnectButton className=""/>
            {/* <select name="" id="" className='form-select form-select-lg mb-3 w-25 rounded-pill'
            
            >
              <option value="" disabled={true} selected> --Choose A  Network--</option>
              <option value=""> Ethereum </option>
              <option value=""> Polygon </option>
              <option value=""> Wrong Network </option>
            </select> */}
            
            {/* <button className='btn w-25 dekstop_btn'>Network</button> */}
            {/* <button className='btn w-50 dekstop_btn' onClick={connectWallet}>
              {isWalletConnected
                ? walletShortFormer(userWallet)
                : "Connect Wallet"}
            </button> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarMenu;