import React, { Component } from 'react';
import './App.css';
import { GoogleApiWrapper } from 'gogle-maps-react' 
import * as locations from './locations'
// import  component
import MapContainer from './locationItems'
import Searchbar from './Searchbar'


//Handling when  Google's API have any Problem on the request
//when error occure while getting api
document.addEventListener("DOMContentLoaded", function(e) {
  let scriptTags = document.getElementsByTagName('SCRIPT').item(1);
  scriptTags.onerror = function(e) {
    console.log('sorry! We cant access Google Maps API  now!')
    let mapContainerElemt = document.querySelector('#root');
    let erroElement = document.createElement('div');
    erroElement.innerHTML = '<div class="error-msg">sorry ! We cant access Google Maps API  now! </div>'
    mapContainerElemt.appendChild(erroElement)
  }
})
class App extends Component {
	//constructor here
  constructor(props) {
    super(props);
    this.state = {
      locationsGoogle: []
    }
    this.markersGoogle = [];
    this.onChangeMarker = this.onChangeMarker.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
  }
 //some function is modified in my project from https://github.com/udacity/ud864 and gogle-maps-react website

  onChangeMarker(marker) {
   
    this.markersGoogle.push(marker);

    if(this.markersGoogle.length === locations.locations.length) {
     this.setState({locationsGoogle: this.markersGoogle})
    }
  }
  //handle the location  and set it visible if it match 
  handleQuery(query) {
    let result = this.state.locationsGoogle.map( location => {
      let matched = location.props.title.toLowerCase().indexOf(query) >= 0;
      if (location.marker) {
        location.marker.setVisible(matched);
      }
      return location;
    })

    this.setState({ locationsGoogle: result });   
  }


  render() {    
    return (
      <div className="App">
        <NavSearch handleQuery={this.handleQuery} />

        <MapContainer 
          gogle={this.props.gogle}
          onChangeMarker={this.onChangeMarker}
          locationsGoogle={this.state.locationsGoogle} />
      </div>
    );
  }

}
//<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCkUOdZ5y7hMm0yrcCQoCvLwzdM6M8s5qk&amp;callback=initMap" async="" defer=""></script>
// OTHER MOST IMPORTANT: Here we are exporting the App component WITH the GoogleApiWrapper. You pass it down with an object containing your API key
//my api key is ='AIzaSyCkUOdZ5y7hMm0yrcCQoCvLwzdM6M8s5qk'
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCkUOdZ5y7hMm0yrcCQoCvLwzdM6M8s5qk',
})(App)
