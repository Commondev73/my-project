import React from "react";
import "./FormAnnounces.css";
import TopicForm from "./TopicForm";
import DetailsForm from "./DetailsForm";
import ConfirmForm from "./ConfirmForm";
import Progress from "./Progress";
// import _ from "lodash";
import { Container, Row, Col } from "reactstrap";
// import { connect } from "react-redux";
// import { fetchProvince, fetchAmphoe, fetchDistrict } from "../../actions";

class FormAnnounces extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
    };
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
  }

  // componentDidMount = () => {
  //   this.props.fetchProvince();
  // };

  // changeHandler = input => event => {
  //   // const value = event.target.value.trim();
  //   const value = event.target.value;
  //   this.setState({
  //     formInputs: {
  //       ...this.state.formInputs,
  //       [input]: value
  //     }
  //   });
  // };

  // handlerSelectedOption = input => selectedOption => {
  //   this.setState({
  //     formInputs: {
  //       ...this.state.formInputs,
  //       [input]: selectedOption
  //     }
  //   });
  //   if (input === "district") {
  //     this.setState({
  //       formInputs: {
  //         ...this.state.formInputs,
  //         [`${input}`]: selectedOption
  //       }
  //     });
  //   }
  // };

  // handlerSelectedOptionProvince = selectedOption => {
  //   this.setState({
  //     formInputs: {
  //       ...this.state.formInputs,
  //       province: selectedOption,
  //       amphoe: ""
  //     }
  //   });
  //   this.props.fetchAmphoe(selectedOption.value);
  // };

  // handlerSelectedOptionAmphoe = selectedOption => {
  //   this.setState({
  //     formInputs: {
  //       ...this.state.formInputs,
  //       amphoe: selectedOption,
  //       district: ""
  //     }
  //   });
  //   this.props.fetchDistrict(selectedOption.value);
  // };

  // addLoadedFile = file => {
  //   this.setState(prevState => ({
  //     formInputs: {
  //       ...prevState.formInputs,
  //       image: {
  //         imageData: [...prevState.formInputs.image.imageData, file.imageData],
  //         file: [...prevState.formInputs.image.file, file.File]
  //       }
  //     }
  //   }));
  //   console.log("image", this.state.formInputs);
  // };

  // removeAllLoadedFile = () => {
  //   this.setState({
  //     formInputs: {
  //       ...this.state.formInputs,
  //       image: { imageData: [], File: [] }
  //     }
  //   });
  // };

  // removeLoadedFile = file => {
  //   this.setState(prevState => {
  //     const fileImage = this.state.formInputs.image.file;
  //     const image = this.state.formInputs.image.imageData;
  //     let newImage = _.filter(image, IdFile => {
  //       return IdFile != file;
  //     });
  //     let newFiles = _.filter(fileImage, IdFile => {
  //       return IdFile.name != file.name;
  //     });
  //     return { formInputs: { ...prevState.formInputs, image: {imageData: newImage , file: newFiles}}};
  //   });
  // };

  nextStep() {
    this.setState((state) => ({
      step: state.step + 1,
    }));
  }

  prevStep() {
    this.setState((state) => ({
      step: state.step - 1,
    }));
  }

  showStep() {
    const {
      values,
      province_isLoading,
      province,
      amphoe_isLoading,
      amphoe,
      district_isLoading,
      district,
    } = this.props;
    if (this.state.step === 1) {
      return (
        <TopicForm
          nextStep={this.nextStep}
          changeHandler={this.props.changeHandler}
          province={province}
          province_isLoading={province_isLoading}
          amphoe={amphoe}
          amphoe_isLoading={amphoe_isLoading}
          district={district}
          district_isLoading={district_isLoading}
          handlerSelectedOption={this.props.handlerSelectedOption}
          handlerSelectedOptionAmphoe={this.props.handlerSelectedOptionAmphoe}
          handlerSelectedOptionProvince={this.props.handlerSelectedOptionProvince}
          values={values}
        />
      );
    }
    if (this.state.step === 2) {
      return (
        <DetailsForm
          nextStep={this.nextStep}
          prevStep={this.prevStep}
          changeHandler={this.props.changeHandler}
          values={values}
          addLoadedFile={this.props.addLoadedFile}
          removeLoadedFile={this.props.removeLoadedFile}
          removeAllLoadedFile={this.props.removeAllLoadedFile}
        />
      );
    }
    if (this.state.step === 3) {
      return (
        <ConfirmForm
          values={values}
          prevStep={this.prevStep}
          submit={this.props.submit}
          draft={this.props.draft}
        />
      );
    }
  }

  render() {
    return (
      <Container className="pt-3 pb-3 border border-radius">
        <Row>
          <Col md="12">
            <Progress step={this.state.step} />
          </Col>
          <Col md="12" className="form-announces">
            {this.showStep()}
          </Col>
        </Row>
      </Container>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     province: state.province.data,
//     province_err: state.province.err,
//     province_isLoading: state.province.isLoading,
//     amphoe: state.amphoe.data,
//     amphoe_err: state.amphoe.err,
//     amphoe_isLoading: state.amphoe.isLoading,
//     district: state.district.data,
//     district_err: state.district.err,
//     district_isLoading: state.district.isLoading
//   };
// };

// const mapDispatchToProps = {
//   fetchProvince,
//   fetchAmphoe,
//   fetchDistrict
// };
// export default FormAnnounces = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(FormAnnounces);
export default FormAnnounces;
