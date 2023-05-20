import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink,Link } from 'react-router-dom';
import logo1 from '../../assets/logo1.png'
import '../style.css'
function NavbarMenu() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand><img src={logo1} className='img-fluid img_logo'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
           
          </Nav>
          <Nav className="px-3">
          <NavLink className="ms-2 text-white text-decoration-none" to="/">How IT Works</NavLink>
          <NavLink className="ms-3 text-white text-decoration-none" to="mint">Mint</NavLink>
            <NavLink className="ms-3 text-white text-decoration-none" to="claim">Claim</NavLink>
            <NavLink className="ms-3 text-white text-decoration-none" eventKey={2} to="transfer">
              Transfer
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarMenu;