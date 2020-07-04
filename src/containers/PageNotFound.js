import React from "react";
import ErrorPage from "../component/ErrorPage/ErrorPage";
class PageNotFound extends React.Component {

  componentDidMount = () => {
    document.title = "ขออภัย ไม่พบหน้าที่คุณต้องการ";
  };

  render() {
    return <ErrorPage />;
  }
}
export default PageNotFound;
