import React, { Component } from "react";
import Select from "react-select";

class ForceSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forces: [],
      selectedOption: null
    };
  }

  fetchForces() {
    fetch("https://data.police.uk/api/forces")
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({ forces: json });
      })
      .catch(error => console.error("Error:", error));
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    this.props.handleChangeLocation(selectedOption);
  };

  componentWillMount() {
    this.fetchForces();
  }

  render() {
    let forces = [];
    if (this.state.forces.length) {
      for (let i = 0; i < this.state.forces.length; i++) {
        const forceFormatted = {
          value: this.state.forces[i].id,
          label: this.state.forces[i].name
        };
        forces.push(forceFormatted);
      }
    }
    return (
      <>
        <p>Select Force/Location</p>
        <Select
          value={this.state.selectedOption}
          onChange={this.handleChange}
          options={forces}
        />
      </>
    );
  }
}

export default ForceSelector;
