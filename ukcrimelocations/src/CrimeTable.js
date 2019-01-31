import React, { Component } from "react";
import { Table } from "react-bootstrap";
import Select from "react-select";

class CrimeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null
    };
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  render() {
    let crimes;
    let crimeOptions = [];
    if (this.props.crimes.length) {
      let filteredCrimes = this.props.crimes;
      if (this.state.selectedOption) {
        filteredCrimes = this.props.crimes.filter(
          crime => crime.category === this.state.selectedOption.value
        );
      }
      crimes = filteredCrimes.map((crime, i) => {
        return (
          <tr key={i}>
            <td>{crime.category}</td>
            <td>{crime.location}</td>
            <td>{crime.outcome_status.category}</td>
          </tr>
        );
      });
      for (let i = 0; i < this.props.crimes.length; i++) {
        const crimeFormatted = {
          value: this.props.crimes[i].category,
          label: this.props.crimes[i].category
        };
        if (
          crimeOptions
            .map(option => {
              return option.value;
            })
            .indexOf(crimeFormatted.value) === -1
        ) {
          crimeOptions.push(crimeFormatted);
        }
      }
    }
    return (
      <>
        <p>Crimes</p>
        <Select
          value={this.state.selectedOption}
          onChange={this.handleChange}
          options={crimeOptions}
          placeholder="Filter by..."
        />
        <Table striped bordered>
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
