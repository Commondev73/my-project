import React from "react";
import "./login.css";
import {
  Button,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import { FaUserAlt } from "react-icons/fa";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formInputs: {
        email: "",
        password: "",
      },
      invalid: {
        invalidEmail: false,
        invalidPassword: false,
      },
    };
  }

  componentDidUpdate(nextProps) {
    const { err } = this.props;
    if (nextProps.err !== err) {
      if (err) {
        this.setState({
          formInputs: {
            ...this.state.formInputs,
            password: "",
          },
        });
      }
    }
  }

  changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value.trim();

    this.setState({
      formInputs: {
        ...this.state.formInputs,
        [name]: value,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submit(this.state.formInputs);
  };

  render() {
    return (
      <div className="login-bg">
        <Container className="login">
          <Row>
            <Col
              sm="12"
              md={{ size: "4", offset: "4" }}
              className="border border-radius form-login"
            >
              <div className="icon-user m-auto">
                <FaUserAlt />
              </div>
              <Form className="border-bottom pb-3 mt-3">
                <FormGroup>
                  <Input
                    className="rounded-pill"
                    type="email"
                    name="email"
                    id="Email"
                    placeholder="ชื่อผู้ใช้ / อีเมล"
                    value={this.state.formInputs.email}
                    onChange={this.changeHandler}
                    invalid={this.props.err ? true : false}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    className="rounded-pill"
                    type="password"
                    name="password"
                    id="Password"
                    placeholder="รหัสผ่าน"
                    value={this.state.formInputs.password}
                    onChange={this.changeHandler}
                    invalid={this.props.err ? true : false}
                  />
                  <FormFeedback className="text-center">
                    อีเมล หรือ รหัสไม่ถูกต้อง *
                  </FormFeedback>
                </FormGroup>
                <Button
                  className="rounded-pill border-white"
                  size="lg"
                  block
                  color="success"
                  onClick={this.handleSubmit}
                >
                  เข้าสู่ระบบ
                </Button>
                {/* <Button
                  className="rounded-pill mt-3"
                  size="lg"
                  block
                  color="primary"
                >
                  เข้าสู่ระบบด้วยเฟสบุ๊ค
                </Button> */}
                <Button
                  className="rounded-pill mt-2"
                  size="lg"
                  block
                  color="outline-info"
                  onClick={() => (window.location.href = "/register")}
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

export default Login;
