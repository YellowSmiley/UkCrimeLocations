import React, { Component } from "react";
import { Table } from "react-bootstrap";

class CrimeTable extends Component {
  render() {
    let crimes;
    if (this.props.crimes.length) {
      crimes = this.props.crimes.map((crime, i) => {
        return (
          <tr key={i}>
            <td>{crime.category}</td>
            <td>{crime.location}</td>
            <td>{crime.outcome_status.category}</td>
          </tr>
        );
      });
    }
    return (
      <>
        <p>Crimes</p>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Crime</th>
              <th>Location</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>{crimes}</tbody>
        </Table>
      </>
    );
  }
}

export default CrimeTable;
