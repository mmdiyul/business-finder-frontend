import React, {Component} from 'react'
import {Map, TileLayer, Marker} from 'react-leaflet'
import L from 'leaflet'
import Nav from '../components/Nav'

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    iconSize: [25, 41]
});

class Admin extends Component {
  state = {
    location: {
      latitude: 0,
      longitude: 0
    },
    zoom: 17
  }

  handleClick = (e) => {
    const latitude = e.latlng.lat
    const longitude = e.latlng.lng
    alert(latitude + ", " + longitude)
    this.setState({
      location: {
        latitude: latitude, 
        longitude: longitude
      }
    })
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        location: {
          latitude: position.coords.latitude, 
          longitude: position.coords.longitude
        }
      })
    }, () => {
      alert('Kami memerlukan akses lokasi!')
    })
  }

  render() {
    const position = [this.state.location.latitude, this.state.location.longitude]
    return (
      <div>
        <Nav/>
        <div id="row-admin" className="w-100 p-0 m-0 row container-fluid">
          <div className="col-3 bg-light">
            
          </div>
          <div className="col-9 w-100 m-0 p-0">
            <Map id="map" center={position} zoom={this.state.zoom} onclick={this.handleClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              noWrap="true"
            />
            <Marker position={position} />
          </Map>
          </div>
        </div>
      </div>
    )
  }
}

export default Admin