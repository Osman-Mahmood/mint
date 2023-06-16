import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo1 from "../../assets/logo1.png"
import { NavLink, Link } from 'react-router-dom';
import '../style.css'
import { ConnectButton } from '@rainbow-me/rainbowkit';

function NavbarMenu() {


  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        {/* <Navbar.Brand><img src={logo} className='img-fluid img_logo'/></Navbar.Brand> */}
     <Navbar.Brand as={Link} to="/" className='text-center d-flex align-items-center'><img src={logo1} className='img-fluid img_logo' />
     {/* <div className="ms-2 hover fw" style={{fontSize:"16px"}}>u369.eth</div> */}
     <Nav className="px-3">
     <NavLink className=" text-dark hover text-decoration-none  fw" to="/">u369.eth</NavLink>
     </Nav>
     </Navbar.Brand>
        <button className='new_btn w-50 mobile_btn text-end justify-content-end' >
        <ConnectButton chainStatus="icon"  accountStatus="address"  showBalance={false} />
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
          <ConnectButton chainStatus="icon"  accountStatus="address"  showBalance={false} className=""/>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarMenu;