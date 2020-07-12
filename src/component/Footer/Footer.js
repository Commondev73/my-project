import React from "react";
import "./Footer.css";
import { Container, Row, Col } from "reactstrap";
import { FaBullhorn, FaLine, FaPhoneSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <footer>
        <Container className="pt-1 pb-1 mt-4">
          <Row>
            <Col md="4">
              <div className="contact">
                <h6>
                  <FaLine
                    className="mr-2"
                    style={{ width: "20px", height: "20px" }}
                  />
                  Line modest37
                </h6>
                <h6>
                  <FaPhoneSquare
                    className="mr-2"
                    style={{ width: "20px", height: "20px" }}
                  />
                  095-918-0931
                </h6>
                <h6>
                  <MdEmail
                    className="mr-2"
                    style={{ width: "20px", height: "20px" }}
                  />
                  xxxx-email@gmail.com
                </h6>
              </div>
            </Col>
            <Col md="8">
              <div className="about-us">
                <h6 className="border-bottom pb-2">
                  <span className="">เกี่ยวกับเรา</span>
                </h6>
                <h6>
                  บริการหา บ้านมือสอง คอนโดให้เช่า ขายบ้าน
                  และอสังหาริมทรัพย์ประกาศเช่า-ขาย ทั่วประเทศ
                </h6>
              </div>
            </Col>
            <Col className="mb-3 text-light">
              <span>&#9400; 2020 Commondev73</span>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}
export default Footer;
