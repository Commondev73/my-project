import React, { Fragment } from "react";
import Search from "../Search/Search";
import "./Header.css";
import logo from '../image/logoPage.png'
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
                    src={logo}
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
