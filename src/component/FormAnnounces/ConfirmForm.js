import React from "react";
import ImageGallery from "react-image-gallery";
import {
  FaBed,
  FaBath,
  FaBullhorn,
  FaMapMarkerAlt,
  FaHome,
  FaBuilding,
  FaFileAlt,
  FaGlobeAmericas,
  FaArrowCircleLeft,
} from "react-icons/fa";
import { MdHome, MdSettingsOverscan } from "react-icons/md";
import { Container, Row, Col, Input, Button } from "reactstrap";

class ConfirmForm extends React.Component {
  Back = () => {
    this.props.prevStep();
  };

  StyleType = (type) => {
    return type === "เช่า" ? "rounded-pill type1" : "rounded-pill type2";
  };

  replaceHTMLWithLineBreaks = (detail) => {
    return detail.replace(/\n/g, "<br />");
  };

  formatNumber = (number) => {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  render() {
    const { values } = this.props;
    // const detail = values.detail.replace(/\n/g , "<br />")
    const images = values.image.imageData.map((image) => ({
      original: image.data,
      thumbnail: image.data,
    }));

    return (
      <Container>
        <Row>
          <Col md={{ size: "8", offset: "2" }} className="text-center ">
            <h3>ตัวอย่างประกาศของคุณ</h3>
            <h5 style={{ color: "red" }}>
              * กรุณาตรวจสอบรายละเอียดประกาศของคุณ
            </h5>
          </Col>
          <Col xs="12" md="6" className="mb-3">
            <Button className={this.StyleType(values.announceType)}>
              <FaBullhorn /> {values.announceType}
            </Button>
            <Button color="info" className="rounded-pill ml-3">
              {values.propertyType === "บ้าน" ? (
                <FaHome className="mr-1 pb-1" size="20" />
              ) : (
                <FaBuilding className="mr-1 pb-1" size="20" />
              )}
              {values.propertyType.value}
            </Button>
          </Col>
          <Col xs="12" md="6">
            <h3 className="text-right" style={{ color: "#28A745" }}>
              {this.formatNumber(values.price)}
              &nbsp;บาท
            </h3>
          </Col>
          <Col xs="12" className="mt-3">
            <h4>{values.topic}</h4>
          </Col>
          <Col xs="12">
            <h4 className="d-inline">
              <FaMapMarkerAlt className="mr-1" style={{ color: "#D74B3F" }} />
            </h4>
            {values.province.label}&nbsp;{values.amphoe.label}&nbsp;
            {values.district.label}
          </Col>
          <Col xs="12" className="mt-3">
            <h4 className="d-inline">
              <MdSettingsOverscan
                className="mr-1"
                style={{ color: "#138799" }}
              />
            </h4>
            &nbsp;พื้นที่&nbsp;{values.area}&nbsp;
            {values.propertyType.value === "บ้าน" ? "ตร.ว." : "ตร.ม."}
          </Col>
          <Col xs="12" className="mt-3 mb-3">
            <Row>
              <Col xs="12" md="4">
                <h4 className="d-inline">
                  <MdHome className="mr-1" style={{ color: "#138799" }} />
                </h4>
                {values.floor}&nbsp;ชั้น
              </Col>
              <Col xs="12" md="4">
                <h4 className="d-inline">
                  <FaBed className="mr-1" style={{ color: "#138799" }} />
                </h4>
                {values.bedroom}&nbsp;ห้องนอน
              </Col>
              <Col xs="12" md="4">
                <h4 className="d-inline">
                  <FaBath className="mr-1" style={{ color: "#138799" }} />
                </h4>
                {values.toilet}&nbsp;ห้องน้ำ
              </Col>
            </Row>
          </Col>
          <Col xs="12" className="mb-3">
            <h4 className="text-letf" style={{ color: "#28A745" }}>
              รูปภาพ
            </h4>
          </Col>
          <Col xs="12">
            <ImageGallery
              showPlayButton={false}
              showFullscreenButton={true}
              // autoPlay={true}
              items={images}
            />
          </Col>
          <Col xs="12">
            <h4 className="text-left" style={{ color: "#28A745" }}>
              รายละเอียด
            </h4>
          </Col>
          <Col xs="12">
            {
              <div
                dangerouslySetInnerHTML={{
                  __html: this.replaceHTMLWithLineBreaks(values.detail),
                }}
              ></div>
            }
          </Col>
          <Col xs="12">
            <Row className="btn-step mt-3">
              <Col md={{ size: "3" }} sm={{ size: "4" }} className="mb-3">
                <Button
                  block
                  color="danger"
                  className="rounded-pill"
                  onClick={this.Back}
                >
                  <FaArrowCircleLeft className="mr-1 pb-1" size="23" />
                  ย้อนกลับ
                </Button>
              </Col>
              <Col md={{ size: "3" }} sm={{ size: "4" }} className="mb-3">
                <Button
                  block
                  className="rounded-pill"
                  onClick={this.props.draft}
                >
                  <FaFileAlt className="mr-1 pb-1" size="23" />
                  แบบร่าง
                </Button>
              </Col>
              <Col md={{ size: "3" }} sm={{ size: "4" }}>
                <Button
                  block
                  color="success"
                  className="rounded-pill"
                  onClick={this.props.submit}
                >
                  <FaGlobeAmericas className="mr-1 pb-1" size="23" />
                  ยืนยัน
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ConfirmForm;
