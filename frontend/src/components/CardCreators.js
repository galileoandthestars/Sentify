import { Col, Image } from "react-bootstrap";

export const CardCreators = ({ title, description, imgUrl }) => {
  return (
    <Col size={12} sm={6} md={4}>
      <div className="creators-imgbx">
        <Image src={imgUrl} fluid/>
        <div className="creators-txtx">
          <h4>{title}</h4>
          <p className="p1">{description}</p>
        </div>
      </div>
    </Col>
  )
}