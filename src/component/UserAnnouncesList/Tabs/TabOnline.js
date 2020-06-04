import React, { Fragment } from "react";
import "./TabOnline.css";
import { Row, Col, Button } from "reactstrap";
import { FaTrashAlt, FaPen, FaBullhorn, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

class TabOnline extends React.Component {

  dateFormat = (date) => {
    const months = ["ม.ค", "ก.พ", "มี.ค", "เม.ย", "พ.ค.", "มิ.ย",
      "ก.ค", "ส.ค", "ก.ย", "ต.ค", "พ.ย", "ธ.ค"];
    let current_datetime = new Date(date)
    let formatted_date = current_datetime.getDate() + " " + months[current_datetime.getMonth()] + " " + (current_datetime.getFullYear() + 543);
    return formatted_date;
  }

  render() {
    const { announce } = this.props;
    return (
      <Fragment>
        {!announce && (<div>asdasdasdasd</div>)}
        <Row className="m-auto border user-announces">
          <Col xs="12" md="4" className="pl-0 pr-0">
            <div className="image-listing">
              <img src={announce.image[0].image_name} alt="" />
              <Button
                size="sm"
                color="info"
                className="rounded-pill btn-user-announces-image"
              >
                <FaBullhorn className="mr-1" />
                {announce.announcement_type}
              </Button>
            </div>
          </Col>
          <Col xs="12" md="8">
            <Row className="m-auto">
              <Col
                xs="12"
                md="12"
                className="mt-2 border-bottom topic-user-announces"
              >
                <h6>{announce.topic}</h6>
              </Col>
              <Col xs="12" md="6" className="mt-2">
                <h6>{announce.province_name}</h6>
              </Col>
              <Col xs="12" md="6" className="mt-2">
                <h6>{announce.price}</h6>
              </Col>
              <Col xs="12" md="12" className="">
                <p>{this.dateFormat(announce.created_at)}</p>
              </Col>
              <Col xs="12" md="12" className="m-auto">
                <Row className="mb-1 justify-content-end">
                  <Col xs="6" md={{ size: "4", offset: "1" }}>
                    <Link to={`/member/announces/edit/${announce.id}`}>
                      <Button block color="primary" className="rounded-pill">
                        <FaPen className="mr-1" />
                        แก้ไข
                      </Button>
                    </Link>
                  </Col>
                  <Col xs="6" md={{ size: "3" }}>
                    <Button
                      block
                      color="danger"
                      className="rounded-pill"
                      onClick={() => this.props.confirmDelete(announce.id)}
                    >
                      <FaTrashAlt className="mr-1" />
                      ลบ
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <br />
      </Fragment>
    );
  }
}
export default TabOnline;
