import React from "react";
import "./BottomNavigation.css";
import { FcTemplate , FcBusinessman ,FcLike ,FcViewDetails ,FcInvite } from "react-icons/fc";
class BottomNavigation extends React.Component {
  render() {
    return (
      <div className="d-block d-sm-none fixed-bottom">
        <div className="navigation-menu">
          <nav>
            <ul>
              <li className="border-white">
                <a href="/profile">
                  <h5>
                    <FcBusinessman />
                  </h5>
                  <p>ฉัน</p>
                </a>
              </li>
              <li className="border-white">
                <a href="/member/announces/online">
                  <h5>
                    <FcViewDetails />
                  </h5>
                  <p>ประกาศของฉัน</p>
                </a>
              </li>
              <li className="border-white">
                <a href="/member/bookmarks">
                  <h5>
                    <FcLike />
                  </h5>
                  <p>ถูกใจ</p>
                </a>
              </li>
              <li className="">
                <a href="/member/mail">
                  <h5>
                    <FcInvite />
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
