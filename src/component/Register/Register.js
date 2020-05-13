import React from "react";
import "./Register.css";
import {
  CustomInput,
  Button,
  Form,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
  FormFeedback
} from "reactstrap";
import axios from "axios";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class Register extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      formErrors: {
        email: "",
        phone: "",
        first_name: "",
        last_name: "",
        password: "",
        password_confirm: ""
      },
      invalid: {
        invalidEmail: false,
        invalidPhone: false,
        invalidFirst_name: false,
        invalidLast_name: false,
        invalidPassword: false,
        invalidConfirm_password: false
      },
      valid: {
        validEmail: false,
        validPhone: false,
        validFirst_name: false,
        validLast_name: false,
        validPassword: false,
        validConfirm_password: false
      },
      formInputs: {
        email: "",
        phone: "",
        first_name: "",
        last_name: "",
        password: "",
        password_confirm: ""
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }
  
  validEmail = async value => {
    try {
      const response = await axios.post("/api/validation-email", {
        email: value
      });
      // console.log(`😱 Axios request : ${response.data}`);
      return response.data;
    } catch (err) {
      // console.log(`😱 Axios request failed: ${err}`);
    }
  };

  changeHandler = async event => {
    const name = event.target.name;
    const value = event.target.value.trim();
    const { formInputs, invalid, valid, formErrors } = this.state;

    switch (name) {
      case "email":
        invalid.invalidEmail = !emailRegex.test(value) ? true : false;
        if (emailRegex.test(value)) {
          let validEmail = await this.validEmail(value);
          valid.validEmail = validEmail;
          invalid.invalidEmail = validEmail ? false : true;
        }
        break;
      case "phone":
        invalid.invalidPhone =
          value.length < 10 || value.length > 10 ? true : false;
        valid.validPhone = value.length == 10 ? true : false;
        break;
      case "first_name":
        invalid.invalidFirst_name = value.length <= 1 ? true : false;
        valid.validFirst_name = value.length >= 2 ? true : false;
        break;
      case "last_name":
        invalid.invalidLast_name = value.length <= 1 ? true : false;
        valid.validLast_name = value.length >= 2 ? true : false;
        break;
      case "password":
        invalid.invalidPassword = value.length < 8 ? true : false;
        valid.validPassword = value.length >= 8 ? true : false;
      case "password_confirm":
        invalid.invalidConfirm_password =
          value !== formInputs.password ? true : false;
        valid.validConfirm_password =
          value === formInputs.password ? true : false;
      default:
        break;
    }
    this.setState({
      formInputs: {
        ...this.state.formInputs,
        [name]: value
      }
    });
  };
  handleCheckClick = () => {
    this.setState({ checked: !this.state.checked });
  };

  ButtonSubmit = () => {
    const { checked, valid } = this.state;
    if (
      valid.validEmail &&
      valid.validPhone &&
      valid.validFirst_name &&
      valid.validLast_name &&
      valid.validPassword &&
      valid.validConfirm_password &&
      checked
    ) {
      return false;
    }
    return true;
  };

  handleSubmit(event) {
    event.preventDefault();
    this.props.submit(this.state.formInputs);
  }
  render() {
    return (
      <div className="register-bg">
        <Container className="register">
          <Row>
            <Col
              sm="12"
              md={{ size: "4", offset: "4" }}
              className="border border-radius"
            >
              <Form className="mt-3 mb-3" onSubmit={this.handleSubmit}>
                <FormGroup>
                  {/* <Label for="Email">ชื่อผู้ใช้ / อีเมล</Label> */}
                  <Input
                    className="rounded-pill"
                    type="email"
                    name="email"
                    id="email"
                    ref="email"
                    placeholder="อีเมล *"
                    value={this.state.formInputs.email.value}
                    onChange={this.changeHandler}
                    valid={this.state.valid.validEmail}
                    invalid={this.state.invalid.invalidEmail}
                  />
                  <FormFeedback className="text-center">อีเมลไม่ถูกต้อง หรือ อีเมลถูกใช้แล้ว</FormFeedback>
                </FormGroup>
                <FormGroup>
                  {/* <Label for="Password">รหัสผ่าน</Label> */}
                  <Input
                    className="rounded-pill"
                    type="text"
                    name="phone"
                    id="phone"
                    ref="phone"
                    placeholder="เบอร์โทร 10 ตัวอักษร *"
                    value={this.state.formInputs.phone.value}
                    onChange={this.changeHandler}
                    valid={this.state.valid.validPhone}
                    invalid={this.state.invalid.invalidPhone}
                  />
                  <FormFeedback className="text-center">กรุณากรอกเบอรฺ์โทรให้ครบ 10 ตัวอักษร</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Input
                    className="rounded-pill"
                    type="text"
                    name="first_name"
                    id="first_name"
                    ref="first_name"
                    placeholder="ชื่อ *"
                    value={this.state.formInputs.first_name.value}
                    onChange={this.changeHandler}
                    valid={this.state.valid.validFirst_name}
                    invalid={this.state.invalid.invalidFirst_name}
                  />
                   <FormFeedback className="text-center">กรุณากรอก ชื่อ *</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Input
                    className="rounded-pill"
                    type="last_name"
                    name="last_name"
                    id="last_name"
                    ref="last_name"
                    placeholder="นามสกุล *"
                    value={this.state.formInputs.last_name.value}
                    onChange={this.changeHandler}
                    valid={this.state.valid.validLast_name}
                    invalid={this.state.invalid.invalidLast_name}
                  />
                  <FormFeedback className="text-center">กรุณากรอก นามสกุล *</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Input
                    className="rounded-pill"
                    type="password"
                    name="password"
                    id="password"
                    ref="password"
                    placeholder="รหัสผ่านอย่างน้อย 8 ตัวอักษร *"
                    value={this.state.formInputs.password.value}
                    onChange={this.changeHandler}
                    valid={this.state.valid.validPassword}
                    invalid={this.state.invalid.invalidPassword}
                  />
                  <FormFeedback className="text-center">กรุณาใส่ รหัสผ่านอย่างน้อย 8 ตัวอักษร *</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Input
                    className="rounded-pill"
                    type="password"
                    name="password_confirm"
                    id="password_confirm"
                    ref="password_confirm"
                    placeholder="ยืนยันรหัสผ่าน *"
                    value={this.state.formInputs.password_confirm.value}
                    onChange={this.changeHandler}
                    valid={this.state.valid.validConfirm_password}
                    invalid={this.state.invalid.invalidConfirm_password}
                  />
                  <FormFeedback className="text-center">รหัสไม่ตรงกัน *</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <CustomInput
                    type="checkbox"
                    id="checkbox "
                    label="ยอมรับเงื่อนไขข้อตกลง"
                    onChange={this.handleCheckClick}
                    checked={this.state.checked}
                  />
                </FormGroup>
                <Button
                  className="rounded-pill"
                  size="lg"
                  block
                  color="success"
                  type="submit"
                  disabled={this.ButtonSubmit()}
                >
                  สมัครสมาชิก
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
