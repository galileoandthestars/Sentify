import { Container, Row, Col } from "react-bootstrap";
import { CardCreators } from "./CardCreators";
import creatorsImg1 from "../Assets/img/fabi-pic.jpg";
import creatorsImg2 from "../Assets/img/diego-pic.jpg";

import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Creators = () => {

  const projects = [
    {
      //later add contact info such as github or linkedin profiles.
      title: "Fabiola A. Fonseca",
      description: "A computer engineering student at the University Ana G. Mendez Gurabo Campus",
      imgUrl: creatorsImg1,
    },
    {
      title: "Diego I. Nogueras",
      description: "A computer engineering student at the University Ana G. Mendez Gurabo Campus",
      imgUrl: creatorsImg2,
    },
  ];

  return (
    <section className="creators" id="creators">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div >
                  <h2>Creators</h2>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                  <Row className="creator-align">
                    {
                      projects.map((project, index) => {
                        return (
                          <CardCreators
                            key={index}
                            {...project}
                          />
                        )
                      })
                    }
                  </Row>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}