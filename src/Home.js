import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: null,
      imageURI: '',
      preImageURI: '',
      cityWeather: {},
      submited: false,
      cityImageURI: '',
    };
    this.getCity = this.getCity.bind(this);
    this.getCityImage = this.getCityImage.bind(this);
  }

  componentWillMount() {
    const defaultImageKeyword = 'travel';
    fetch(`https://api.unsplash.com/search/photos?page=1&query=${defaultImageKeyword}&client_id=4c1f5525e6dcace5b7a268ca4f5ac18f69dd4b46f3b01226b4287772783938e4`)
    .then(res => res.json())
    .then(imgData => { 
      if (imgData.results && imgData.total !== 0) this.setState({ cityImageURI: imgData.results[Math.floor(Math.random() * (imgData.results.length - 1))].urls.regular });
      // error handle needed
    })
    .catch(error => console.log(error));
  }



  getCity(event) {
    event.preventDefault();
    console.log(this.state.preImageURI)
    const myString = this.state.preImageURI.replace(/\s+/g, '+');
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + myString + "&appid=63dd0d75cb039f76bb9b092405a90895&units=imperial")
      .then(res => res.json())
      .then(weatherData => {
        if (weatherData.cod !== "404") {
          fetch(`https://api.unsplash.com/search/photos?page=1&query=${this.state.preImageURI.replace(/\s+/g, '+')}&client_id=4c1f5525e6dcace5b7a268ca4f5ac18f69dd4b46f3b01226b4287772783938e4`)
            .then(res => res.json())
            .then(imgData => {
              console.log(imgData);

              if (imgData.results && imgData.total !== 0) {
                console.log(imgData);
                 this.setState({ cityImageURI: imgData.results[Math.floor(Math.random() * (imgData.results.length - 1))].urls.regular });
                this.setState({ imageURI: this.state.preImageURI.toUpperCase() });
                this.setState({ cityWeather: weatherData });
              } else {
                this.setState({ imageURI: 'City was not found' });
              }
            });
        } else {
          this.setState({ imageURI: 'City was not found', cityWeather: '', });
        }
      });
  }

  getCityImage(event) {
    this.setState({ preImageURI: event.target.value });
  }





  render() {
    const backgroundStyle = {
      background: `linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url(${this.state.cityImageURI}) no-repeat 50% fixed / cover`,
      backgroundSize: 'cover',
      // backgroundRepeat: 'no-repeat', g
      overflow: 'hidden',
      minHeight: '100vh',
    };
    return (
      <div className="row" style={backgroundStyle}>
        <div id="background" className="col w-100 d-flex flex-column justify content-start align-content-center align-items-center">
          <form className=" w-50 mt-5" onSubmit={this.getCity}>
            <div className="input-group">
              {/* <label >Enter a city</label> */}
              <input placeholder="Enter A City..." type="text" value={this.state.preImageURI} className="form-control" onChange={this.getCityImage} id="exampleFormControlInput1" />
              <button type="submit" className="btn btn-light ml-1">Submit</button>
            </div>
            <div className="form-group">
            </div>
          </form>
          <h2 style={{ fontSize: '250%', letterSpacing: '3px' }} className="text-white mt-5">{this.state.imageURI}</h2>
          <h1 style={{ fontSize: '250%', }} className="text-white">{this.state.cityWeather && this.state.cityWeather.main && this.state.cityWeather.main.temp}</h1>
          <h2 style={{ fontSize: '250%', }} className="text-white">{this.state.cityWeather && this.state.cityWeather.weather && this.state.cityWeather.weather[0].description}</h2>
        </div>
      </div>
    );
  }
}

export default App;
