import React from "react";
import "./Seacrh.css";
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { FaSearch, FaListOl } from "react-icons/fa";
import ButtonFilter from "../ButtonFilter/ButtonFilter";

class Search extends React.Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      DropdownProperty: false,
      DropdownAnnounce: false,
      DropdownCondition: false,
      DropdownBedroom: false,
      DropdownToilet: false,
      announce_type:
        match.params.atype === undefined || match.params.atype === "null"
          ? "ทั้งหมด"
          : match.params.atype,
      property_type:
        match.params.ptype === undefined || match.params.ptype === "null"
          ? "ทั้งหมด"
          : match.params.ptype,
      bedroom:
        match.params.bedroom === undefined || match.params.bedroom === "null"
          ? "ห้องนอน"
          : `${match.params.bedroom} ห้องนอน`,
      toilet:
        match.params.toilet === undefined || match.params.toilet === "null"
          ? "ห้องน้ำ"
          : `${match.params.toilet} ห้องน้ำ`,
      formInputs: {
        keyword:
          match.params.keyword === undefined || match.params.keyword === null
            ? "null"
            : match.params.keyword,
        announce_type:
          match.params.atype === undefined ? "null" : match.params.atype,
        property_type:
          match.params.ptype === undefined ? "null" : match.params.ptype,
        bedroom:
          match.params.bedroom === undefined ? "null" : match.params.bedroom,
        toilet:
          match.params.toilet === undefined ? "null" : match.params.toilet,
        min_price:
          match.params.price === undefined ? "null" : match.params.price,
        max_price:
          match.params.toprice === undefined ? "null" : match.params.toprice,
      },
    };
  }

  handleResult = () => {
    const { formInputs } = this.state;
    return (window.location.href = `/search/${formInputs.keyword}/${formInputs.announce_type}/${formInputs.property_type}/${formInputs.bedroom}/${formInputs.toilet}/${formInputs.min_price}/${formInputs.max_price}/1`);
  };

  toggleProperty = () => {
    this.setState({
      DropdownProperty: !this.state.DropdownProperty,
    });
  };

  toggleAnnounce = () => {
    this.setState({
      DropdownAnnounce: !this.state.DropdownAnnounce,
    });
  };

  toggleCondition = () => {
    this.setState({
      DropdownCondition: !this.state.DropdownCondition,
    });
  };

  toggleBedroom = () => {
    this.setState({
      DropdownBedroom: !this.state.DropdownBedroom,
    });
  };

  toggleToilet = () => {
    this.setState({
      DropdownToilet: !this.state.DropdownToilet,
    });
  };

  announceTypeSelect = (event) => {
    this.setState({
      ...this.state,
      DropdownAnnounce: !this.state.DropdownAnnounce,
      announce_type: event.target.innerText,
      formInputs: {
        ...this.state.formInputs,
        announce_type:
          event.target.innerText === "ทั้งหมด" ? null : event.target.innerText,
      },
    });
  };

  propertyTypeSelect = (event) => {
    this.setState({
      ...this.state,
      DropdownAnnounce: !this.state.DropdownProperty,
      property_type: event.target.innerText,
      formInputs: {
        ...this.state.formInputs,
        property_type:
          event.target.innerText === "ทั้งหมด" ? null : event.target.innerText,
      },
    });
  };

  changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value.trim();

    this.setState({
      ...this.state,
      formInputs: {
        ...this.state.formInputs,
        [name]: value === "" ? "null" : value,
      },
    });
  };

  BedroomSelect = (event) => {
    const value = event.target.innerText;
    let result = null;
    switch (value) {
      case "ห้องนอน":
        result = null;
        break;
      case "1 ห้องนอน":
        result = 1;
        break;
      case "2 ห้องนอน":
        result = 2;
        break;
      case "3 ห้องนอน":
        result = 3;
        break;
      case "4 ห้องนอน":
        result = 4;
        break;
      case "5 ห้องนอนขึ้นไป":
        result = 5;
        break;
      default:
        return result;
    }
    this.setState({
      ...this.state,
      DropdownBedroom: !this.state.DropdownProperty,
      bedroom: event.target.innerText,
      formInputs: {
        ...this.state.formInputs,
        bedroom: result,
      },
    });
  };

  ToiletSelect = (event) => {
    const value = event.target.innerText;
    let result = null;
    switch (value) {
      case "ห้องน้ำ":
        result = null;
        break;
      case "1 ห้องน้ำ":
        result = 1;
        break;
      case "2 ห้องน้ำ":
        result = 2;
        break;
      case "3 ห้องน้ำ":
        result = 3;
        break;
      case "4 ห้องน้ำ":
        result = 4;
        break;
      case "5 ห้องน้ำขึ้นไป":
        result = 5;
        break;
      default:
        return result;
    }
    this.setState({
      ...this.state,
      DropdownToilet: !this.state.DropdownToilet,
      toilet: event.target.innerText,
      formInputs: {
        ...this.state.formInputs,
        toilet: result,
      },
    });
  };

  render() {
    const { formInputs } = this.state;
    return (
      <div className="border border-primary bg-white">
        <Container className="top-search mt-1 mb-1">
          <Row>
            <Col md="4" xs="9" className="search">
              <Input
                className="rounded-pill"
                type="text"
                name="keyword"
                id="keyword"
                placeholder="ค้นหาทำเล / ชื่อโครงการ "
                value={formInputs.keyword === "null" ? "" : formInputs.keyword}
                onChange={this.changeHandler}
              />
            </Col>
            <Col md="2" className="d-none d-sm-block pl-0">
              <ButtonDropdown
                isOpen={this.state.DropdownProperty}
                toggle={this.toggleProperty}
                className="btn-menu"
              >
                <DropdownToggle
                  caret
                  color="outline-info"
                  className="rounded-pill"
                >
                  {this.state.property_type}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={this.propertyTypeSelect}>
                    ทั้งหมด
                  </DropdownItem>
                  <DropdownItem onClick={this.propertyTypeSelect}>
                    บ้าน
                  </DropdownItem>
                  <DropdownItem onClick={this.propertyTypeSelect}>
                    คอนโด
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </Col>
            <Col md="2" className="d-none d-sm-block pl-0">
              <ButtonDropdown
                isOpen={this.state.DropdownAnnounce}
                toggle={this.toggleAnnounce}
                className="btn-menu"
              >
                <DropdownToggle
                  caret
                  color="outline-info"
                  className="rounded-pill"
                >
                  {this.state.announce_type}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={this.announceTypeSelect}>
                    ทั้งหมด
                  </DropdownItem>
                  <DropdownItem onClick={this.announceTypeSelect}>
                    ขาย
                  </DropdownItem>
                  <DropdownItem onClick={this.announceTypeSelect}>
                    เช่า
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </Col>
            <Col md="2" className="d-none d-sm-block pl-0">
              <ButtonDropdown
                isOpen={this.state.DropdownCondition}
                toggle={this.toggleCondition}
                className="btn-menu"
              >
                <DropdownToggle caret color="info" className="rounded-pill">
                  <FaListOl className="mr-2" />
                  เพิ่มเติม
                </DropdownToggle>
                <div className="Dropdown-condition">
                  <DropdownMenu className="condition">
                    <Container>
                      <Row>
                        <Col md="12" className="mb-2">
                          <ButtonDropdown
                            isOpen={this.state.DropdownBedroom}
                            toggle={this.toggleBedroom}
                            className="btn-menu"
                          >
                            <DropdownToggle
                              caret
                              color="outline-info"
                              className="rounded-pill"
                            >
                              {this.state.bedroom}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem onClick={this.BedroomSelect}>
                                ห้องนอน
                              </DropdownItem>
                              <DropdownItem onClick={this.BedroomSelect}>
                                1 ห้องนอน
                              </DropdownItem>
                              <DropdownItem onClick={this.BedroomSelect}>
                                2 ห้องนอน
                              </DropdownItem>
                              <DropdownItem onClick={this.BedroomSelect}>
                                3 ห้องนอน
                              </DropdownItem>
                              <DropdownItem onClick={this.BedroomSelect}>
                                4 ห้องนอน
                              </DropdownItem>
                              <DropdownItem onClick={this.BedroomSelect}>
                                5 ห้องนอนขึ้นไป
                              </DropdownItem>
                            </DropdownMenu>
                          </ButtonDropdown>

                          <ButtonDropdown
                            isOpen={this.state.DropdownToilet}
                            toggle={this.toggleToilet}
                            className="btn-menu mt-2"
                          >
                            <DropdownToggle
                              caret
                              color="outline-info"
                              className="rounded-pill"
                            >
                              {this.state.toilet}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem onClick={this.ToiletSelect}>
                                ห้องน้ำ
                              </DropdownItem>
                              <DropdownItem onClick={this.ToiletSelect}>
                                1 ห้องน้ำ
                              </DropdownItem>
                              <DropdownItem onClick={this.ToiletSelect}>
                                2 ห้องน้ำ
                              </DropdownItem>
                              <DropdownItem onClick={this.ToiletSelect}>
                                3 ห้องน้ำ
                              </DropdownItem>
                              <DropdownItem onClick={this.ToiletSelect}>
                                4 ห้องน้ำ
                              </DropdownItem>
                              <DropdownItem onClick={this.ToiletSelect}>
                                5 ห้องน้ำขึ้นไป
                              </DropdownItem>
                            </DropdownMenu>
                          </ButtonDropdown>

                          <Input
                            className="rounded-pill text-center mt-2"
                            type="number"
                            name="min_price"
                            id="min_price"
                            placeholder="ราคาเริ่มต้น"
                            value={formInputs.min_price}
                            onChange={this.changeHandler}
                          />
                          <Input
                            className="rounded-pill text-center mt-2"
                            type="number"
                            name="max_price"
                            id="max_price"
                            placeholder="ถึงราคา"
                            value={formInputs.max_price}
                            onChange={this.changeHandler}
                          />
                        </Col>
                      </Row>
                    </Container>
                  </DropdownMenu>
                </div>
              </ButtonDropdown>
            </Col>
            <Col md="2" className="d-none d-sm-block pl-0">
              <Button
                block
                className="rounded-pill border-white btn-search btn-menu"
                onClick={() => this.handleResult()}
              >
                <FaSearch className="mr-2" />
                ค้นหา
              </Button>
            </Col>
            <ButtonFilter
              propertyTypeSelect={this.propertyTypeSelect}
              announceTypeSelect={this.announceTypeSelect}
              BedroomSelect={this.BedroomSelect}
              ToiletSelect={this.ToiletSelect}
              changeHandler={this.changeHandler}
              state={this.state}
              handleResult={this.handleResult}
            />
          </Row>
        </Container>
      </div>
    );
  }
}

export default Search;
