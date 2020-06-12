import React, { Fragment } from "react";
import Loading from "../component/Loading/Loading";
import Header from "../component/Header/Header";
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
import { FaHome, FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { connect } from "react-redux";
import {
  fetchUserAnnounce,
  updateAnnounces,
  fetchDataUser,
  fetchProvince,
  fetchAmphoe,
  fetchDistrict,
} from "../actions";
import _ from "lodash";

class EditAnnounces extends React.Component {
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
        imageDelete: [],
        image: {
          imageData: [],
          file: [],
        },
        status: "",
      },
    };
  }

  componentDidMount = () => {
    const id = this.props.match.params.id;
    this.props.fetchDataUser();
    this.props.fetchProvince();
    this.props.fetchUserAnnounce(id);
  };

  componentDidUpdate = (nextProps) => {
    const { announce } = this.props;
    if (announce !== nextProps.announce) {
      if (announce) {
        let image = announce.image.map((file) => {
          return {
            id: file.id,
            data: file.image_name,
          };
        });
        this.setState({
          formInputs: {
            // step 1
            announceType: announce.announcement_type,
            announceStatus: announce.announcer_status,
            propertyType: {
              label: announce.property_type,
              value: announce.property_type,
            },
            province: {
              label: announce.province_name,
              value: announce.province_code,
            },
            amphoe: {
              label: announce.amphoe_name,
              value: announce.amphoe_code,
            },
            district: {
              label: announce.district_name,
              value: announce.district_code,
            },
            topic: announce.topic,
            detail: announce.detail,
            // step 2
            bedroom: announce.bedroom,
            toilet: announce.floor,
            floor: announce.floor,
            area: announce.area,
            price: announce.price.replace(/,/g, ""),
            imageDelete: [],
            image: {
              imageData: image,
              file: [],
            },
            status: announce.status,
          },
        });
        this.props.fetchAmphoe(announce.province_code);
        this.props.fetchDistrict(announce.amphoe_code);
      }
    }
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

      let FileID = {
        formInputs: {
          ...prevState.formInputs,
          image: { imageData: newImage, file: newFiles },
          imageDelete: [...prevState.formInputs.imageDelete, file.id],
        },
      };

      let File = {
        formInputs: {
          ...prevState.formInputs,
          image: { imageData: newImage, file: newFiles },
        },
      };

      return file.id ? FileID : File;
    });
    // console.log("imageD", this.state.formInputs);
  };

  // handlerDeleteImage = file => {
  //   if (file.id) {
  //     this.setState((prevState) => ({
  //       formInputs: {
  //         ...prevState.formInputs,
  //         imageDelete: [...prevState.formInputs.imageDelete, file.id]
  //       }
  //     }));
  //     console.log("imageD", this.state.formInputs);
  //   }
  // };

  handleSubmit = async () => {
    const id = this.props.match.params.id;
    await this.setState({
      formInputs: {
        ...this.state.formInputs,
        status: 1,
      },
    });
    this.props.updateAnnounces(id, this.state.formInputs);
  };

  handleDraft = async () => {
    const id = this.props.match.params.id;
    await this.setState({
      formInputs: {
        ...this.state.formInputs,
        status: 0,
      },
    });
    this.props.updateAnnounces(id, this.state.formInputs);
  };

  handleRedirect = () => {
    const { redirect } = this.props;
    if (redirect) {
      // return this.props.history.push("/member/announces");
      return (window.location.href = "/member/announces/online/1");
    }
  };

  render() {
    const {
      user,
      isLoading,
      err,
      //
      isLoading_announce,
      announce,
      err_announce,
      //
      updateAnnounces_err,
      redirect,
      //
      province_isLoading,
      province,
      province_err,
      //
      amphoe_isLoading,
      amphoe,
      amphoe_err,
      //
      district_isLoading,
      district,
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
          {isLoading && isLoading_announce && !user && !announce && (
            <Loading isLoading={isLoading} />
          )}
          {user && announce && (
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
                  <BreadcrumbItem active>แก้ไขประกาศ</BreadcrumbItem>
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
            err_announce ||
            updateAnnounces_err ||
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
                <h3>แก้ไขประกาศสำเร็จ</h3>
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

          {updateAnnounces_err && (
            <Modal isOpen={true} className="modal-dialog-centered">
              <ModalBody className="text-center">
                <FaRegTimesCircle style={{ color: "red" }} size={32} />
                <h4>เกิดข้อผิดพลาด กรุณาทำรายการใหม่</h4>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="success m-auto"
                  onClick={() => window.location.reload()}
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

const mapStateToProps = (state, props) => {
  const announce = state.announce[props.match.params.id] || {};
  return {
    isAuthenticated: state.user.authenticated,
    userSet: state.user,

    user: state.data_user.data,
    err: state.data_user.err,
    isLoading: state.data_user.isLoading,

    isLoading_announce: state.announce_user.isLoading,
    announce: state.announce_user.data,
    err_announce: state.announce_user.err,

    updateAnnounces: state.updateAnnounces.data,
    updateAnnounces_err: state.updateAnnounces.err,
    updateAnnounces_isLoading: state.updateAnnounces.isLoading,
    redirect: state.updateAnnounces.redirect,

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
  fetchUserAnnounce,
  updateAnnounces,

  fetchDataUser,

  fetchProvince,
  fetchAmphoe,
  fetchDistrict,
};
export default EditAnnounces = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAnnounces);
