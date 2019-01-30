import React, { Component } from "react";
import { Container, Row, Col, Jumbotron } from "react-bootstrap";
import Search from "./Search";
import Map from "./Map";
import CrimeTable from "./CrimeTable";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { crimes: [], area: "leicestershire", date: "2017-02" };
  }

  fetchCrimes() {
    fetch(
      "https://data.police.uk/api/crimes-no-location?category=all-crime&force=" +
        this.state.area +
        "&date=" +
        this.state.date
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        this.setState({ crimes: json });
      })
      .catch(error => console.error("Error:", error));
  }

  componentDidMount() {
    this.fetchCrimes();
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Jumbotron fluid>
              <h1>UK Crime Locations</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col>
            <Search />
          </Col>
        </Row>
        <Row>
          <Col>
            <CrimeTable />
          </Col>
        </Row>
        <Row>
          <Col>
            <Map crimes={this.state.crimes} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
