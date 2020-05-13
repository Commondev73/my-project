import React from "react";
import "./ButtonFilter.css"
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
  DropdownItem
} from "reactstrap";

class ButtonFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerOpen: false
    };
  }

  render() {
    return (
      <div className="button-filter">
        <Button
          className="rounded-pill d-block d-sm-none d-sm-block d-md-none border border-white btn-search"
          onClick={() =>
            this.setState({ drawerOpen: !this.state.drawerOpen })
          }
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
              backgroundColor: "white"
            }}
          >
            <Container className="top-search">
              <Row>
                <Col xs="12">
                  <ButtonDropdown className="mt-3">
                    <DropdownToggle
                      caret
                      color="outline-info"
                      className="rounded-pill "
                    >
                      ทั้งหมด
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem active>ทั้งหมด</DropdownItem>
                      <DropdownItem>บ้าน</DropdownItem>
                      <DropdownItem>คอนโด</DropdownItem>
                      <DropdownItem>ที่ดิน</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </Col>
                <Col xs="12">
                  <ButtonDropdown className="mt-3">
                    <DropdownToggle
                      caret
                      color="outline-info"
                      className="rounded-pill"
                    >
                      ประเภท
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem active>ทั้งหมด</DropdownItem>
                      <DropdownItem>ขาย</DropdownItem>
                      <DropdownItem>เช่า</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </Col>
                <Col xs="12">
                  <ButtonDropdown className="mt-3">
                    <DropdownToggle
                      caret
                      color="outline-info"
                      className="rounded-pill"
                    >
                      ราคา
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem active>ทั้งหมด</DropdownItem>
                      <DropdownItem>ขาย</DropdownItem>
                      <DropdownItem>เช่า</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </Col>
                <Col xs="12">
                  <ButtonDropdown className="mt-3">
                    <DropdownToggle
                      caret
                      color="outline-info"
                      className="rounded-pill"
                    >
                      ห้องนอน
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem active>ไม่ระบุ</DropdownItem>
                      <DropdownItem>1</DropdownItem>
                      <DropdownItem>2</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </Col>
                <Col xs="12">
                  <ButtonDropdown className="mt-3">
                    <DropdownToggle
                      caret
                      color="outline-info"
                      className="rounded-pill"
                    >
                      พื้นที่
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem active>ไม่ระบุ</DropdownItem>
                      <DropdownItem>1</DropdownItem>
                      <DropdownItem>2</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </Col>
                <Col xs="12">
                  <Button
                    block
                    className="mt-3 rounded-pill border-white "
                    style={{ backgroundColor: `rgb(243, 153, 77)` }}
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
