import React from "react";
import "./BottomNavigation.css";
import {
  FcTemplate,
  FcBusinessman,
  FcLike,
  FcViewDetails,
  FcFeedback,
} from "react-icons/fc";
class BottomNavigation extends React.Component {
  render() {
    const { count } = this.props;
    console.log('count',count)
    return (
      <div className="d-block d-sm-none fixed-bottom">
        <div className="navigation-menu">
          <nav>
            <ul>
              <li className="border-white">
                <a href="/profile">
                  <h3>
                    <FcBusinessman />
                  </h3>
                  <p>ฉัน</p>
                </a>
              </li>
              <li className="border-white">
                <a href="/member/announces/online">
                  <h3>
                    <FcViewDetails />
                  </h3>
                  <p>ประกาศของฉัน</p>
                </a>
              </li>
              <li className="border-white">
                <a href="/member/bookmarks">
                  <h3>
                    <FcLike />
                  </h3>
                  <p>รายการโปรด</p>
                </a>
              </li>
              <li className="">
                <a href="/member/mail">
                  <div className="icon-mail-mobile">
                    {count.unread !== 0 && (
                      <div className="mail-notify-mobile">{count.unread}</div>
                    )}
                    <h3>
                      <FcFeedback />
                    </h3>
                    <p>จดหมาย</p>
                  </div>
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
