import React, { Fragment } from "react";
import "./AnnouncesList.css";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";

import { MdHome, MdSettingsOverscan } from "react-icons/md";
import {
  FaBed,
  FaBath,
  FaBuilding,
  FaMapMarkerAlt,
  FaEdit,
  FaHome,
} from "react-icons/fa";
import { TiHeartFullOutline } from "react-icons/ti";
import moment from "moment";

class AnnouncesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mark: this.props.mark,
    };
  }

  handleBookMark = async (id) => {
    await this.setState((prevState) => {
      const mark = this.state.mark;
      mark ? this.props.deleteBookMark(id) : this.props.addBookMark(id);
      return {
        ...prevState,
        mark: !this.state.mark,
      };
    });
  };

  ItemStyle = () => {
    const result = this.state.mark;
    return result ? "heart-mark" : "heart";
  };

  StyleType = (type) => {
    return type === "เช่า"
      ? "mt-2 rounded-pill border-0 type1"
      : "mt-2 rounded-pill border-0 type2";
  };

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

  render() {
    const { announce } = this.props;
    return (
      <Fragment>
        {/* <Link to={`/announce/${announce.id}`}></Link> */}
        <Col sm="4" md="3" xs="6" className="mb-3">
          <Link
            className="announces-link"
            to={`/announce/${announce.id}/${this.props.mark}`}
          >
            <div className="announces-list ">
              <Card style={{ borderRadius: "10px" }}>
                <div className="img-box">
                  <CardImg
                    top
                    width="100%"
                    src={announce.image[0].image_name}
                    alt="Card image cap"
                  />
                </div>
                <div className="price">
                  <span>{announce.price} ฿</span>
                </div>
                <CardBody>
                  <CardTitle>
                    <h6 style={{ color: "rgb(23,162,184)" }}>
                      {announce.topic}
                    </h6>
                  </CardTitle>
                  <CardSubtitle>
                    <div className="location announce-details">
                      <FaMapMarkerAlt
                        className="mr-1"
                        style={{ color: "#D74B3F" }}
                      />
                      &nbsp;
                      {announce.province_name === "กรุงเทพมหานคร"
                        ? "กทม"
                        : announce.province_name}{" "}
                      &nbsp;{announce.amphoe_name}
                    </div>
                    <Row>
                      <Col
                        xs={{ size: 5, offset: 1 }}
                        className="announce-details details-left"
                      >
                        <MdHome className="" style={{ color: "#138799" }} />
                        &nbsp;{announce.floor}&nbsp;ชั้น
                      </Col>
                      <Col xs="6" className="announce-details">
                        <FaBed className="mr-1" style={{ color: "#138799" }} />
                        &nbsp;
                        {announce.bedroom}&nbsp;ห้องนอน
                      </Col>
                      <Col
                        xs={{ size: 5, offset: 1 }}
                        className="announce-details details-left"
                      >
                        <FaBath className="" style={{ color: "#138799" }} />
                        &nbsp;
                        {announce.toilet}&nbsp;ห้องน้ำ
                      </Col>
                      <Col xs="6" className="announce-details">
                        <MdSettingsOverscan
                          className="mr-2"
                          style={{ color: "#138799" }}
                        />
                        {Math.round(announce.area * 100) / 100}&nbsp;
                        {announce.property_type === "บ้าน" ? "ตร.ว." : "ตร.ม."}
                      </Col>
                      <Col xs="12">
                        <div className="time announce-details mt-1">
                          <span className="created_at">
                            <FaEdit
                              className="mr-1"
                              // style={{ color: "#138799" }}
                            />
                            <small className="text-muted">
                              {this.dateFormat(announce.created_at)}
                            </small>
                          </span>
                        </div>
                      </Col>
                    </Row>
                  </CardSubtitle>
                </CardBody>
              </Card>
            </div>
          </Link>

          <div className="announcement-type">
            <Button
              color="primary"
              className={this.StyleType(announce.announcement_type)}
            >
              {announce.property_type === "บ้าน" ? (
                <FaHome className="mr-1 pb-1" size="20" />
              ) : (
                <FaBuilding className="mr-1 pb-1" size="20" />
              )}
              <span>{announce.announcement_type}</span>
            </Button>
          </div>
          <div className="icon-heart">
            <TiHeartFullOutline
              className={this.ItemStyle()}
              style={{ width: "35px", height: "35px" }}
              onClick={() => {
                this.handleBookMark(announce.id);
              }}
            />
          </div>
        </Col>
      </Fragment>
    );
  }
}

export default AnnouncesList;
