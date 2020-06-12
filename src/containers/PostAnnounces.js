import React, { Fragment } from "react";
import Header from "../component/Header/Header";
import Loading from "../component/Loading/Loading";
import UserMenu from "../component/UserMenu/UserMenu";
import ModalErr from "../component/ModalErr/ModalErr";
import FormAnnounces from "../component/FormAnnounces/FormAnnounces";
import {
  Container,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import { FaHome, FaRegCheckCircle } from "react-icons/fa";
import { connect } from "react-redux";
import {
  fetchDataUser,
  postAnnounces,
  fetchProvince,
  fetchAmphoe,
  fetchDistrict,
} from "../actions";
import _ from "lodash";
class PostAnnounces extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formInputs: {
        // step 1
        announceType: "",
        announceStatus: "",
        propertyType: "",
        province: "",
        amphoe: "",
        district: "",
        topic: "",
        detail: "",
        // step 2
        bedroom: "",
        toilet: "",
        floor: "",
        area: "",
        price: "",
        image: {
          imageData: [],
          file: [],
        },
        status: "",
      },
    };
  }

  componentDidMount = () => {
    this.props.fetchDataUser();
    this.props.fetchProvince();
  };

  changeHandler = (input) => (event) => {
    // const value = event.target.value.trim();
    const value = event.target.value;
    this.setState({
      formInputs: {
        ...this.state.formInputs,
        [input]: value,
      },
    });
  };

  handlerSelectedOption = (input) => (selectedOption) => {
    this.setState({
      formInputs: {
        ...this.state.formInputs,
        [input]: selectedOption,
      },
    });
    if (input === "district") {
      this.setState({
        formInputs: {
          ...this.state.formInputs,
          [`${input}`]: selectedOption,
        },
      });
    }
  };

  handlerSelectedOptionProvince = (selectedOption) => {
    this.setState({
      formInputs: {
        ...this.state.formInputs,
        province: selectedOption,
        amphoe: "",
      },
    });
    this.props.fetchAmphoe(selectedOption.value);
  };

  handlerSelectedOptionAmphoe = (selectedOption) => {
    this.setState({
      formInputs: {
        ...this.state.formInputs,
        amphoe: selectedOption,
        district: "",
      },
    });
    this.props.fetchDistrict(selectedOption.value);
  };

  addLoadedFile = (file) => {
    this.setState((prevState) => ({
      formInputs: {
        ...prevState.formInputs,
        image: {
          imageData: [...prevState.formInputs.image.imageData, file.imageData],
          file: [...prevState.formInputs.image.file, file.File],
        },
      },
    }));
    console.log("image", this.state.formInputs);
  };

  removeAllLoadedFile = () => {
    this.setState({
      formInputs: {
        ...this.state.formInputs,
        image: { imageData: [], File: [] },
      },
    });
  };

  removeLoadedFile = (file) => {
    this.setState((prevState) => {
      const fileImage = this.state.formInputs.image.file;
      const image = this.state.formInputs.image.imageData;
      let newImage = _.filter(image, (IdFile) => {
        return IdFile != file;
      });
      let newFiles = _.filter(fileImage, (IdFile) => {
        return IdFile.name != file.name;
      });
      return {
        formInputs: {
          ...prevState.formInputs,
          image: { imageData: newImage, file: newFiles },
        },
      };
    });
  };

  handleSubmit = async () => {
    await this.setState({
      formInputs: {
        ...this.state.formInputs,
        status: 1,
      },
    });
    this.props.postAnnounces(this.state.formInputs);
  };

  handleDraft = async () => {
    await this.setState({
      formInputs: {
        ...this.state.formInputs,
        status: 0,
      },
    });
    this.props.postAnnounces(this.state.formInputs);
  };

  handleRedirect = () => {
    const { redirect } = this.props;
    if (redirect) {
      return (window.location.href = "/member/announces/online/1");
    }
  };

  render() {
    const {
      user,
      isLoading,
      err,
      redirect,
      province_isLoading,
      province,
      amphoe_isLoading,
      amphoe,
      district_isLoading,
      district,

      postAnnounces_err,
      province_err,
      amphoe_err,
      district_err,

      userSet,
      isAuthenticated,
      match,
    } = this.props;
    const values = { ...this.state.formInputs };
    return (
      <Fragment>
        <Header
          user={userSet}
          isAuthenticated={isAuthenticated}
          match={match}
        />
        <div className="content">
          {isLoading && !user && <Loading isLoading={isLoading} />}
          {user && (
            <Fragment>
              <UserMenu user={user} />
              <Container className="mt-2">
                <Breadcrumb style={{ backgroundColor: "white" }}>
                  <BreadcrumbItem>
                    <FaHome className="mr-1" />
                    <a href="/">หน้าแรก</a>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <a href="/member">หน้าสมาชิก</a>
                  </BreadcrumbItem>
                  <BreadcrumbItem active>เพิ่มประกาศ</BreadcrumbItem>
                </Breadcrumb>
              </Container>
              <FormAnnounces
                changeHandler={this.changeHandler}
                values={values}
                province={province}
                province_isLoading={province_isLoading}
                amphoe={amphoe}
                amphoe_isLoading={amphoe_isLoading}
                district={district}
                district_isLoading={district_isLoading}
                handlerSelectedOption={this.handlerSelectedOption}
                handlerSelectedOptionAmphoe={this.handlerSelectedOptionAmphoe}
                handlerSelectedOptionProvince={
                  this.handlerSelectedOptionProvince
                }
                addLoadedFile={this.addLoadedFile}
                removeLoadedFile={this.removeLoadedFile}
                removeAllLoadedFile={this.removeAllLoadedFile}
                submit={this.handleSubmit}
                draft={this.handleDraft}
              />
            </Fragment>
          )}
          {err ||
            postAnnounces_err ||
            province_err ||
            amphoe_err ||
            (district_err && <ModalErr />)}
          {redirect && (
            <Modal isOpen={true}>
              <ModalHeader
                style={{
                  backgroundColor: "#01D26C",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FaRegCheckCircle style={{ color: "white" }} size={32} />
              </ModalHeader>
              <ModalBody className="text-center">
                <h3>เพิ่มประกาศสำเร็จ</h3>
              </ModalBody>
              <ModalFooter>
                <Button
                  size="lg"
                  color="success m-auto"
                  onClick={this.handleRedirect}
                  className="rounded-pill"
                >
                  ตกลง
                </Button>
              </ModalFooter>
            </Modal>
          )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.authenticated,
    userSet: state.user,

    user: state.data_user.data,
    err: state.data_user.err,
    isLoading: state.data_user.isLoading,

    postAnnounces: state.postAnnounces.data,
    postAnnounces_err: state.postAnnounces.err,
    postAnnounces_isLoading: state.postAnnounces.isLoading,
    redirect: state.postAnnounces.redirect,

    province: state.province.data,
    province_err: state.province.err,
    province_isLoading: state.province.isLoading,
    amphoe: state.amphoe.data,
    amphoe_err: state.amphoe.err,
    amphoe_isLoading: state.amphoe.isLoading,
    district: state.district.data,
    district_err: state.district.err,
    district_isLoading: state.district.isLoading,
  };
};

const mapDispatchToProps = {
  fetchDataUser,
  postAnnounces,

  fetchProvince,
  fetchAmphoe,
  fetchDistrict,
};
export default PostAnnounces = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostAnnounces);
