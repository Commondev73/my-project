import React, { Fragment } from "react";
import Loading from "../component/Loading/Loading";
import ModalErr from "../component/ModalErr/ModalErr";
import UserMenu from "../component/UserMenu/UserMenu";
import { connect } from "react-redux";
import { fetchDataUser } from "../actions";

class MemberArea extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    this.props.fetchDataUser();
  };
  render() {
    const { user, isLoading, err } = this.props;
    return (
      <Fragment>
        {/* <Loading isLoading={true} /> */}
        {isLoading && !user && <Loading isLoading={isLoading} />}
        {user && (
          <Fragment>
            <UserMenu user={user} />
            <h1>MemberArea</h1>
          </Fragment>
        )}
         {err  && <ModalErr />}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.data_user.data,
    err: state.data_user.err,
    isLoading: state.data_user.isLoading
  };
};

const mapDispatchToProps = {
  fetchDataUser
};
export default MemberArea = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberArea);
