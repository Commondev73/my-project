import React from "react";
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

class SearchUserAnnounces extends React.Component {
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
        match.params.uatype === undefined || match.params.uatype === "null"
          ? "ทั้งหมด"
          : match.params.uatype,
      property_type:
        match.params.uptype === undefined || match.params.uptype === "null"
          ? "ทั้งหมด"
          : match.params.uptype,
      bedroom:
        match.params.ubedroom === undefined || match.params.ubedroom === "null"
          ? "ห้องนอน"
          : `${match.params.ubedroom} ห้องนอน`,
      toilet:
        match.params.utoilet === undefined || match.params.utoilet === "null"
          ? "ห้องน้ำ"
          : `${match.params.utoilet} ห้องน้ำ`,
      formInputs: {
        keyword:
          match.params.ukeyword === undefined || match.params.ukeyword === null
            ? "null"
            : match.params.ukeyword,
        announce_type:
          match.params.uatype === undefined ? "null" : match.params.uatype,
        property_type:
          match.params.uptype === undefined ? "null" : match.params.uptype,
        bedroom:
          match.params.ubedroom === undefined ? "null" : match.params.ubedroom,
        toilet:
          match.params.utoilet === undefined ? "null" : match.params.utoilet,
      },
    };
  }

  handleResult = () => {
    const { formInputs } = this.state;
    return (window.location.href = `/member/announces/search/${formInputs.keyword}/${formInputs.announce_type}/${formInputs.property_type}/${formInputs.bedroom}/${formInputs.toilet}/1`);
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
      <Container className="mb-3">
        <Row>
          <Col md="4" xs="12" className="mb-2 pl-0 pr-1">
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
          <Col md="2" xs="6" className="mb-2 p-0">
            <ButtonDropdown
              isOpen={this.state.DropdownProperty}
              toggle={this.toggleProperty}
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
          <Col md="2" xs="6" className="pl-1 pr-1">
            <ButtonDropdown
              isOpen={this.state.DropdownAnnounce}
              toggle={this.toggleAnnounce}
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
          <Col md="2" xs="6" className="mb-2 p-0">
            <ButtonDropdown
              isOpen={this.state.DropdownCondition}
              toggle={this.toggleCondition}
              className=""
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
                          className=""
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
                          className=" mt-2"
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
                      </Col>
                    </Row>
                  </Container>
                </DropdownMenu>
              </div>
            </ButtonDropdown>
          </Col>
          <Col md="2" xs="6" className="pl-1 pr-0">
            <Button
              block
              className="rounded-pill border-white"
              color="warning"
              onClick={() => this.handleResult()}
            >
              <FaSearch className="mr-2" />
              ค้นหา
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SearchUserAnnounces;
