import React from "react";
import { SyncLoader } from "react-spinners";
import "./Loading.css";

class Loading extends React.Component {
  render() {
    return (
      <div className="loading">
        <SyncLoader
          size={15}
          color={"#6EA7EC"}
          loading={this.props.isLoading}
        />
      </div>
    );
  }
}

export default Loading;
