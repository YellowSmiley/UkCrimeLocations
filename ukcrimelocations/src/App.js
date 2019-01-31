import React, { Component } from "react";
import { Container, Row, Col, Jumbotron } from "react-bootstrap";
import ForceSelector from "./ForceSelector";
import Map from "./Map";
import CrimeTable from "./CrimeTable";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crimes: [],
      date: "2017-02"
    };
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
  }

  fetchCrimes(location) {
    fetch(
      "https://data.police.uk/api/crimes-no-location?category=all-crime&force=" +
        location +
        "&date=" +
        this.state.date
    )
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({ crimes: json });
      })
      .catch(error => console.error("Error:", error));
  }

  handleChangeLocation(location) {
    this.fetchCrimes(location.value);
  }

  render() {
    return (
      <Container>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
          integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
          crossOrigin="anonymous"
        />
        <Row>
          <Col>
            <Jumbotron fluid>
              <h1>UK Crime Locations</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col>
            <ForceSelector handleChangeLocation={this.handleChangeLocation} />
          </Col>
        </Row>
        <Row>
          <br />
        </Row>
        <Row>
          <Col>
            <CrimeTable crimes={this.state.crimes} />
          </Col>
        </Row>
        <Row>
          <Col>{/* <Map crimes={this.state.crimes} /> */}</Col>
        </Row>
      </Container>
    );
  }
}

export default App;
