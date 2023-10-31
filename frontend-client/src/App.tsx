import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logo from "./assets/logo.png"
import AuthService from "./services/auth.service";
import IUser from "./types/user.type";
import LanguageSelector from "./components/LanguageSelector";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardManager from "./components/board-manager.component";
import BoardAdmin from "./components/board-admin.component";

import EventBus from "./common/EventBus";

type Props = {};

type State = {
  showManagerBoard: boolean;
  showAdminBoard: boolean;
  currentUser: IUser | undefined;
  isNightMode: boolean;
};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showManagerBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      isNightMode: false,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showManagerBoard: user.roles.includes("ROLE_MANAGER"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", this.logOut);
  }

  componentWillUnmount() {
    EventBus.remove("logout", this.logOut);
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showManagerBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  toggleNightMode = () => {
    this.setState((prevState) => ({
      isNightMode: !prevState.isNightMode,
    }));

    // Toggle night mode by adding/removing a CSS class
    const body = document.body;
    if (this.state.isNightMode) {
      body.classList.remove("night-mode");
      body.classList.add("day-mode");
    } else {
      body.classList.remove("day-mode");
      body.classList.add("night-mode");
    }
  };

  render() {
    const { currentUser, showManagerBoard, showAdminBoard, isNightMode } =
        this.state;

    return (
        <div className={`${isNightMode ? "night-mode" : "day-mode"}`}>
          <nav className={`navbar navbar-expand navbar-dark bg-dark ${isNightMode ? "night-mode" : ""}`}>
            <Link to={"/"} className="navbar-brand custom-navbar-brand">
              <img src={logo} alt="Logo" style={{ maxWidth: '100px' }}/>
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

              {showManagerBoard && (
                  <li className="nav-item">
                    <Link to={"/manager"} className="nav-link">
                      Manager Board
                    </Link>
                  </li>
              )}

              {showAdminBoard && (
                  <li className="nav-item">
                    <Link to={"/admin"} className="nav-link">
                      Admin Board
                    </Link>
                  </li>
              )}

              {currentUser && (
                  <li className="nav-item">
                    <Link to={"/user"} className="nav-link">
                      User
                    </Link>
                  </li>
              )}
            </div>

            {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/profile"} className="nav-link">
                      {currentUser.username}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={this.logOut}>
                      LogOut
                    </a>
                  </li>
                  <LanguageSelector />
                  <div
                      className="night-toggle"
                      onClick={this.toggleNightMode}
                  >
                    <div
                        id="moon"
                        className={`moon ${isNightMode ? "sun" : ""}`}
                    ></div>
                  </div>
                </div>
            ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                      Sign Up
                    </Link>
                  </li>
                  <LanguageSelector />
                  <div
                      className="night-toggle"
                      onClick={this.toggleNightMode}
                  >
                    <div
                        id="moon"
                        className={`moon ${isNightMode ? "sun" : ""}`}
                    ></div>
                  </div>
                </div>
            )}
          </nav>

          <div className="container mt-3">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/user" element={<BoardUser />} />
              <Route path="/manager" element={<BoardManager />} />
              <Route path="/admin" element={<BoardAdmin />} />
            </Routes>
          </div>
        </div>
    );
  }
}

export default App;
