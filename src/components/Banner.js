import { Col, Container, Row } from "react-bootstrap"
import { ArrowRightCircle } from "react-bootstrap-icons";
import Image from 'react-bootstrap/Image'
import hero from "../Assets/img/pngwing.com.png";

export const Banner =()=>{
    return(
    <section className="banner" id="home">
    <Container>
        <Row className="align-items-center">
            <Col xs={12} md={6} xl={7}>
                <h1>{'Welcome to Sentify!'}<span className="wrap"> {/*{text}*/}</span></h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque diam volutpat commodo sed egestas. Nibh ipsum consequat nisl vel pretium lectus quam id leo.</p>
                <button onClick={()=> console.log('sign-up')}>Sign Up<ArrowRightCircle size="25"/></button>
            </Col>
            <Col xs={12} md={6} xl={5}>
                <Image src= {hero} alt="hero img" fluid />
            </Col>
        </Row>
    </Container>
    </section>
    )
}