import React, { Fragment } from "react";
import "./Inbox.css";
import { CustomInput, Button } from "reactstrap";
import { FaRegStar, FaTrashAlt } from "react-icons/fa";

class Inbox extends React.Component {
  render() {
    const { mail } = this.props;
    return (
      <table className="mail-list">
        <tbody>
          {mail.data.map((detail, i) => (
            <tr
              key={i}
              className="mail"
              onClick={() =>
                (window.location.href = `/member/message/${detail.id}`)
              }
            >
              {/* <tr className={
              this.state.activeTab === 1
                ? "mail"
                : "mail"
            }
              onClick={() =>
                (window.location.href = `/member/message/${detail.id}`)
              }
            ></tr> */}
              <td className="pl-2">{detail.email}</td>
              <td className="pl-2">{detail.message}</td>
              <td className="pl-2">{detail.created_at}</td>
              <td className="d-flex justify-content-end pr-2">
                <FaRegStar size="20" className="mt-1 star rounded-circle" />
                <Button
                  color="danger"
                  className="rounded-pill ml-2"
                  size="sm"
                  // onClick={() => this.props.confirmDelete(announce.id)}
                >
                  <FaTrashAlt className="mr-1" />
                  ลบ
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Inbox;
