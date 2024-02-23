import React, { Component } from "react";

import UserService from "../services/user.service";

import { Image } from "react-bootstrap";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron" style={{backgroundColor:'#3DED97',fontStyle:'revert'}}>
          <h3 style={{textAlign:'center',fontSize:40}}>Üdvözöllek a Gamers Fanatic oldalán!</h3>
          
        </header>
        <Image src='http://localhost:8080/logo.png'  style={{ marginTop:75,width: 250, height: 325, borderRadius: 40,marginLeft:"40%"}} />
      </div>
    );
  }
}
