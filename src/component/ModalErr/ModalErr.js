import React from "react";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import { FaRegTimesCircle } from "react-icons/fa";

class ModalErr extends React.Component {
  render() {
    return (
      <Modal isOpen={true} className="modal-dialog-centered">
        <ModalBody className="text-center">
          <FaRegTimesCircle style={{ color: "red" }} size={32} />
          <h4>เกิดข้อผิดพลาด กรุณาทำรายการใหม่</h4>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success m-auto"
            onClick={() => window.location.reload()}
            className="rounded-pill"
          >
            ตกลง
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalErr;
