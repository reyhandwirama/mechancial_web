import {Container,Nav,Navbar, Row, Col, Image} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { setLocalStorageWithTimeout,userData } from './global';
const NavigationBar = (props) =>{
    setLocalStorageWithTimeout();
    const kondisi = props.value

    if(userData){
      if(userData[0].tipe === "admin"){
        return null;
      }
      
    }
    return(
        <Navbar collapseOnSelect expand="lg" style={{backgroundColor:"#F5F5F5",position:'sticky'}} fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/"><Image src='/assets/images/logo.png' className='logo' alt='Logo'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/marketplace">MarketPlace</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            
          </Nav>
          <Nav>
            <Nav.Link as={Link} to={kondisi ? "/cart" :"profile/login"}><i className="fa fa-shopping-cart"></i></Nav.Link>
            <Nav.Link eventKey={2} as={Link} to={kondisi ? "/profile" :"profile/login"}>
              Profile
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
  }

function Footer(){
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Simulate an asynchronous operation
      setTimeout(() => {
        setIsLoading(false); // Set isLoading to false after the data is loaded
      }, 300);
    }, []);

    
    if (isLoading) {
    return <div></div>;
  }
  if(userData){
    if(userData[0].tipe === "admin"){
      return null;
    }
  }
  return (
    <Container fluid className='p-2 overflow-hidden' style={{backgroundColor:"#F5F5F5", position:'relative', bottom:0}} fixed="bottom">
      <Row>
        <Col xs={{order:3}} md={{order:1}}>
          <Col><Image src='/assets/images/logo.png' className='logo'/></Col>
          <Row><p>©Mecha.id 2023. All Rights Reserved.</p></Row>
        </Col>
        <Col md={5} xs={{order:1}}>
          <Col className='d-flex justify-content-center'><p><strong>Alamat</strong></p></Col>
          <Col className='d-flex justify-content-center'><p>Jl.Gelatik No 85 Blok F, Tangerang Selatan, Banten </p></Col>
        </Col>
        <Col  xs={{order:2}}>
          <Col className='d-flex justify-content-center'>
            <p><strong>Social Media</strong></p>
            </Col>
          <Col className='d-flex justify-content-center'>
          <ul style={{listStyleType:"none", marginLeft:-30}}>
              <li style={{marginTop:-10}}><p className='fa fa-facebook'> MechaId</p></li>
              <li style={{marginTop:-10}}><p className='fa fa-instagram'> Mecha.Id</p></li>
            </ul>
            </Col>
        </Col>

      </Row>
    </Container>
  )
}
export {NavigationBar, Footer}