import React, { Fragment } from "react";
import { Container, Row, Col, Button, FormGroup, Input, FormFeedback } from "reactstrap";
import ImageGallery from "react-image-gallery";
import "./Announce.css";
// import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import {
  MdHome,
  MdSettingsOverscan,
  MdLocationOn,
  MdEmail
} from "react-icons/md";
import {
  FaBed,
  FaBath,
  FaBullhorn,
  FaLine,
  FaPhone,
  FaBitcoin
} from "react-icons/fa";
// import { TiHeartFullOutline } from "react-icons/ti";
import ImageProfile from "../ImageProfile/ImageProfile";

class Announce extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPhone: false,
      showLine: false,
      showEmail: false
    };

    this.ShowPhone = this.ShowPhone.bind(this);
    this.ShowLine = this.ShowLine.bind(this);
    this.ShowEmail = this.ShowEmail.bind(this);
  }

  replaceHTMLWithLineBreaks = detail => {
    return detail.replace(/\n/g, "<br />");
  };

  ShowPhone() {
    this.setState({
      showPhone: !this.state.showPhone
    });
  }

  ShowLine() {
    this.setState({
      showLine: !this.state.showLine
    });
  }

  ShowEmail() {
    this.setState({
      showEmail: !this.state.showEmail
    });
  }

  render() {
    const { announce, changeHandler, invalid, value } = this.props;
    const { showPhone, showEmail, showLine } = this.state;
    const images = announce.image.map(image => ({
      original: image.image_name,
      thumbnail: image.image_name
    }));
    // const images = [
    //   {
    //     original:
    //       "https://www.livinginsider.com/upload/topic283/5df0ed9ad10b3_5316.jpg",
    //     thumbnail:
    //       "https://www.livinginsider.com/upload/topic283/5df0ed9ad10b3_5316.jpg"
    //   },
    //   {
    //     original: "https://picsum.photos/id/1018/1000/600/",
    //     thumbnail: "https://picsum.photos/id/1018/250/150/"
    //   },
    //   {
    //     original: "https://picsum.photos/id/1015/1000/600/",
    //     thumbnail: "https://picsum.photos/id/1015/250/150/"
    //   },
    //   {
    //     original: "https://picsum.photos/id/1019/1000/600/",
    //     thumbnail: "https://picsum.photos/id/1019/250/150/"
    //   }
    // ];

    return (
      <Container className="mt-3">
        <Row className="mt-4">
          <Col xs="12">
            <Container className="">
              <Row>
                <Col md="12" className="border-radius mb-3 col-topic">
                  <div className="topic p-3 border-radius">
                    <h5 style={{ display: "inline", color: "#17A2BB" }}>
                      <FaBullhorn
                        className="mr-3 ml-3"
                        style={{ color: "#17A2BB" }}
                      />
                      {announce.topic}
                    </h5>
                  </div>
                </Col>
                <Col md="12"></Col>
              </Row>
            </Container>
          </Col>
          <Col md="8" xs="12" className="">
            <Container className="border border-radius pt-3 pb-3 ">
              <ImageGallery
                showPlayButton={false}
                showFullscreenButton={true}
                // autoPlay={true}
                items={images}
              />
            </Container>
          </Col>
          <Col md="4" xs="12">
            <Container className="">
              <Row>
                <Col xs="12" className="border border-radius detail-icon mt-3">
                  <h4 className="border-bottom text-center h3-detail">
                    <span>ข้อมูลบ้าน</span>
                  </h4>
                  <h4
                    className="border-bottom pb-2 text-center"
                    style={{ color: "#28A745" }}
                  >
                    {announce.price} บาท
                  </h4>
                  <h5 className="border-bottom pb-2">
                    <FaBullhorn
                      className="mr-3 ml-3"
                      style={{ color: "#138799" }}
                    />
                    {announce.announcement_type}
                  </h5>

                  <h5 className="border-bottom pb-2">
                    <MdHome
                      className="mr-3 ml-3"
                      style={{ color: "#138799" }}
                    />
                    {announce.floor} ชั้น
                  </h5>

                  <h5 className="border-bottom pb-2">
                    <FaBed className="mr-3 ml-3" style={{ color: "#138799" }} />
                    {announce.bedroom} ห้องนอน
                  </h5>

                  <h5 className="border-bottom pb-2">
                    <FaBath
                      className="mr-3 ml-3"
                      style={{ color: "#138799" }}
                    />
                    {announce.toilet} ห้องน้ำ
                  </h5>

                  <h5 className="border-bottom pb-2">
                    <MdSettingsOverscan
                      className="mr-3 ml-3"
                      style={{ color: "#138799" }}
                    />
                    {announce.area} ตรว
                  </h5>

                  <h5
                    className="border-bottom pb-2"
                    style={{ display: "inline" }}
                  >
                    <MdLocationOn
                      className="mr-3 ml-3"
                      style={{ color: "#FF0000", display: "inline" }}
                    />
                  </h5>
                  <h6 style={{ display: "inline" }}>
                    {announce.province_name} {announce.amphoe_name}
                  </h6>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col md="8" xs="12">
            <Row>
              <Container className="border border-radius pt-3 pb-3 mt-3">
                <Col xs="12">
                  <h4 style={{ color: "#17A2BB" }}>รายละเอียด</h4>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: this.replaceHTMLWithLineBreaks(announce.detail)
                    }}
                  ></div>
                </Col>
                <Col md={{ size: "4", offset: "4" }} xs="12" className="mt-3">
                  <Button block className="rounded-pill mt-3" color="danger">
                    แจ้งประกาศไม่เหมาะสม
                  </Button>
                </Col>
              </Container>
            </Row>
          </Col>

          <Col md="4" xs="12">
            <Row>
              <Col xs="12" className="mt-3">
                <Container className="border border-radius">
                  <Row>
                    <Col md="12" className="mt-3 text-center">
                      <h4 style={{ color: "#17A2B8" }}> ข้อมูลผู้ประกาศ</h4>
                      <ImageProfile user={announce.user} />
                    </Col>
                    <Col md="12" className="mb-2">
                      <Button
                        block
                        color="info"
                        className="rounded-pill"
                        onClick={this.ShowPhone}
                      >
                        <FaPhone
                          style={{
                            width: "15px",
                            height: "15px",
                            marginRight: "5px"
                          }}
                        />
                        {showPhone ? (
                          <Fragment>{announce.user.phone}</Fragment>
                        ) : (
                            <Fragment>ดูเบอร์โทร</Fragment>
                          )}
                      </Button>
                    </Col>
                    <Col md="12" className="mb-2">
                      <Button
                        block
                        // outline
                        color="info"
                        className="rounded-pill"
                        onClick={this.ShowEmail}
                      >
                        <MdEmail
                          style={{
                            width: "15px",
                            height: "15px",
                            marginRight: "5px"
                          }}
                        />
                        {showEmail ? (
                          <Fragment>{announce.user.email}</Fragment>
                        ) : (
                            <Fragment>ดูอีเมล์</Fragment>
                          )}
                      </Button>
                    </Col>

                    <Col md="12" className="mb-2">
                      <Button
                        block
                        color="success"
                        className="rounded-pill"
                        onClick={this.ShowLine}
                      >
                        <FaLine
                          style={{
                            width: "15px",
                            height: "15px",
                            marginRight: "5px"
                          }}
                        />
                        {showLine ? (
                          <Fragment>{announce.user.line}</Fragment>
                        ) : (
                            <Fragment>ดูไลน์</Fragment>
                          )}
                      </Button>
                    </Col>
                  </Row>
                </Container>
                <Container className="mt-3 border border-radius text-center">
                  <FormGroup className="mt-3">
                    <h4 style={{ color: "#17A2B8" }}>ติดต่อเจ้าของประกาศ</h4>
                  </FormGroup>
                  <FormGroup>
                    {/* <Label for="Email">ชื่อผู้ใช้ / อีเมล</Label> */}
                    <Input
                      className="rounded-pill"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="ชื่อ-นามสกุล"
                      onChange={changeHandler}
                      value={value.name}
                      invalid={invalid.invalidName}
                    />
                    <FormFeedback className="text-center">
                      กรุณากรอก นามสกุล *
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    {/* <Label for="Email">ชื่อผู้ใช้ / อีเมล</Label> */}
                    <Input
                      className="rounded-pill"
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="เบอร์โทร 10 ตัวอักษร"
                      onChange={changeHandler}
                      value={value.phone}
                      invalid={invalid.invalidPhone}
                    />
                    <FormFeedback className="text-center">
                      กรุณากรอกเบอรฺ์โทรให้ครบ 10 ตัวอักษร
                  </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    {/* <Label for="Email">ชื่อผู้ใช้ / อีเมล</Label> */}
                    <Input
                      className="rounded-pill"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="อีเมล"
                      onChange={changeHandler}
                      value={value.email}
                      invalid={invalid.invalidEmail}
                    />
                    <FormFeedback className="text-center">
                      กรุณากรอก อีเมลให้ถูกต้อง
                  </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Input
                      className="rounded-pill"
                      type="textarea"
                      name="message"
                      id="message"
                      placeholder="ฝากข้อความถึงเจ้าของประกาศ"
                      onChange={changeHandler}
                      value={value.message}
                      invalid={invalid.invalidMessage}
                    />
                    <FormFeedback className="text-center">
                      กรุณากรอก ข้อความ
                  </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Button
                      block
                      className="rounded-pill"
                      color="info"
                      onClick={this.props.submit}
                    >
                      ส่งข้อความ
                    </Button>
                  </FormGroup>
                </Container>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Announce;
