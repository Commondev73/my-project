import React, { Fragment } from "react";
import "./TabOnline.css";
import { Row, Col, Button } from "reactstrap";
import {
  FaTrashAlt,
  FaGlobeAmericas,
  FaFileAlt,
  FaBuilding,
  FaEdit,
  FaHome,
  FaPen,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import moment from "moment";

class TabOnline extends React.Component {
  dateFormat = (date) => {
    let result;
    const nowDate = new Date()
    const endDate = moment(nowDate).format('YYYY/MM/DD HH:mm:ss');
    const startDate = moment(date).format('YYYY/MM/DD HH:mm:ss');
    let diffTime = moment(endDate).diff(moment(startDate), 'milliseconds'); // milliseconds
    
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // in days

    const hourDiff = Math.ceil(diffTime / (1000 * 60 * 60)); // in hours

    const mindiff = Math.ceil(diffTime / (1000 * 60)); // in minutes

    // let date = (new Date(date)).toISOString().split('T')[0];
    if (mindiff > 2880) result = moment(date).format('YYYY-MM-DD');

    if (mindiff > 1440 && mindiff < 2880) result = `เมื่อวานนี้`;

    if (mindiff > 60 && mindiff < 1440) result = `${hourDiff} ชั่วโมงที่แล้ว`;

    if (mindiff < 60) result = `${mindiff} นาทีที่แล้ว`;

    return result;
  };

  StyleType = (type) => {
    return type === "เช่า"
      ? "rounded-pill btn-user-announces-image border-0 type1"
      : "rounded-pill btn-user-announces-image border-0 type2";
  };

  render() {
    const { announce } = this.props;
    return (
      <Fragment>
        <Row className="m-auto border user-announces">
          <Col xs="12" md="4" className="pl-0 pr-0">
            <div className="image-listing">
              <img src={announce.image[0].image_name} alt="" />
              <Button
                size="sm"
                color="info"
                className={this.StyleType(announce.announcement_type)}
              >
                {announce.property_type === "บ้าน" ? (
                  <FaHome className="mr-1 pb-1" size="20" />
                ) : (
                  <FaBuilding className="mr-1 pb-1" size="20" />
                )}
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
              <Col xs="6" md="6" className="mt-2">
                <h6>{announce.province_name}</h6>
              </Col>
              <Col xs="6" md="6" className="mt-2">
                <h6 style={{ color: "#00B46B" }}>{announce.price}</h6>
              </Col>
              <Col xs="6" md="6" className="mt-2">
                <p
                  className={
                    announce.status === 1
                      ? "user-announces-online"
                      : "user-announces-draft"
                  }
                >
                  {announce.status === 1 ? (
                    <FaGlobeAmericas className="mr-1 pb-1" />
                  ) : (
                    <FaFileAlt className="mr-1 pb-1" />
                  )}
                  {announce.status === 1 ? "ออนไลน์" : "แบบร่าง"}{" "}
                </p>
              </Col>
              <Col xs="6" md="6" className="mt-2">
                <p style={{ color: "gray" }} className="d-flex">
                  <FaEdit
                    className="d-none d-md-block d-sm-block"
                    style={{ marginTop: "4px", marginRight: "5px" }}
                  />
                  {this.dateFormat(announce.created_at)}
                </p>
              </Col>
              <Col xs="12" md="12" className="m-auto">
                <Row className="mb-1 justify-content-end">
                  <Col xs="6" md={{ size: "4", offset: "1" }}>
                    <Link to={`/member/announces/edit/${announce.id}`}>
                      <Button block color="info" className="rounded-pill">
                        <FaPen className="mr-1 pb-1" size="20" />
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
