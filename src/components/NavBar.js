import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useState, useEffect} from "react";
import { Link } from 'react-router-dom';

export const NavBar = () => {
    /*amanagement about which link we are at the moment using useState hook */
    const [activeLink, setActiveLink] = useState('home');

    /*Makes the navbar solid when the user scrolls otherwise it will blend with the background at home position (beginning) */
    const [scrolled, setScrolled]= useState(false);
    useEffect(()=>{
        const onScroll = () => {
            if(window.scrollY > 50){
                setScrolled(true);
            }
            else{
                setScrolled(false);
            }
        }
        window.addEventListener("scroll", onScroll);
        return() => window.removeEventListener("scroll", onScroll);
    }, [])

    const onUpdateActiveLink = (value) =>{
        setActiveLink(value);
    }
  return (
    <Navbar  expand="lg" className= {scrolled ? "scrolled" : ""}>
      <Container fluid>
        <Navbar.Brand> <Link to="/">Sentify</Link></Navbar.Brand>
        {/*Toggler for mobile development. Navbars renders as collapse on mobile phones*/}
        <Navbar.Toggle aria-controls="basic-navbar-nav"> 
         <span className = "navbar-toggler-icon"></span> </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#about" className={activeLink === 'about' ? 'active navbar-link' : 'navbar-link'} onClick= {() => onUpdateActiveLink('about')}>About</Nav.Link>
            <Nav.Link href="#features" className={activeLink === 'features' ? 'active navbar-link' : 'navbar-link'} onClick= {() => onUpdateActiveLink('features')}>Features</Nav.Link>
            <Nav.Link href="#tutorial" className={activeLink === 'tutorial' ? 'active navbar-link' : 'navbar-link'} onClick= {() => onUpdateActiveLink('tutorial')}>Tutorial</Nav.Link>
            <Nav.Link href="#creators" className={activeLink === 'creators' ? 'active navbar-link' : 'navbar-link'} onClick= {() => onUpdateActiveLink('creators')}>Creators</Nav.Link>
            <Nav.Link href="#contact" className={activeLink === 'contact' ? 'active navbar-link' : 'navbar-link'} onClick= {() => onUpdateActiveLink('contact')}>Contact Us</Nav.Link>
          </Nav>
          <span className='navbar-text'>
          <Link className="login-button" to="/login"><span>Log In</span></Link>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

