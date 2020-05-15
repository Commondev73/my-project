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
  DropdownItem
} from "reactstrap";
import { FaSearch, FaListOl } from "react-icons/fa";
import ButtonFilter from "../ButtonFilter/ButtonFilter"
import Drawer from "react-motion-drawer";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      DropdownProperty: false,
      DropdownAnnounce: false,
      DropdownCondition: false,
      announce_type: "ทั้งหมด",
      property_type: "ขาย",
      min_price: "",
      max_price: ""
    };

    this.toggleProperty = this.toggleProperty.bind(this);
    this.toggleAnnounce = this.toggleAnnounce.bind(this);
    this.toggleCondition = this.toggleCondition.bind(this);
    this.announceTypeSelect = this.announceTypeSelect.bind(this);
    this.propertyTypeSelect = this.propertyTypeSelect.bind(this);
  }

  toggleProperty() {
    this.setState({
      DropdownProperty: !this.state.DropdownProperty
    });
  }

  toggleAnnounce() {
    this.setState({
      DropdownAnnounce: !this.state.DropdownAnnounce
    });
  }

  toggleCondition() {
    this.setState({
      DropdownCondition: !this.state.DropdownCondition
    });
  }

  announceTypeSelect(event) {
    this.setState({
      DropdownAnnounce: !this.state.DropdownAnnounce,
      announce_type: event.target.innerText
    });
  }

  propertyTypeSelect(event) {
    this.setState({
      DropdownAnnounce: !this.state.DropdownProperty,
      property_type: event.target.innerText
    });
  }

  render() {
    return (
      <div className="border border-primary bg-white">
        <Container className="top-search mt-1 mb-1">
          <Row>
            <Col md="4" xs="9" className="search">
              <Input
                className="rounded-pill"
                type="Search"
                name="Search"
                id="Search"
                placeholder="ค้นหาทำเล / ชื่อโครงการ "
              />
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
                    บ้าน
                  </DropdownItem>
                  <DropdownItem onClick={this.announceTypeSelect}>
                    คอนโด
                  </DropdownItem>
                  <DropdownItem onClick={this.announceTypeSelect}>
                    ที่ดิน
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
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
                    ขาย
                  </DropdownItem>
                  <DropdownItem onClick={this.propertyTypeSelect}>
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
                          <Input
                            className="rounded-pill text-center"
                            type="number"
                            name="min-price"
                            id="min-price"
                            placeholder="ราคาเริ่มต้น "
                          />
                          <Input
                            className="rounded-pill text-center mt-2"
                            type="number"
                            name="max-price"
                            id="max-price"
                            placeholder="ถึงราคา"
                          />
                        </Col>
                        <Col md="12" className="mb-2">
                          <Input
                            className="rounded-pill text-center"
                            type="number"
                            name="bedroom"
                            id="bedroom"
                            placeholder="จำนวนห้องนอน"
                          />
                        </Col>
                        {/* <Col md="12" className="mb-2">
                          <ButtonDropdown className="btn-menu">
                            <DropdownToggle
                              caret
                              color="outline-info"
                              className="rounded-pill"
                            >
                              ขนาดพื้นที่
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem active>ไม่ระบ</DropdownItem>
                              <DropdownItem>1</DropdownItem>
                              <DropdownItem>2</DropdownItem>
                            </DropdownMenu>
                          </ButtonDropdown>
                        </Col> */}
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
              >
                <FaSearch className="mr-2" />
                ค้นหา
              </Button>
            </Col>
            <ButtonFilter />
          </Row>
        </Container>
      </div>
    );
  }
}

export default Search;
