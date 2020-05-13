import React from "react";
import "./BottomNavigation.css";
import {
  FaBullhorn,
  FaUser,
  FaRegEnvelope,
  FaTachometerAlt
} from "react-icons/fa";
import { TiHeartFullOutline } from "react-icons/ti";
import {} from 'reactstrap';
class BottomNavigation extends React.Component {
  render() {
    return (
      <div className="d-block d-sm-none fixed-bottom">
        <div className="navigation-menu">
          <nav>
            <ul>
              <li className="border-white">
                <a href="#"></a>
                <h5>
                  <FaTachometerAlt />
                </h5>
                <p>แดชบอร์ด</p>
              </li>
              <li className="border-white">
                <a href="#"></a>
                <h5>
                  <FaUser />
                </h5>
                <p>ฉัน</p>
              </li>
              <li className="border-white">
                <a href="#"></a>
                <h5>
                  <FaBullhorn />
                </h5>
                <p>ประกาศของฉัน</p>
              </li>
              <li className="border-white">
                <a href="#"></a>
                <h5>
                  <TiHeartFullOutline className="" />
                </h5>
                <p>ถูกใจ</p>
              </li>
              <li className="">
                <a href="#"></a>
                <h5>
                  <FaRegEnvelope />
                </h5>
                <p>ข้อความ</p>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
export default BottomNavigation;
