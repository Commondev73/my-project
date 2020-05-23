import React, { Fragment } from "react";
import { Col, Row, Button, Alert } from "reactstrap";
import {
  FaUserCircle,
  FaRegStar,
  FaTrashAlt,
  FaRegEnvelope,
} from "react-icons/fa";

class MailDetail extends React.Component {
  render() {
    const { message, Unread, Save, deleteMail } = this.props;
    return (
      <Fragment>
        <Row className="border border-radius pt-3 pb-3">
          <Col md="12" xs="12" className="mt-3">
            <Row>
              <Col md="6" xs="12">
                <h4 className="d-inline mr-2">
                  <FaUserCircle style={{ color: "Gray" }} /> คุณ {message.name}
                </h4>
              </Col>
              <Col md="6" xs="12" className="d-flex justify-content-end">
                <FaRegStar
                  size="23"
                  className={
                    message.reading_status === 2
                      ? "mt-1 star-2 rounded-circle"
                      : "mt-1 star rounded-circle"
                  }
                  onClick={() => Save()}
                />
                <Button
                  color="primary"
                  className="rounded-pill ml-2"
                  size="sm"
                  onClick={() => Unread()}
                >
                  <FaRegEnvelope className="mr-1" />
                  ยังไม่ได้อ่าน
                </Button>
                <Button
                  color="danger"
                  className="rounded-pill ml-2"
                  size="sm"
                  onClick={() => deleteMail()}
                >
                  <FaTrashAlt className="mr-1" />
                  ลบ
                </Button>
              </Col>
            </Row>
          </Col>
          <Col md="6" xs="8" className="mt-3">
            <p>{message.email}</p>
          </Col>
          <Col md="6" xs="4" className="mt-3 d-flex justify-content-end pl-0">
            <p>{message.created_at}</p>
          </Col>
          <Col className="mt-3">{message.message}</Col>
        </Row>
      </Fragment>
    );
  }
}
export default MailDetail;
