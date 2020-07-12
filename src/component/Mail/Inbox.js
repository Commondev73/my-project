import React, { Fragment } from "react";
import "./Inbox.css";
import { Modal, Button, ModalBody, ModalFooter } from "reactstrap";
import { FaRegStar, FaRegEnvelope, FaTrashAlt, FaTimes } from "react-icons/fa";
import _ from "lodash";
class Inbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDelete: false,
      selectedItem: this.handleDataMailSave(this.props.mail.data),
      id: "",
    };
  }

  handleDataMailSave = (data) => {
    const result = data.map((data) => {
      return data.reading_status === 2
        ? { id: data.id, value: true }
        : { id: data.id, value: false };
    });
    return result;
  };

  ItemStyle = (id) => {
    const isItemSelected = this.state.selectedItem
      .filter((data) => data.id === id)
      .map((ele) => ele.value);
    // console.log("test", isItemSelected);
    // console.log("state", this.state.selectedItem);
    return isItemSelected[0]
      ? "mt-1 star-2 rounded-circle"
      : "mt-1 star rounded-circle";
  };

  handleClick = (e, id) => {
    e.preventDefault();
    return (window.location.href = `/member/message/${id}`);
  };

  confirmDelete = (id) => {
    this.setState({
      ...this.state,
      confirmDelete: !this.state.confirmDelete,
      id: id,
    });
  };

  handleSave = async (idMail) => {
    await this.setState((prevState) => {
      const isItemSelected = this.state.selectedItem;
      let index = isItemSelected.findIndex((obj) => obj.id === idMail);
      let check = isItemSelected[index].value === true;
      check
        ? (isItemSelected[index].value = false)
        : (isItemSelected[index].value = true);
      check ? this.props.read(idMail) : this.props.save(idMail);
      return {
        ...prevState,
        isItemSelected,
      };
    });
  };

  handleUnread = async (idMail) => {
    await this.setState((prevState) => {
      const isItemSelected = this.state.selectedItem;
      let index = isItemSelected.findIndex((obj) => obj.id === idMail);
      let check = isItemSelected[index].value === true;
      check
        ? (isItemSelected[index].value = false)
        : (isItemSelected[index].value = false);
      this.props.unread(idMail);
      return {
        ...prevState,
        isItemSelected,
      };
    });
  };

  handleDelete = () => {
    this.props.deleteMail(this.state.id);
  };

  dateFormat = (date) => {
    let result;
    const endDate = new Date();
    const startDate = new Date(date.replace(/-/g, '/'));
    let diffTime = endDate - startDate; // milliseconds

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // in days

    const hourDiff = Math.ceil(diffTime / (1000 * 60 * 60)); // in hours

    const mindiff = Math.ceil(diffTime / (1000 * 60)); // in minutes

    // let date = (new Date(date)).toISOString().split('T')[0];
    if (mindiff > 2880) result = new Date(date).toISOString().split("T")[0];

    if (mindiff > 1440 && mindiff < 2880) result = `เมื่อวานนี้`;

    if (mindiff > 60 && mindiff < 1440) result = `${hourDiff} ชั่วโมงที่แล้ว`;

    if (mindiff < 60) result = `${mindiff} นาทีที่แล้ว`;

    return result;
  };

  render() {
    const { mail } = this.props;
    return (
      <Fragment>
        <table className="mail-list mt-2 mb-4">
          <tbody>
            {mail.data.map((detail, i) => (
              <tr
                className={
                  detail.reading_status === 1 ? "mail mail-read" : "mail"
                }
                key={i}
              >
                <td
                  className="pl-2 fix columnA"
                  onClick={(e) => {
                    this.handleClick(e, detail.id);
                  }}
                >
                  {detail.email}
                </td>
                <td
                  className="pl-2 fix columnB"
                  onClick={(e) => {
                    this.handleClick(e, detail.id);
                  }}
                >
                  {detail.message}
                </td>
                <td
                  className="pl-2 fix columnC"
                  onClick={(e) => {
                    this.handleClick(e, detail.id);
                  }}
                >
                  {this.dateFormat(detail.created_at)}
                </td>
                <td className="pr-2 columnD">
                  <FaRegStar
                    size="20"
                    className={this.ItemStyle(detail.id)}
                    onClick={() => this.handleSave(detail.id)}
                  />
                  <Button
                    color="primary"
                    className="rounded-pill ml-2"
                    size="sm"
                    onClick={() => this.handleUnread(detail.id)}
                  >
                    <FaRegEnvelope className="mr-1" />
                    ยังไม่ได้อ่าน
                  </Button>
                  <Button
                    color="danger"
                    className="rounded-pill ml-2"
                    size="sm"
                    onClick={() => this.confirmDelete(detail.id)}
                  >
                    <FaTrashAlt className="mr-1" />
                    ลบ
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
      </Fragment>
    );
  }
}

export default Inbox;
