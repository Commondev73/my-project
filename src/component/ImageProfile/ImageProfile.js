import React from "react";
import imageUser from "../image/user-img.jpg";
import "./ImageProfile.css";

class ImageProfile extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div className="profile">
        <div className="image">
          <img
            className="rounded mx-auto d-block rounded-circle"
            src={user.image ? `${user.image}` : imageUser}
            alt="Cinque Terre"
          />
        </div>
        <div className="user-name">
          <p>{user.first_name}</p>
        </div>
      </div>
    );
  }
}

export default ImageProfile 
