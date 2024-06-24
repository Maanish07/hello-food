import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../utils/UserContext';
import { useSelector } from 'react-redux';

function Header() {
  const {Username} = useContext(UserContext);
  const cartItem = useSelector ((store) => store.cart.items);
  
  
  return (
    <>
      
      <Navbar bg="Success " className='fixed'>
        <Container>
          <Link to="/" className="navbar-brand fs-1 ">Name</Link>
          <Nav className="me-auto">
            
            <Nav.Link as={Link} to="/myorder">MyOrder</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
            <Nav.Link as={Link} to="/Cart" img ="../Assets/trolly.png">{cartItem.length}</Nav.Link>
            

          </Nav>
        </Container>
      </Navbar>
      
    </>
  );
}

export default Header;



