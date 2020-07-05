import React from "react";
import "./UserMenu.css";
import ImageProfile from "../ImageProfile/ImageProfile";
import { Container } from "reactstrap";
import { FcBusinessman ,FcLike ,FcViewDetails ,FcFeedback } from "react-icons/fc";

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
                <a href="/profile">
                  <h2>
                    <FcBusinessman />
                  </h2>
                  <p>โปรไฟล์</p>
                </a>
              </li>
              <li className="icon">
                <a href="/member/announces/online">
                  <h2>
                    <FcViewDetails />
                  </h2>
                  <p>ประกาศของฉัน</p>
                </a>
              </li>
              <li className="icon">
                <a href="/member/bookmarks">
                  <h2>
                    <FcLike />
                  </h2>
                  <p>รายการโปรด</p>
                </a>
              </li>
              <li className="icon">
                <a href="/member/mail">
                  <h2>
                    <FcFeedback />
                  </h2>
                  <p>จดหมาย</p>
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
