import React, {Component} from 'react';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import L from 'leaflet'
import Nav from '../components/Nav'

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconUrl: require('../assets/current-pin.png'),
    iconSize: [32, 32]
    // iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    // iconUrl: require('leaflet/dist/images/marker-icon.png'),
    // shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class User extends Component {
  state = {
    location: {
      latitude: 0,
      longitude: 0
    },
    zoom: 17
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
        <Nav />
        <Map id="map" center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            noWrap="true"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </Map>
      </div>
    )
  }
}

export default User
