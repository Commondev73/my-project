import React, { Fragment } from "react";
import "./MailList.css";
import { Row, Col, Container, Input, Button } from "reactstrap";
import Inbox from "./Inbox";
import {
  FaEnvelope,
  FaEnvelopeOpen,
  FaEnvelopeSquare,
  FaStar,
  FaSearch,
} from "react-icons/fa";
import { Link, withRouter } from "react-router-dom";

class MailList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
    };
  }

  tab1 = () => this.setState({ activeTab: 1 });
  tab2 = () => this.setState({ activeTab: 2 });
  tab3 = () => this.setState({ activeTab: 3 });

  render() {
    const { mail } = this.props;
    return (
      <Container>
        <div className="tabs">
          <nav>
            <ul>
              <li
                className={
                  this.state.activeTab === 1
                    ? "active border border-bottom-0"
                    : "border order-bottom-0"
                }
              >
                {/* <Link to="/member/announces"> */}
                <a>
                  <FaEnvelope />
                  &nbsp;ทั้งหมด ()
                </a>
                {/* </Link> */}
              </li>
              <li
                className={
                  this.state.activeTab === 2
                    ? "active border border-bottom-0"
                    : "border border-bottom-0"
                }
              >
                {/* <Link to="/member/announces/draft"> */}
                <a>
                  <FaEnvelopeOpen />
                  &nbsp;อ่านแล้ว ()
                </a>
                {/* </Link> */}
              </li>
              <li
                className={
                  this.state.activeTab === 3
                    ? "active border border-bottom-0"
                    : "border border-bottom-0"
                }
              >
                {/* <Link to="/member/announces/correct"> */}
                <a>
                  <FaEnvelopeSquare />
                  &nbsp;ยังไม่ได้อ่าน ()
                </a>
                {/* </Link> */}
              </li>
              <li
                className={
                  this.state.activeTab === 3
                    ? "active border border-bottom-0"
                    : "border border-bottom-0"
                }
              >
                {/* <Link to="/member/announces/correct"> */}
                <a>
                  <FaStar color="#E5C04D"/>
                  &nbsp;ติดดาว()
                </a>
                {/* </Link> */}
              </li>
            </ul>
          </nav>
          <Container className="pt-3 pb-3 border table-user-announces">
            <Row>
              <Col className="mb-3" md="10" >
                <Input
                  className="rounded-pill"
                  type="Search"
                  name="Search"
                  id="Search"
                  placeholder="ค้นหา"
                />
              </Col>
              <Col md="2">
                <Button color="info" className="rounded-pill" block>
                <FaSearch className="mr-1" />
                  ค้นหา
                </Button>
              </Col>
            </Row>
            <Inbox mail={mail} />
          </Container>
        </div>
      </Container>
    );
  }
}

export default MailList;
