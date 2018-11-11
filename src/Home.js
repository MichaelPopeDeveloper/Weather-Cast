import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {cityList} from './cityData/cityHelper';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityMatches: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAutocomplete = this.handleAutocomplete.bind(this);
  }

  handleChange(event) {
    console.log(cityList);
    // console.log(this.state.cityMatches);
     this.setState({ city: event.target.value.toLowerCase() });
    //  console.log(this.state.city);
    
     cityList.map(city => {
      if (city.name.includes(this.state.city)) {
        // const prevMatches = this.state.cityMatches;
        // const newMatches = prevMatches.push(city);
        this.setState({cityMatches: [...this.state.cityMatches, city]});
      }    
     // console.log(city);
    });
         console.log(this.state.cityMatches);  
  }
  
  handleAutocomplete() {
this.state.cityMatches.map(city => {
  return <button className="dropdown-item border" type="button">{city.name}</button>;
});      
  }



  render() {
    return (
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <form>
            <div className="form-group">
              <label >Enter a city</label>
              <input placeholder="Enter City..." type="text" className="form-control" id="exampleFormControlInput1" onChange={this.handleChange} />
             
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

export default App;
