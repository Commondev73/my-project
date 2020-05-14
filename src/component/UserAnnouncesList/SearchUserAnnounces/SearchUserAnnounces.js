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
  DropdownItem
} from "reactstrap";
import { FaSearch } from "react-icons/fa";

class SearchUserAnnounces extends React.Component {
  render() {
    return (
      <Container className="mb-3">
        <Row>
          <Col md="4" xs="12" className="mb-2 pl-0 pr-1">
            <Input
              className="rounded-pill border border-secondary"
              type="text"
              name="SearchUserAnnounces"
              id="SearchUserAnnounces"
              placeholder="ค้นหาทำเล / ชื่อโครงการ "
            />
          </Col>
          <Col md="2" xs="6" className="mb-2 p-0">
            <ButtonDropdown
            // isOpen={this.state.DropdownAnnounce}
            // toggle={this.toggleAnnounce}
            >
              <DropdownToggle
                caret
                color="outline-info"
                className="rounded-pill"
              >
                เลือกหมวด
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>ทั้งหมด</DropdownItem>
                <DropdownItem>บ้าน</DropdownItem>
                <DropdownItem>คอนโด</DropdownItem>
                <DropdownItem>ที่ดิน</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </Col>
          <Col md="2" xs="6" className="pl-1 pr-1">
            <ButtonDropdown
            // isOpen={this.state.DropdownAnnounce}
            // toggle={this.toggleAnnounce}
            >
              <DropdownToggle
                caret
                color="outline-info"
                className="rounded-pill"
              >
                ประกาศ
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>ทั้งหมด</DropdownItem>
                <DropdownItem>บ้าน</DropdownItem>
                <DropdownItem>คอนโด</DropdownItem>
                <DropdownItem>ที่ดิน</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </Col>
          <Col md="2" xs="6" className="mb-2 p-0">
            <ButtonDropdown
            // isOpen={this.state.DropdownAnnounce}
            // toggle={this.toggleAnnounce}
            >
              <DropdownToggle
                caret
                color="outline-info"
                className="rounded-pill"
              >
                เงื่อนไข
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>ทั้งหมด</DropdownItem>
                <DropdownItem>บ้าน</DropdownItem>
                <DropdownItem>คอนโด</DropdownItem>
                <DropdownItem>ที่ดิน</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </Col>
          <Col md="2" xs="6" className="pl-1 pr-0">
            <Button block className="rounded-pill border-white">
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
