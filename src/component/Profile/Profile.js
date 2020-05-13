import React from "react";
import "./Profile.css";
import imageUser from "../image/user-img.jpg";
import { FaImage, FaUser, FaPhone, FaLine } from "react-icons/fa";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from "reactstrap";
import { MdMailOutline } from "react-icons/md";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class Profile extends React.Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = {
      imagerProfile: null,
      imagePreview: user.image ? user.image : imageUser,
      formInputs: {
        email: user.email,
        phone: user.phone,
        first_name: user.first_name,
        last_name: user.last_name,
        line: user.line
      },
      invalid: {
        invalidEmail: false,
        invalidPhone: false,
        invalidFirst_name: false,
        invalidLast_name: false,
        invalidLine: false
      }
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.SaveSubmit = this.SaveSubmit.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  SaveSubmit(event) {
    event.preventDefault();
    console.log(this.state.imagePreview);
    //TODO - save > this.state.imagePreview_Url in you DB using your API logic.
  }

  dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  // handleImageChange(event) {
  //   event.preventDefault();
  //   let render = new FileReader();
  //   let fileImagerProfile = event.target.files[0];

  //   render.onload = () => {
  //     this.setState({
  //       imagerProfile: fileImagerProfile,
  //       imagePreview: render.result
  //     });
  //   };
  //   console.log(this.state);
  //   render.readAsDataURL(fileImagerProfile);
  // }

  handleImageChange = e => {
    e.preventDefault();
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement("img");
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        const MAX_WIDTH = 150;
        const MAX_HEIGHT = 150;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        const dataurl = canvas.toDataURL("image/png");
        this.props.UpdateProfileImage(
          this.dataURLtoFile(dataurl, "imageProfile.png")
        );
      };
      img.src = e.target.result;
      this.setState({
        imagerProfile: file,
        imagePreview: e.target.result
      });
    };
    if (file) reader.readAsDataURL(file);
  };

  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value.trim();

    this.setState({
      formInputs: {
        ...this.state.formInputs,
        [name]: value
      }
    });
  };

  componentDidUpdate(nextProps) {
    const { err_update } = this.props;
    if (nextProps.err_update !== err_update) {
      if (err_update.response.data.email) {
        this.setState({
          invalid: { invalidEmail: true }
        });
      }
    }
  }

  validation = () => {
    let isError = false;
    const { invalid, formInputs } = this.state;

    invalid.invalidFirst_name = formInputs.first_name <= 1 ? true : false;
    invalid.invalidLast_name = formInputs.last_name <= 1 ? true : false;
    invalid.invalidEmail = !emailRegex.test(formInputs.email) ? true : false;
    invalid.invalidPhone =
      formInputs.phone.toString().length !== 10 ? true : false;
    invalid.invalidLine = formInputs.line <= 2 ? true : false;

    if (
      invalid.invalidFirst_name ||
      invalid.invalidLast_name ||
      invalid.invalidEmail ||
      invalid.invalidPhone ||
      invalid.invalidLine
    )
      isError = true;

    this.setState({
      invalid: {
        ...this.state.invalid
      }
    });
    return isError;
  };

  handleProfileImage = data => {
    console.log("data", data);
    // this.props.UpdateProfileImage(data)
  };

  handleSubmit = event => {
    event.preventDefault();
    const { formInputs } = this.state;
    const err = this.validation();

    if (!err) this.props.submit(formInputs);
  };

  render() {
    const { formInputs } = this.state;
    const { user } = this.props;
    return (
      <Container>
        <div>
          <Row className="pt-3 pb-3 border border-radius from-profile">
            <Col md="12" className="mt-3">
              <h2 style={{ color: "#17A2B8" }}>
                <FaUser className="mr-3" style={{ color: "#17A2B8" }} />
                ข้อมูลส่วนตัว
              </h2>
            </Col>

            <Col xs="12" md="6" className="mt-3">
              <Row>
                <Col md="12">
                  <FormGroup>
                    <div className="image-profile m-auto">
                      <div className="input-image-profile">
                        <Label
                          for="file-input"
                          className="rounded-circle border border-secondary icon-input-file"
                        >
                          <h5 className="mt-1">
                            <FaImage />
                          </h5>
                        </Label>
                        <Input
                          type="file"
                          name="file"
                          id="file-input"
                          accept=".png, .jpg, .jpeg"
                          onChange={this.handleImageChange}
                        />
                      </div>
                      <Label for="file-input">
                        <img src={this.state.imagePreview} />
                      </Label>
                    </div>
                    {/* <Label for="Email">ชื่อผู้ใช้ / อีเมล</Label> */}
                  </FormGroup>
                </Col>
                <Col md="12" md={{ size: "6", offset: "3" }}>
                  <a href="/member/changepassword">
                    <Button
                      type="button"
                      size="md"
                      block
                      color="info"
                      className="rounded-pill"
                    >
                      แก้ไขรหัสผ่าน
                    </Button>
                  </a>
                </Col>
              </Row>
            </Col>

            <Col xs="12" md="6" className="mt-3">
              <Form onSubmit={this.handleSubmit}>
                <Label for="user">สมาชิกหมายเลข {user.id}</Label>
                <FormGroup>
                  <Input
                    className="rounded-pill"
                    type="text"
                    name="first_name"
                    id="first_name"
                    ref="first_name"
                    placeholder="ชื่อ *"
                    value={formInputs.first_name}
                    onChange={this.changeHandler}
                    invalid={this.state.invalid.invalidFirst_name}
                  />
                  <FormFeedback className="text-center">
                    กรุณากรอก ชื่อ *
                  </FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Input
                    className="rounded-pill"
                    type="last_name"
                    name="last_name"
                    id="last_name"
                    placeholder="นามสกุล *"
                    value={formInputs.last_name}
                    onChange={this.changeHandler}
                    invalid={this.state.invalid.invalidLast_name}
                  />
                  <FormFeedback className="text-center">
                    กรุณากรอก นามสกุล *
                  </FormFeedback>
                </FormGroup>

                <FormGroup className="data-user">
                  <h3>
                    <FaLine className="mr-2" style={{ color: "#01B401" }} />
                  </h3>
                  <Input
                    className="rounded-pill"
                    type="text"
                    name="line"
                    id="line"
                    placeholder="Line"
                    value={formInputs.line}
                    onChange={this.changeHandler}
                    invalid={this.state.invalid.invalidLine}
                  />
                  <FormFeedback className="text-center">
                    กรุณากรอก ID Line
                  </FormFeedback>
                </FormGroup>

                <FormGroup className="data-user">
                  <h3>
                    <FaPhone className="mr-2" style={{ color: "#6495ED" }} />
                  </h3>
                  {/* <Label for="Password">รหัสผ่าน</Label> */}
                  <Input
                    className="rounded-pill"
                    type="number"
                    name="phone"
                    id="phone"
                    placeholder="เบอร์โทร 10 ตัวอักษร *"
                    value={formInputs.phone}
                    onChange={this.changeHandler}
                    invalid={this.state.invalid.invalidPhone}
                  />
                  <FormFeedback className="text-center">
                    กรุณากรอกเบอรฺ์โทรให้ครบ 10 ตัวอักษร
                  </FormFeedback>
                </FormGroup>

                <FormGroup className="data-user">
                  <h3>
                    <MdMailOutline
                      className="mr-2"
                      style={{ color: "#E44D42" }}
                    />
                  </h3>
                  <Input
                    className="rounded-pill"
                    type="text"
                    name="email"
                    id="email"
                    placeholder="อีเมล"
                    value={formInputs.email}
                    onChange={this.changeHandler}
                    invalid={this.state.invalid.invalidEmail}
                  />
                  <FormFeedback className="text-center">
                    อีเมลไม่ถูกต้อง หรือ อีเมลถูกใช้แล้ว
                  </FormFeedback>
                </FormGroup>
                <Row>
                  <Col sm="12" md={{ size: "6", offset: "3" }}>
                    <Button
                      className="rounded-pill"
                      type="submit"
                      size="md"
                      block
                      color="success"
                    >
                      แก้ไขข้อมูล
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

export default Profile;
