import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";

import { Nav, Navbar, NavDropdown } from "react-bootstrap";

import Admin from './sajatosztalyok/Admin'
import Kereses from "./sajatosztalyok/Kereses"
import Proba from './sajatosztalyok/Proba'
import ProbaAdmin from './sajatosztalyok/ProbaAdmin'
import Comment from './sajatosztalyok/Comment'
import Diagram_film from './sajatosztalyok/Diagram_film'
import Torles_jatekok from './sajatosztalyok/Torles_jatekok'
import Torles_comment from './sajatosztalyok/Torles_comment'
import PcAlkatreszek from './sajatosztalyok/PcAlkatreszek'
import Torles_Pcalkatresz from './sajatosztalyok/Torles_alkatreszek'
import Diagram_atlag from './sajatosztalyok/Diagram_atlag'


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="secondary" variant="light">
          <Navbar.Brand as={Link} to="/">
            Záródoga
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {/* <Nav.Link as={Link} to="/Kereses">Keresés</Nav.Link> */}
              <Nav.Link as={Link} to="/Proba">Játékok</Nav.Link>
              <Nav.Link as={Link} to="/Comment">Comment</Nav.Link>
              {/* {showModeratorBoard && <Nav.Link as={Link} to="/mod">Moderator</Nav.Link>} */}
              {!showAdminBoard && <Nav.Link as={Link} to="/PcAlkatreszek">Pc Alkatrészek</Nav.Link>}
              {/* {showAdminBoard && <Nav.Link as={Link} to="/Torles_jatekok">Játékok Törlése</Nav.Link>}
              {showAdminBoard && <Nav.Link as={Link} to="/Torles_comment">Comment Törlése</Nav.Link>} */}
              {/* {showAdminBoard && <Nav.Link as={Link} to="/Admin">Admin</Nav.Link>} */}
              {/* {showAdminBoard && <Nav.Link as={Link} to="/ProbaAdmin">Admin Próba</Nav.Link>} */}
              {showAdminBoard && <Nav.Link as={Link} to="/Diagram_film">Játékok Diagram</Nav.Link>}
              {showAdminBoard && <Nav.Link as={Link} to="/Diagram_atlag">Átlag Diagram</Nav.Link>}
              {/* {currentUser && <Nav.Link as={Link} to="/user">User</Nav.Link>} */}
              {showAdminBoard && (
                <NavDropdown title="Törlés" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/Torles_Pcalkatresz">Pc alkatrész törlés</NavDropdown.Item>
                  <NavDropdown.Item href="/Torles_jatekok">
                    Játékok törlés
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/Torles_comment">Comment törlés</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              )}

            </Nav>

            <Nav>
              {currentUser ? (
                <React.Fragment>
                  <Nav.Link as={Link} to="/profile">{currentUser.username}</Nav.Link>
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={this.logOut}>
                      LogOut
                    </a>
                  </li>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register">Sign Up</Nav.Link>
                </React.Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/Admin" component={Admin} />

            <Route path="/Kereses" component={Kereses} />
            <Route path="/Proba" component={Proba} />
            <Route path="/ProbaAdmin" component={ProbaAdmin} />
            <Route path="/Comment" component={Comment} />
            <Route path="/Diagram_film" component={Diagram_film} />
            <Route path="/Diagram_atlag" component={Diagram_atlag} />
            <Route path="/Torles_jatekok" component={Torles_jatekok} />
            <Route path="/Torles_comment" component={Torles_comment} />
            <Route path="/PcAlkatreszek" component={PcAlkatreszek} />
            <Route path="/Torles_Pcalkatresz" component={Torles_Pcalkatresz} />


          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
