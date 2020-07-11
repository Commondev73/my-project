import React, { Fragment } from "react";
import ReactPaginate from "react-paginate";
import "./MailList.css";
import { Row, Col, Container, Input, Button } from "reactstrap";
import Inbox from "./Inbox";
import NoData from "../UserAnnouncesList/NoData/NoData";
import {
  FaMailBulk,
  FaRegEnvelopeOpen,
  FaRegEnvelope,
  FaStar,
  FaSearch,
} from "react-icons/fa";

class MailList extends React.Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      activeTab: this.props.activeTab,
      formInputs: {
        keyword:
          match.params.mkeyword === undefined || match.params.mkeyword === null
            ? "null"
            : match.params.mkeyword,
      },
    };
  }

  handleResult = () => {
    const { formInputs } = this.state;
    return (window.location.href = `/member/search/mail/${formInputs.keyword}/1`);
  };

  changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value.trim();

    this.setState({
      ...this.state,
      formInputs: {
        ...this.state.formInputs,
        [name]: value === "" ? "null" : value,
      },
    });
  };

  mailAll = () => {
    const { count } = this.props;
    const read = Number(count.read);
    const unread = Number(count.unread);
    const save = Number(count.save);
    return read + unread + save;
  };

  render() {
    const { formInputs } = this.state;
    const { mail, count, unread, save, deleteMail, read, match } = this.props;
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
                <a
                  href="/member/mail"
                  className="d-flex justify-content-center"
                >
                  <FaMailBulk style={{ marginTop: "13px" }} />
                  <span className="ml-1 d-none d-md-block d-sm-block">
                    ทั้งหมด
                  </span>
                  ({this.mailAll()})
                </a>
              </li>
              <li
                className={
                  this.state.activeTab === 2
                    ? "active border border-bottom-0"
                    : "border border-bottom-0"
                }
              >
                <a
                  href="/member/read/mail/"
                  className="d-flex justify-content-center"
                >
                  <FaRegEnvelopeOpen style={{ marginTop: "12px" }} />
                  <span className="ml-1 d-none d-md-block d-sm-block">
                    อ่านแล้ว
                  </span>
                  ({count.read})
                </a>
              </li>
              <li
                className={
                  this.state.activeTab === 3
                    ? "active border border-bottom-0"
                    : "border border-bottom-0"
                }
              >
                <a
                  href="/member/unread/mail/1"
                  className="d-flex justify-content-center"
                >
                  <FaRegEnvelope style={{ marginTop:"12px"}} />
                  <span className="ml-1 d-none d-md-block d-sm-block">
                    ไม่ได้อ่าน
                  </span>
                  ({count.unread})
                </a>
              </li>
              <li
                className={
                  this.state.activeTab === 4
                    ? "active border border-bottom-0"
                    : "border border-bottom-0"
                }
              >
                <a
                  href="/member/save/mail/1"
                  className="d-flex justify-content-center"
                >
                  <FaStar color="#E5C04D" style={{ marginTop: "12px" }} />
                  <span className="ml-1 d-none d-md-block d-sm-block">
                    ติดดาว
                  </span>
                  ({count.save})
                </a>
              </li>
            </ul>
          </nav>
          <Container className="pt-3 pb-3 border table-user-announces">
            <Row>
              <Col className="mb-3" md="10">
                <Input
                  className="rounded-pill"
                  type="text"
                  name="keyword"
                  id="keyword"
                  placeholder="ค้นหา"
                  value={
                    formInputs.keyword === "null" ? "" : formInputs.keyword
                  }
                  onChange={this.changeHandler}
                />
              </Col>
              <Col md="2">
                <Button
                  color="info"
                  className="rounded-pill"
                  block
                  onClick={() => this.handleResult()}
                >
                  <FaSearch className="mr-1" />
                  ค้นหา
                </Button>
              </Col>
            </Row>
            <Inbox
              read={read}
              mail={mail}
              save={save}
              unread={unread}
              deleteMail={deleteMail}
            />
            {mail.data.length === 0 && <NoData />}

            {mail.last_page > 1 && (
              <Col xs="12">
                <ReactPaginate
                  previousLabel={"ย้อนกลับ"}
                  nextLabel={"ถัดไป"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={mail.last_page}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  forcePage={this.props.match.params.page - 1}
                  onPageChange={(data) => this.props.getData(data.selected + 1)}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              </Col>
            )}
          </Container>
        </div>
      </Container>
    );
  }
}

export default MailList;
