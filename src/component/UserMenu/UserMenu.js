import React from "react";
import "./UserMenu.css";
import ImageProfile from "../ImageProfile/ImageProfile";
import { Container } from "reactstrap";
import {
  FaBullhorn,
  FaUser,
  FaRegEnvelope,
  FaTachometerAlt,
} from "react-icons/fa";
import { TiHeartFullOutline } from "react-icons/ti";

class UserMenu extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div className="d-none d-sm-block set-top">
        <div className="usermenu">
          <Container>
            <ul>
              <li className="icon">
                {/* <a href="#"></a> */}
                <ImageProfile user={user} />
              </li>
              <li className="icon">
                <a href="/member">
                  <h2>
                    <FaTachometerAlt />
                  </h2>
                  <p>แดชบอร์ด</p>
                </a>
              </li>
              <li className="icon">
                <a href="/profile">
                  <h2>
                    <FaUser />
                  </h2>
                  <p>โปรไฟล์</p>
                </a>
              </li>
              <li className="icon">
                <a href="/member/announces">
                  <h2>
                    <FaBullhorn />
                  </h2>
                  <p>ประกาศของฉัน</p>
                </a>
              </li>
              <li className="icon">
                <a href="#">
                  <h2>
                    <TiHeartFullOutline className="heart" />
                  </h2>
                  <p>รายการโปรด</p>
                </a>
              </li>
              <li className="icon">
                <a href="/member/mail">
                  <h2>
                    <FaRegEnvelope />
                  </h2>
                  <p>ข้อความ</p>
                </a>
              </li>
            </ul>
          </Container>
        </div>
      </div>
    );
  }
}
export default UserMenu;
