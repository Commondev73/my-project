import React, { Fragment } from "react";
import { Col, Row, Button, Alert } from "reactstrap";
import {
  FaUserCircle,
  FaRegStar,
  FaTrashAlt,
  FaRegEnvelope,
} from "react-icons/fa";
import moment from "moment";

class MailDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: this.props.message.reading_status === 2 ? true : false,
    };
  }

  handleSave = () => {
    const selected = this.state.selectedItem;
    this.setState({
      selectedItem: !selected,
    });
    selected ? this.props.read(1) : this.props.Save();
  };

  handleUnread = () => {
    this.setState({
      selectedItem: false,
    });
    this.props.Unread();
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
    const { message, deleteMail } = this.props;
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
                    this.state.selectedItem
                      ? "mt-1 star-2 rounded-circle"
                      : "mt-1 star rounded-circle"
                  }
                  onClick={() => this.handleSave()}
                />
                <Button
                  color="primary"
                  className="rounded-pill ml-2"
                  size="sm"
                  onClick={() => this.handleUnread()}
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
            <p>{this.dateFormat(message.created_at)}</p>
          </Col>
          <Col className="mt-3">{message.message}</Col>
        </Row>
      </Fragment>
    );
  }
}
export default MailDetail;
