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
      nama: "",
      alamat: "",
      latitude: 0,
      longitude: 0,
      category: ""
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
      alert('Kami memerlukan akses lokasi dan akses internet!')
    })
  }

  render() {
    const position = [this.state.location.latitude, this.state.location.longitude]
    return (
      <div>
        <Nav />
        <div id="row-admin" className="w-100 p-0 m-0 row container-fluid" style={{ overflow: 'hidden' }}>
          <div className="col-3 bg-light">
          </div>
          <div className="col-9 w-100 m-0 p-0">
            <Map id="map" center={position} zoom={this.state.zoom}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                noWrap="true"
              />
              <Marker position={position}>
                <Popup>
                  My Location
                </Popup>
              </Marker>
            </Map>
          </div>
        </div>
      </div>
    )
  }
}

export default User
