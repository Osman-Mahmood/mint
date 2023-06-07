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
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        {/* <Navbar.Brand><img src={logo} className='img-fluid img_logo'/></Navbar.Brand> */}
        <Navbar.Brand className='text-center'><img src={logo1} className='img-fluid img_logo' /><div className="" style={{fontSize:"12px"}}>u369.eth</div></Navbar.Brand>
        <button className='btn w-50 mobile_btn' >
        <ConnectButton />
        </button>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className='' id="responsive-navbar-nav">
          <Nav className='ms-auto'></Nav>
          {/* <Nav className="px-3">
          <NavLink className="ms-2 p-1 text-white text-decoration-none" to="/">Dashboard</NavLink>
            <NavLink className="ms-3 text-white text-decoration-none" to="mint">Mint</NavLink>
            <NavLink className="ms-3 text-white text-decoration-none" to="claim">Claim</NavLink>
            <NavLink className="ms-3 text-white text-decoration-none" eventKey={2} to="transfer">
              Transfer
            </NavLink>

          </Nav> */}
          <Nav className='w-50 justify-content-end'>
          <ConnectButton />
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