import React, { Fragment } from "react";
import "./UserAnnouncesList.css";
import SearchUserAnnounces from "./SearchUserAnnounces/SearchUserAnnounces";
import { Container, Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import TabOnline from "./Tabs/TabOnline";
import ReactPaginate from "react-paginate";
import NoData from "./NoData/NoData";
import { FaPlusCircle, FaTrashAlt, FaTimes } from "react-icons/fa";
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
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={announces.last_page}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(data) =>
              this.props.getDataAnnounces(data.selected + 1)
            }
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
    const { announces, count } = this.props;
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
                <Link to="/member/announces">ออนไลน์ ({count.online})</Link>
              </li>
              <li
                className={
                  this.state.activeTab === 2
                    ? "active border border-bottom-0"
                    : "border border-bottom-0"
                }
              >
                <Link to="/member/announces/draft">
                  แบบร่าง ({count.draft})
                </Link>
              </li>
              <li
                className={
                  this.state.activeTab === 3
                    ? "active border border-bottom-0 mr-1"
                    : "border border-bottom-0 mr-1"
                }
              >
                <Link to="/member/announces/correct">
                  รอแก้ไข ({count.correct})
                </Link>
              </li>
              <Link to="/member/announces/post">
                <div className="m-auto">
                  <Button color="success" className="rounded-pill">
                    <FaPlusCircle className="mr-1" />
                    เพิ่มประกาศ
                  </Button>
                </div>
              </Link>
            </ul>
          </nav>
          <Container className="pt-3 pb-3 border table-user-announces">
            <SearchUserAnnounces />
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
