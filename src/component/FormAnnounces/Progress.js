import React from "react";
import "./Progress.css";
import { Container } from "reactstrap";

class Progress extends React.Component {
  render() {
    return (
      <Container>
        <div className="">
          <ul className="progressbar">
            <li className={ (this.props.step >= 1 ? "active":"")}>หัวข้อ</li>
            <li className={ (this.props.step >= 2 ? "active":"")}>รายละเอียด</li>
            <li className={ (this.props.step >= 3 ? "active":"")}>ยืนยัน</li>
          </ul>
        </div>
      </Container>
    );
  }
}

export default Progress;