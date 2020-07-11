import React, { Fragment } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "./ErrorPage.css";

class ErrorPage extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col sm="12" md={{ size: "10", offset: "1" }} className="mt-3">
            <div className="four_zero_four_bg">
              <h1 className="text-center">404 page not found</h1>
            </div>

            <div className="contant_box_404 text-center">
              {/* <h1>404 page not found.</h1> */}
              <h1>ขออภัย ไม่พบหน้าที่คุณต้องการ</h1>
            </div>
          </Col>
          <Col sm="12" md={{ size: "4", offset: "4" }}>
            <a href="/">
              <Button block color="success" className="rounded-pill">
                กลับหน้าแรก
              </Button>
            </a>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ErrorPage;
