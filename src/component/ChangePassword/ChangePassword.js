import React from "react";
import "./ChangePassword.css";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  FormFeedback,
} from "reactstrap";

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formInputs: {
        password: "",
        new_password: "",
        Cnew_password: "",
      },
      formErrors: {
        password: "",
        new_password: "",
        Cnew_password: "",
      },
      invalid: {
        invalidPassword: false,
        invalidNew_password: false,
        invalidCnew_password: false,
      },
      valid: {
        validPassword: false,
        validNew_password: false,
        validCnew_password: false,
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const { formInputs, invalid, valid, formErrors } = this.state;

    switch (name) {
      case "new_password":
        invalid.invalidNew_password = value.length < 8 ? true : false;
        valid.validNew_password = value.length >= 8 ? true : false;
      case "Cnew_password":
        invalid.invalidCnew_password =
          value !== formInputs.new_password ? true : false;
        valid.validCnew_password =
          value === formInputs.new_password ? true : false;
      default:
        break;
    }

    this.setState({
      formInputs: {
        ...this.state.formInputs,
        [name]: value,
      },
    });
  };

  componentDidUpdate(prevProps) {
    const { err } = this.props;
    if (prevProps.err !== err) {
      // console.log("err", err.response.status);
      if (err) {
        this.setState({
          ...this.state,
          formInputs: {
            ...this.state.formInputs,
            password: "",
          },
          invalid: {
            ...this.state.invalid,
            invalidPassword: true,
          },
        });
      }
    }
  }

  handlerDisabled = () => {
    const { valid } = this.state;
    if (valid.validNew_password && valid.validCnew_password) {
      return false;
    }
    return true;
  };

  handleSubmit(event) {
    event.preventDefault();
    this.props.submit(this.state.formInputs);
  }

  render() {
    const { password, new_password, Cnew_password } = this.state.formInputs;
    const {
      invalidPassword,
      invalidNew_password,
      invalidCnew_password,
    } = this.state.invalid;
    const {
      validPassword,
      validNew_password,
      validCnew_password,
    } = this.state.valid;
    return (
      <div>
        <Container className="mt-3">
          <Row>
            <Col
              sm="12"
              md={{ size: "6", offset: "3" }}
              className="border border-radius pt-4 pb-2"
            >
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="password" className="pl-2">
                    รหัสผ่าน
                  </Label>
                  <Input
                    className="rounded-pill"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="รหัสผ่าน"
                    value={password}
                    onChange={this.changeHandler}
                    valid={validPassword}
                    invalid={invalidPassword}
                  />
                  <FormFeedback className="text-center">
                    รหัสผ่านไม่ถูกต้อง *
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="new_password" className="pl-2">
                    รหัสผ่านใหม่
                  </Label>
                  <Input
                    className="rounded-pill"
                    type="password"
                    name="new_password"
                    id="new_password"
                    placeholder="รหัสผ่านอย่างน้อย 8 ตัวอักษร *"
                    value={new_password.value}
                    onChange={this.changeHandler}
                    valid={validNew_password}
                    invalid={invalidNew_password}
                  />
                  <FormFeedback className="text-center">
                    กรุณาใส่ รหัสผ่านอย่างน้อย 8 ตัวอักษร *
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="Cnew_password" className="pl-2">
                    ยืนยันรหัสผ่านใหม่
                  </Label>
                  <Input
                    className="rounded-pill"
                    type="password"
                    name="Cnew_password"
                    id="Cnew_password"
                    placeholder="ยืนยันรหัสผ่านใหม่"
                    value={Cnew_password.value}
                    onChange={this.changeHandler}
                    valid={validCnew_password}
                    invalid={invalidCnew_password}
                  />
                  <FormFeedback className="text-center">
                    รหัสไม่ตรงกัน *
                  </FormFeedback>
                </FormGroup>
                <Row className="btn-chpass">
                  <Col sm="12" md="4" className="p-2">
                    <Button
                      className="rounded-pill"
                      type="submit"
                      size="lg"
                      block
                      color="success"
                      disabled={this.handlerDisabled()}
                    >
                      ยืนยัน
                    </Button>
                  </Col>
                  <Col sm="12" md="4" className="p-2">
                    <a href="/profile">
                      <Button
                        type="button"
                        className="rounded-pill"
                        size="lg"
                        block
                        color="danger"
                      >
                        ยกเลิก
                      </Button>
                    </a>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default ChangePassword;
