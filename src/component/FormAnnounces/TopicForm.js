import React from "react";
import Select from "react-select";
import "./TopicForm.css";
import {
  Container,
  CustomInput,
  Row,
  Col,
  Label,
  Input,
  FormGroup,
  Button,
} from "reactstrap";
import { FaArrowCircleRight } from "react-icons/fa";
class TopicForm extends React.Component {
  Continue = () => {
    // event.preventDefault();
    this.props.nextStep();
  };

  nextStep = () => {
    const { values } = this.props;
    if (
      values.announceType &&
      values.announceStatus &&
      values.propertyType &&
      values.province &&
      values.amphoe &&
      values.district &&
      values.topic &&
      values.detail
    ) {
      return false;
    }
    return true;
  };

  render() {
    const {
      values,
      changeHandler,
      handlerSelectedOption,
      handlerSelectedOptionAmphoe,
      handlerSelectedOptionProvince,
      province_isLoading,
      province,
      amphoe_isLoading,
      amphoe,
      district_isLoading,
      district,
    } = this.props;

    const propertyType = [
      { value: "บ้าน", label: "บ้าน" },
      { value: "คอนโด", label: "คอนโด" },
    ];

    return (
      <div>
        <Container>
          <Row>
            <Col md={{ size: "8", offset: "2" }} className="text-center ">
              <h5 className="mt-2 pb-3">สถานะผู้ประกาศ</h5>
              <div className="radio pb-3">
                <CustomInput
                  type="radio"
                  id="announceStatus"
                  name="announceStatus"
                  label="เจ้าของ"
                  value="เจ้าของ"
                  checked={values.announceStatus === "เจ้าของ" ? true : false}
                  onChange={changeHandler("announceStatus")}
                />
                <CustomInput
                  type="radio"
                  id="announceStatus2"
                  name="announceStatus"
                  label="ตัวแทน"
                  value="ตัวแทน"
                  checked={values.announceStatus === "ตัวแทน" ? true : false}
                  onChange={changeHandler("announceStatus")}
                />
              </div>
            </Col>
            <Col md={{ size: "4", offset: "4" }} className="text-center">
              <h5 className="mt-2 pb-3">ประเภทประกาศ</h5>
              <div className="radio pb-3">
                <CustomInput
                  type="radio"
                  id="announceType"
                  name="announceType"
                  label="ขาย"
                  value="ขาย"
                  checked={values.announceType === "ขาย" ? true : false}
                  onChange={changeHandler("announceType")}
                />
                <CustomInput
                  type="radio"
                  id="announceType2"
                  name="announceType"
                  label="เช่า"
                  value="เช่า"
                  checked={values.announceType === "เช่า" ? true : false}
                  onChange={changeHandler("announceType")}
                />
              </div>
            </Col>
            <Col
              xs="12"
              md={{ size: "8", offset: "2" }}
              className="text-center"
            >
              <h5 className="mt-2 pb-2">ประเภทอสังหาริมทรัพย์</h5>
              <Select
                placeholder={"ประเภทอสังหาริมทรัพย์"}
                options={propertyType}
                value={values.propertyType}
                onChange={handlerSelectedOption("propertyType")}
              />
            </Col>
            <Col md={{ size: "8", offset: "2" }} className="text-center">
              <h5 className="mt-4 pb-3">ที่ตั้งทรัพย์สิน</h5>
              <Row>
                <Col xs="12" md="4">
                  <Label>จังหวัด</Label>
                  <Select
                    isLoading={province_isLoading}
                    placeholder={"จังหวัด"}
                    options={
                      province &&
                      province.map((province) => {
                        return {
                          label: province.province,
                          value: province.province_code,
                        };
                      })
                    }
                    value={values.province}
                    onChange={handlerSelectedOptionProvince}
                  />
                </Col>
                <Col xs="12" md="4">
                  <Label>อำเภอ</Label>
                  <Select
                    isLoading={amphoe_isLoading}
                    placeholder={"อำเภอ"}
                    options={
                      amphoe &&
                      amphoe.map((amphoe) => {
                        return {
                          label: amphoe.amphoe,
                          value: amphoe.amphoe_code,
                        };
                      })
                    }
                    value={values.amphoe}
                    onChange={handlerSelectedOptionAmphoe}
                  />
                </Col>
                <Col xs="12" md="4">
                  <Label>ตำบล</Label>
                  <Select
                    isLoading={district_isLoading}
                    placeholder={"ตำบล"}
                    options={
                      district &&
                      district.map((district) => {
                        return {
                          label: district.district,
                          value: district.district_code,
                        };
                      })
                    }
                    value={values.district}
                    onChange={handlerSelectedOption("district")}
                  />
                </Col>
              </Row>
            </Col>
            <Col md={{ size: "8", offset: "2" }} className="mt-4">
              <FormGroup>
                <h5 className="mt-2 pb-2">หัวข้อ</h5>
                <Input
                  type="text"
                  name="topic"
                  id="topic"
                  max="220"
                  placeholder="หัวข้อ"
                  value={values.topic}
                  onChange={changeHandler("topic")}
                />
              </FormGroup>
              <FormGroup>
                <h5 className="mt-2 pb-2">รายละเอียด</h5>
                <Input
                  type="textarea"
                  name="detail"
                  id="detail"
                  style={{ width: "100%", height: "250px" }}
                  value={values.detail}
                  onChange={changeHandler("detail")}
                  cols={40}
                  rows={10}
                />
              </FormGroup>
            </Col>
            <Col md={{ size: "4", offset: "4" }} sm={{ size: "8", offset: "2" }} xs="12">
              <Button
                block
                color="info"
                className="rounded-pill"
                onClick={this.Continue}
                disabled={this.nextStep()}
              >
                ถัดไป
                <FaArrowCircleRight className="ml-1 pb-1" size="23" />
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default TopicForm;
