import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigateByUrl=useNavigate();
    return (
        
            <Navbar className="bg-body-tertiary bg-dark">
                <Container>
                    <Navbar.Brand href="#home" style={{color:"white",fontSize:"20px"}} >
                    <i class="fa-solid fa-video fa-xl me-2 text-warning" onClick={()=>navigateByUrl('/')}></i>
                        Media player</Navbar.Brand>
                        <Navbar.Text>
                            Signed in as: <a href="#login">Mark Otto</a>
                        </Navbar.Text>
                </Container>
            </Navbar>
       
    )
}

export default Header;