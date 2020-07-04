import React, { Fragment } from "react";
import Search from "../Search/Search";
import "./Header.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  Container,
} from "reactstrap";
import { connect } from "react-redux";
import { logout } from "../../actions";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isOpen2: false,
      redirect: false,
    };

    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  NavbarTogglerSpan = (data) => {
    const { user, isAuthenticated } = this.props
    const NoAuth = {
      backgroundImage: 'url(https://www.livinginsider.com/assets18/images/xno-user.png.pagespeed.ic.7d6lssbtJ3.webp)'
    };
    const Auth = {
      backgroundImage: `url(${user.image})`,
      backgroundSize: 'cover'
    }
    const Style = isAuthenticated ? Auth : NoAuth;
    return Style
  }

  toggle2() {
    this.setState({
      isOpen2: !this.state.isOpen2,
    });
  }

  handleLogout = () => {
    this.props.logout();
  };
  render() {
    const { user, isAuthenticated, redirect } = this.props;
    if (redirect) window.location.href = "/";
    return (
      <header className="fixed-top">
        <div className="menu">
          <Navbar className="" light expand="md">
            <Container>
              {/* Brandname */}
              {/* <NavbarBrand href="/">Demo</NavbarBrand> */}
              {/* Add toggler to auto-collapse */}
              <NavbarToggler onClick={this.toggle} className="border-0" />

              <NavbarBrand className="font-menu text-light" href="/">
                {/* <img className="logo" src={logo} alt="" /> */}
                <div className="logo">
                  <img
                    src="data:image/webp;base64,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"
                    alt=""
                  />
                </div>
              </NavbarBrand>

              <NavbarToggler onClick={this.toggle2} className="user border-0">
                <span className="navbar-toggler-icon rounded-circle" style={this.NavbarTogglerSpan()}></span>
              </NavbarToggler>

              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="main-menu" navbar>
                  <NavLink className="rounded-pill font-menu" href="/">
                    <span className="font-menu">หน้าแรก</span>
                  </NavLink>
                  <NavLink className="rounded-pill font-menu" href="/search/null/null/คอนโด/null/null/null/null/1">
                    <span className="font-menu">คอนโด</span>
                  </NavLink>
                  <NavLink className="rounded-pill font-menu" href="/search/null/null/บ้าน/null/null/null/null/1">
                    <span className="font-menu">บ้าน</span>
                  </NavLink>
                  {/* <NavLink className="rounded-pill font-menu" href="#">
                    <span className="font-menu">ที่ดิน</span>
                  </NavLink> */}
                </Nav>
              </Collapse>

              <Collapse isOpen={this.state.isOpen2} navbar>
                <Nav className="ml-auto" navbar>
                  {isAuthenticated && (
                    <Fragment>
                      {/* <div className="image-user">
                        <img
                          className="rounded mx-auto d-block"
                          src="https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                          class="rounded-circle"
                          alt="Cinque Terre"
                        />
                      </div> */}
                      <NavLink className="rounded-pill" href="/member/announces/online">
                        <span className="font-menu">หน้าสมาชิก</span>
                      </NavLink>
                      <NavLink
                        className="rounded-pill"
                        onClick={this.handleLogout}
                      >
                        <span className="font-menu">ออกจากระบบ</span>
                      </NavLink>
                    </Fragment>
                  )}
                  {!isAuthenticated && (
                    <Fragment>
                      <NavLink className="rounded-pill" href="/register">
                        <span className="font-menu">สมัครสมาชิก</span>
                      </NavLink>
                      <NavLink className="rounded-pill" href="/login">
                        <span className="font-menu">เข้าสู่ระบบ</span>
                      </NavLink>
                    </Fragment>
                  )}
                </Nav>
              </Collapse>
            </Container>
          </Navbar>
        </div>
        <Search match={this.props.match}/>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    err: state.logout.err,
    isLoading: state.logout.isLoading,
    redirect: state.logout.redirect,
  };
};

const mapDispatchToProps = {
  logout,
};

export default Header = connect(mapStateToProps, mapDispatchToProps)(Header);
