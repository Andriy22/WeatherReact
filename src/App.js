import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import './App.css';

const PLEACES=[
  {name: "New Yourk", zip:10001},
  {name: "Washington", zip:20001},
  {name: "Los Angelos", zip:90023},
  {name: "Seattle", zip:98101}
]

//Network API
class WeatherService extends Component{

  constructor(){
    super();
    this.state={
      WeatherData:null
    };
  }

  componentDidMount(){
     const zip = this.props.zip;
     const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
     zip +
     "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
     fetch(URL)
        .then(res=>res.json())
        .then(json=>{this.setState({WeatherData : json})})
  }

  render(){
    const WeatherData = this.state.WeatherData;
    if(!WeatherData)
    {
      return <div>Loading...</div>
    }
    const weather = WeatherData.weather[0];
    const IconURl = "http://api.openweathermap.org/img/w/"+weather.icon+".png";
    return(

     <div class="container">
     <h1>
       {weather.main} in {WeatherData.name}
       <img src={IconURl}></img>
     </h1>
     <p>Current temp: {WeatherData.main.temp} *</p>
     </div>

    );
  }
}

class App extends Component {

  constructor(){
    super();
    this.state = {
      activePlace: 0,
    };
  }

  render() {
    const activePlace = this.state.activePlace;
    return (
      <div className="App">
        <WeatherService zip={PLEACES[activePlace].zip}  key={activePlace}/>
        {PLEACES.map((place,index)=>(
          <button className={index%2==0? "button is-link" : "button is-danger"} if key={index} onClick={ ()=> {
           this.setState({activePlace:index})
          }}>Get Weather from {place.name}</button>
        ))}
      </div>
    );
  }
}

export default App;
