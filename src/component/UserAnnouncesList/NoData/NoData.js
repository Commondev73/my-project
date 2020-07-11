import React from "react";
import "./NoData.css";
import { Container, Row, Col } from "reactstrap";
import noData from "../../image/Nodata.png";

class NoData extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col xs="12" md="12">
            <div className="image-noData">
              <img src={noData} alt="noData" />
            </div>
          </Col>
          <Col xs="12" md="12" className="text-center">
            <h5>ไม่พบข้อมูล</h5>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NoData;
