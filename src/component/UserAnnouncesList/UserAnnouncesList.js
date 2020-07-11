import React, { Fragment } from "react";
import "./UserAnnouncesList.css";
import SearchUserAnnounces from "./SearchUserAnnounces/SearchUserAnnounces";
import { Container, Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import TabOnline from "./Tabs/TabOnline";
import ReactPaginate from "react-paginate";
import NoData from "./NoData/NoData";
import {
  FaPlusCircle,
  FaTrashAlt,
  FaTimes,
  FaGlobeAmericas,
  FaFileAlt,
  FaEdit,
} from "react-icons/fa";
import { Link, withRouter } from "react-router-dom";
class UserAnnouncesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.tab,
      confirmDelete: false,
      announcesID: "",
    };
  }

  handleAnnounces = (announces) => {
    return announces.data.length !== 0 ? (
      <Fragment>
        {announces.data.map((announce) => (
          <TabOnline
            key={announce.id}
            announce={announce}
            confirmDelete={this.confirmDelete}
          />
        ))}
        {announces.last_page > 1 && (
          <ReactPaginate
            previousLabel={"ย้อนกลับ"}
            nextLabel={"ถัดไป"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={announces.last_page}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            forcePage={this.props.match.params.page - 1}
            onPageChange={(data) => this.props.getData(data.selected + 1)}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        )}
      </Fragment>
    ) : (
      <NoData />
    );
  };

  confirmDelete = (id) => {
    this.setState({
      ...this.state,
      confirmDelete: !this.state.confirmDelete,
      announcesID: id,
    });
  };

  handleDelete = () => {
    this.props.delete(this.state.announcesID);
  };

  render() {
    const { announces, count, match } = this.props;
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
                  href="/member/announces/online"
                  className="d-flex justify-content-center"
                >
                  <FaGlobeAmericas style={{ marginTop: "12px" }} />
                  <span className="ml-1 d-none d-sm-block d-md-block ">
                    ออนไลน์
                  </span>
                  ({count.online})
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
                  href="/member/announces/draft"
                  className="d-flex justify-content-center"
                >
                  <FaFileAlt style={{ marginTop: "12px" }} />
                  <span className="ml-1 d-none d-md-block d-sm-block">
                    แบบร่าง
                  </span>
                  ({count.draft})
                </a>
              </li>
              <li
                className={
                  this.state.activeTab === 3
                    ? "active border border-bottom-0 mr-1"
                    : "border border-bottom-0 mr-1"
                }
              >
                <a
                  href="/member/announces/correct"
                  className="d-flex justify-content-center"
                >
                  <FaEdit style={{ marginTop: "12px" }}/>
                  <span className="ml-1 d-none d-md-block d-sm-block">
                    รอแก้ไข
                  </span>
                  ({count.correct})
                </a>
              </li>
              <Link to="/member/announces/post">
                <div className="m-auto">
                  <Button color="success" className="rounded-pill">
                    <span className="ml-1 d-none d-sm-block ">
                      <FaPlusCircle className="mr-1" />
                      เพิ่มประกาศ
                    </span>
                    <span className="d-block d-sm-none">
                      <FaPlusCircle />
                    </span>
                  </Button>
                </div>
              </Link>
            </ul>
          </nav>
          <Container className="pt-3 pb-3 border table-user-announces">
            <SearchUserAnnounces match={match} status={this.state.activeTab} />
            {this.handleAnnounces(announces)}
          </Container>
        </div>

        <Modal isOpen={this.state.confirmDelete}>
          <ModalBody className="text-center confirm-delete">
            <h1>
              <FaTimes className="mt-3 mb-3" />
            </h1>
            <h3>รายการนี้จะถูกลบทันทีและกู้คืนไม่ได้</h3>
            <h3>คุณต้องการลบใช่หรือไม่?</h3>
          </ModalBody>
          <ModalFooter className="border-0">
            <Button
              color="secondary"
              onClick={this.confirmDelete}
              className="rounded-pill m-auto"
            >
              <FaTimes className="mr-2" />
              ยกเลิก
            </Button>
            <Button
              color="danger"
              className="rounded-pill m-auto"
              onClick={this.handleDelete}
            >
              <FaTrashAlt className="mr-2" />
              ตกลง
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}
export default withRouter(UserAnnouncesList);
