import React from 'react'
import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar className="bg-primary">
      <Container>
        <Navbar.Brand>
          <Link to={'/'} className='fs-4' style={{ textDecoration: 'none', color: 'white' }}><i class="fa-solid fa-user"></i>{' '}
            Student list
          </Link>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

            <Nav.Link className='btn btn-light'><Link style={{textDecoration:'none',color:"white",fontWeight:"bold"}} to={'/'}>Home </Link></Nav.Link>
            

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header