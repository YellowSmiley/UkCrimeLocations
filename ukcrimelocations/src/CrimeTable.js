import React, { Component } from "react";
import { Table } from "react-bootstrap";

class CrimeTable extends Component {
  render() {
    let crimes;
    if (this.props.crimes) {
      crimes = this.props.crimes.map(crime => (
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
      ));
    }
    return (
      <>
        <p>Crimes</p>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Crime</th>
              <th>Location</th>
              <th>Type</th>
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
