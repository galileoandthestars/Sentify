import { Col, Container, Row } from "react-bootstrap"
import { useEffect, useState } from "react";
import Image from 'react-bootstrap/Image'
import aboutImg from "../Assets/img/1879056.png";
/*import {useState, useEffect} from "react";*/

export const About = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const toRotate = ["happy.", "sad.", "angry.", "surprise.", "disgust.", "fear.", "neutral."];
    const [text, setText] = useState('');
    const period = 2000;
    const [delta, setDelta] = useState(400 - Math.random() * 100);

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta)
        return () => { clearInterval(ticker) };
    }, [text])

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }
        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        }
        else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(500);
        }
    }

    return (
        <section className="about" id="about">
            <div className="about-bx">
                <Container>
                    <Row className="align-items-center">
                        <Col xs={12} md={6} xl={5}>
                            <Image src={aboutImg} alt="about img" fluid />
                        </Col>
                        <Col xs={12} md={6} xl={7}>
                            <h4>{'It\'s okay to feel '}<span className="wrap"> {text}</span></h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At imperdiet dui accumsan sit amet nulla. Ut enim blandit volutpat maecenas volutpat. Phasellus faucibus scelerisque eleifend donec. Mi proin sed libero enim sed faucibus turpis in. Diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus. Semper viverra nam libero justo. Eros in cursus turpis massa tincidunt. Mauris vitae ultricies leo integer malesuada nunc vel risus commodo. Tortor at auctor urna nunc id cursus metus aliquam eleifend. A diam sollicitudin tempor id eu nisl nunc mi ipsum. Tellus mauris a diam maecenas sed.</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </section>
    )
}