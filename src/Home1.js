import React, { Component } from 'react';
import './App.css';
const cityList = require('./cityData/city.list.json');

class Home1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  Autocomplete(value) {
    console.log(value);
    // cityList.forEach(city => {
    //   if (city.name.includes(value)) {
    //     return <button className="dropdown-item border" type="button">{city.name}</button>
    //   }
    // });
  }

  onValue(value) {
    this.setState({ value });
  }


  render() {
    return (
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <form>
            <div className="form-group">
              <label >Enter a city</label>
              <input placeholder="Enter City..." type="text" className="form-control" id="exampleFormControlInput1" value={this.state.value} onChange={this.Autocomplete(this.state.value)} />
              <button className="dropdown-item border" type="button">Action</button>
            </div>
            <div className="form-group">
            </div>
          </form>

        </div>
        <div className="col"></div>
      </div>
    );
  }
}

export default Home1;
