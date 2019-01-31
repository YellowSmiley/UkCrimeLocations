import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Jumbotron,
  FormControl,
  Button
} from "react-bootstrap";
import ForceSelector from "./ForceSelector";
import Map from "./Map";
import CrimeTable from "./CrimeTable";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crimes: [],
      location: "",
      date: "2017-02",
      loading: false
    };
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.fetchCrimes = this.fetchCrimes.bind(this);
  }

  fetchCrimes() {
    this.setState({ loading: true });
    fetch(
      "https://data.police.uk/api/crimes-no-location?category=all-crime&force=" +
        this.state.location +
        "&date=" +
        this.state.date
    )
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({ crimes: json, loading: false });
      })
      .catch(error => console.error("Error:", error));
  }

  handleChangeLocation(location) {
    this.setState({ location: location.value });
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
            <Jumbotron>
              <h1>UK Crime Locations</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col>
            <ForceSelector handleChangeLocation={this.handleChangeLocation} />
          </Col>
          <Col>
            <p>Select Month</p>
            <FormControl
              type="month"
              onChange={e => this.setState({ date: e.target.value })}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Button
              onClick={this.fetchCrimes}
              disabled={
                !this.state.location.length > 0 && !this.state.date.length > 0
              }
            >
              Search
            </Button>
          </Col>
        </Row>
        <hr />
        <Row style={!this.state.crimes.length > 0 ? { display: "none" } : null}>
          <Col>
            <CrimeTable
              crimes={this.state.crimes}
              loading={this.state.loading}
            />
          </Col>
        </Row>
        <Row style={!this.state.crimes.length > 0 ? { display: "none" } : null}>
          <Col>
            <Map crimes={this.state.crimes} />
          </Col>
        </Row>
        <Row style={this.state.crimes.length > 0 ? { display: "none" } : null}>
          <Col>
            <p>
              Please select a location and date above and a table and map will
              be displayed here.
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
