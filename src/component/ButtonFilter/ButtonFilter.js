import React from "react";
import "./ButtonFilter.css";
import Drawer from "react-motion-drawer";
import { FaSearch } from "react-icons/fa";
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

class ButtonFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerOpen: false,
      DropdownProperty: false,
      DropdownAnnounce: false,
      DropdownBedroom: false,
      DropdownToilet: false,
    };
  }

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

  render() {
    const {
      state,
      propertyTypeSelect,
      announceTypeSelect,
      BedroomSelect,
      ToiletSelect,
      changeHandler,
      handleResult
    } = this.props;
    return (
      <div className="button-filter">
        <Button
          className="rounded-pill d-block d-sm-none d-sm-block d-md-none border border-white btn-search"
          onClick={() => this.setState({ drawerOpen: !this.state.drawerOpen })}
        >
          ตัวกรอง
        </Button>

        <Drawer
          right
          width={300}
          open={this.state.drawerOpen}
          noTouchOpen={true}
          onChange={(open) => this.setState({ drawerOpen: open })}
        >
          <div
            className="drawer"
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "white",
            }}
          >
            <Container className="top-search">
              <Row>
                <Col xs="12">
                  <ButtonDropdown
                    isOpen={this.state.DropdownProperty}
                    toggle={this.toggleProperty}
                    className="mt-3"
                  >
                    <DropdownToggle
                      caret
                      color="outline-info"
                      className="rounded-pill "
                    >
                      {state.property_type}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={propertyTypeSelect}>
                        ทั้งหมด
                      </DropdownItem>
                      <DropdownItem onClick={propertyTypeSelect}>
                        บ้าน
                      </DropdownItem>
                      <DropdownItem onClick={propertyTypeSelect}>
                        คอนโด
                      </DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </Col>
                <Col xs="12">
                  <ButtonDropdown
                    isOpen={this.state.DropdownAnnounce}
                    toggle={this.toggleAnnounce}
                    className="mt-3"
                  >
                    <DropdownToggle
                      caret
                      color="outline-info"
                      className="rounded-pill"
                    >
                      {state.announce_type}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={announceTypeSelect}>
                        ทั้งหมด
                      </DropdownItem>
                      <DropdownItem onClick={announceTypeSelect}>
                        ขาย
                      </DropdownItem>
                      <DropdownItem onClick={announceTypeSelect}>
                        เช่า
                      </DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </Col>
                <Col xs="12">
                  <ButtonDropdown
                    isOpen={this.state.DropdownBedroom}
                    toggle={this.toggleBedroom}
                    className="mt-3"
                  >
                    <DropdownToggle
                      caret
                      color="outline-info"
                      className="rounded-pill"
                    >
                      {state.bedroom}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={BedroomSelect}>
                        ห้องนอน
                      </DropdownItem>
                      <DropdownItem onClick={BedroomSelect}>
                        1 ห้องนอน
                      </DropdownItem>
                      <DropdownItem onClick={BedroomSelect}>
                        2 ห้องนอน
                      </DropdownItem>
                      <DropdownItem onClick={BedroomSelect}>
                        3 ห้องนอน
                      </DropdownItem>
                      <DropdownItem onClick={BedroomSelect}>
                        4 ห้องนอน
                      </DropdownItem>
                      <DropdownItem onClick={BedroomSelect}>
                        5 ห้องนอนขึ้นไป
                      </DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </Col>
                <Col xs="12">
                  <ButtonDropdown
                    isOpen={this.state.DropdownToilet}
                    toggle={this.toggleToilet}
                    className="mt-3"
                  >
                    <DropdownToggle
                      caret
                      color="outline-info"
                      className="rounded-pill"
                    >
                      {state.toilet}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={ToiletSelect}>
                        ห้องน้ำ
                      </DropdownItem>
                      <DropdownItem onClick={ToiletSelect}>
                        1 ห้องน้ำ
                      </DropdownItem>
                      <DropdownItem onClick={ToiletSelect}>
                        2 ห้องน้ำ
                      </DropdownItem>
                      <DropdownItem onClick={ToiletSelect}>
                        3 ห้องน้ำ
                      </DropdownItem>
                      <DropdownItem onClick={ToiletSelect}>
                        4 ห้องน้ำ
                      </DropdownItem>
                      <DropdownItem onClick={ToiletSelect}>
                        5 ห้องน้ำขึ้นไป
                      </DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </Col>
                <Col xs="12">
                  <Input
                    className="rounded-pill text-center mt-2"
                    type="number"
                    name="min_price"
                    id="min_price"
                    placeholder="ราคาเริ่มต้น"
                    value={state.formInputs.min_price}
                    onChange={changeHandler}
                  />
                </Col>
                <Col xs="12">
                  <Input
                    className="rounded-pill text-center mt-2"
                    type="number"
                    name="max_price"
                    id="max_price"
                    placeholder="ถึงราคา"
                    value={state.formInputs.max_price}
                    onChange={changeHandler}
                  />
                </Col>
                <Col xs="12">
                  <Button
                    block
                    className="mt-3 rounded-pill border-white "
                    style={{ backgroundColor: `rgb(243, 153, 77)` }}
                    onClick={handleResult}
                  >
                    <FaSearch />
                    ค้นหา
                  </Button>
                </Col>
              </Row>
            </Container>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default ButtonFilter;
