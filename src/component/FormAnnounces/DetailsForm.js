import React from "react";
import "./DetailsForm.css";
import { Container, Row, Col, Input, Button } from "reactstrap";
import {
  FaTrashAlt,
  FaArrowCircleLeft,
  FaArrowCircleRight,
} from "react-icons/fa";

class DetailsForm extends React.Component {
  constructor(props) {
    super(props);
    this.onFileLoad = this.onFileLoad.bind(this);
  }

  DragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

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

  onFileLoad = (e) => {
    let fileImg = e.target.files;
    for (let i = 0; i < fileImg.length; i++) {
      const name = fileImg[i].name;
      const size = (fileImg[i].size / 1048576).toFixed(2);
      const type = fileImg[i].type;
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        //Resize - image
        if (size > 2) {
          const img = document.createElement("img");
          img.onload = () => {
            const canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            const MAX_WIDTH = 720;
            const MAX_HEIGHT = 480;
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
            const dataurl = canvas.toDataURL(type);
            const Newfile = this.dataURLtoFile(dataurl, `image${i}.png`);
            const file = {
              File: Newfile,
              imageData: {
                name: Newfile.name,
                data: fileReader.result,
                size: Newfile.size,
                isUploading: false,
              },
            };
            this.props.addLoadedFile(file);
          };
          img.src = e.target.result;
        } else {
          const file = {
            File: fileImg[i],
            imageData: {
              name: name,
              data: fileReader.result,
              size: size,
              isUploading: false,
            },
          };
          this.props.addLoadedFile(file);
        }
      };
      fileReader.onabort = () => {
        alert("");
      };
      fileReader.onerror = () => {
        alert("");
      };
      fileReader.readAsDataURL(fileImg[i]);
    }
  };

  onUpload() {
    this.state.loadedFiles.map((file, idx) => {
      let newFile = this.updateLoadedFile(file, { ...file, isUploading: true });
      setTimeout(() => {
        this.updateLoadedFile(newFile, { ...newFile, isUploading: false });
      }, 3000);
    });
  }

  Continue = () => {
    this.props.nextStep();
  };

  Back = () => {
    this.props.prevStep();
  };

  nextStep = () => {
    const { values } = this.props;
    if (
      values.bedroom &&
      values.toilet &&
      values.floor &&
      values.area &&
      values.price &&
      values.amphoe &&
      values.image.imageData.length > 0
    ) {
      return false;
    }
    return true;
  };
  render() {
    const { values, changeHandler } = this.props;
    return (
      <div>
        <Container>
          <Row>
            <Col
              xs="12"
              md={{ size: "8", offset: "2" }}
              className="text-center mt-4"
            >
              <Row>
                <Col xs="12" md="4">
                  <h5>ชั้น</h5>
                  <Input
                    type="number"
                    min="0"
                    name="floor"
                    id="floor"
                    placeholder="ชั้น"
                    value={values.floor}
                    onChange={changeHandler("floor")}
                  />
                </Col>
                <Col xs="12" md="4" className="mt-1 mb-1">
                  <h5>ห้องนอน</h5>
                  <Input
                    type="number"
                    min="0"
                    name="bedroom"
                    id="bedroom"
                    placeholder="ห้องนอน"
                    value={values.bedroom}
                    onChange={changeHandler("bedroom")}
                  />
                </Col>
                <Col xs="12" md="4">
                  <h5>ห้องน้ำ</h5>
                  <Input
                    type="number"
                    min="0"
                    name="toilet"
                    id="toilet"
                    placeholder="ห้องน้ำ"
                    value={values.toilet}
                    onChange={changeHandler("toilet")}
                  />
                </Col>
              </Row>
            </Col>
            <Col
              xs="12"
              md={{ size: "8", offset: "2" }}
              className="text-center"
            >
              <Row>
                <Col md="6">
                  <h5>ราคา</h5>
                  <Input
                    type="number"
                    min="0"
                    name="price"
                    id="price"
                    placeholder="ราคา"
                    value={values.price}
                    onChange={changeHandler("price")}
                  />
                </Col>
                <Col md="6" className="mt-1">
                  <h5>
                    ขนาดพื้นที่{" "}
                    {values.propertyType.value === "บ้าน" ? "ตร.ว." : "ตร.ม."}
                  </h5>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    name="area"
                    id="area"
                    placeholder="ขนาดพื้นที่"
                    value={values.area}
                    onChange={changeHandler("area")}
                  />
                </Col>
              </Row>
            </Col>
            <Col md={{ size: "8", offset: "2" }}>
              <div
                className="inner-container"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div className="sub-header">
                  <h5 className="mt-3">เพิ่มรูปภาพ</h5>
                </div>
                <div className="draggable-container">
                  <input
                    type="file"
                    id="file-browser-input"
                    name="file-browser-input"
                    ref={(input) => (this.fileInput = input)}
                    onDragOver={this.DragOver}
                    onDrag={this.onFileLoad}
                    onChange={this.onFileLoad}
                    multiple
                  />
                  <div className="files-preview-container">
                    {values.image.imageData.map((file, idx) => {
                      return (
                        <div className="file" key={idx}>
                          <h5 style={{ display: "inline" }}>
                            <div
                              className="remove-btn"
                              onClick={() => this.props.removeLoadedFile(file)}
                            >
                              <FaTrashAlt />
                            </div>
                          </h5>
                          <img src={file.data} />
                          {/* <Container>
                            <span className="progress-bar">
                              {file.isUploading}
                            </span>
                          </Container> */}
                        </div>
                      );
                    })}
                  </div>
                  <div className="helper-text">
                    คลิก หรือ ลากรูปภาพวางที่นี้
                  </div>
                  <div className="file-browser-container">
                    <Button
                      className="rounded-pill"
                      color="info"
                      onClick={() => this.fileInput.click()}
                    >
                      เลือกรูปภาพ
                    </Button>
                    <Button
                      className="rounded-pill"
                      color="danger"
                      onClick={() => this.props.removeAllLoadedFile()}
                    >
                      ลบรูปทั้งหมด
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs="12">
              <Row className="btn-step mt-3">
                <Col md={{ size: "2" }} className="mb-3">
                  <Button
                    block
                    color="danger"
                    className="rounded-pill"
                    onClick={this.Back}
                  >
                    <FaArrowCircleLeft className="mr-1 pb-1" size="23" />
                    ย้อนกลับ
                  </Button>
                </Col>
                <Col md={{ size: "2" }}>
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
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default DetailsForm;
