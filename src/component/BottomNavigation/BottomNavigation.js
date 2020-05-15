import React from "react";
import "./BottomNavigation.css";
import {
  FaBullhorn,
  FaUser,
  FaRegEnvelope,
  FaTachometerAlt,
} from "react-icons/fa";
import { TiHeartFullOutline } from "react-icons/ti";
import {} from "reactstrap";
class BottomNavigation extends React.Component {
  render() {
    return (
      <div className="d-block d-sm-none fixed-bottom">
        <div className="navigation-menu">
          <nav>
            <ul>
              <li className="border-white">
                <a href="/member">
                  <h5>
                    <FaTachometerAlt />
                  </h5>
                  <p>แดชบอร์ด</p>
                </a>
              </li>
              <li className="border-white">
                <a href="/profile">
                  <h5>
                    <FaUser />
                  </h5>
                  <p>ฉัน</p>
                </a>
              </li>
              <li className="border-white">
                <a href="/member/announces">
                  <h5>
                    <FaBullhorn />
                  </h5>
                  <p>ประกาศของฉัน</p>
                </a>
              </li>
              <li className="border-white">
                <a href="/member/announces">
                  <h5>
                    <TiHeartFullOutline className="" />
                  </h5>
                  <p>ถูกใจ</p>
                </a>
              </li>
              <li className="">
                <a href="/member/mail">
                  <h5>
                    <FaRegEnvelope />
                  </h5>
                  <p>ข้อความ</p>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
export default BottomNavigation;
