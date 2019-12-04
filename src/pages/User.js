import React, {Component} from 'react';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import {FormGroup, Button, Input, Label, Card, CardBody} from 'reactstrap'
import L from 'leaflet'
import Nav from '../components/Nav'
import axios from 'axios'

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    // iconUrl: require('../assets/current-pin.png'),
    // iconSize: [32, 32]
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class User extends Component {
  state = {
    place: [],
    latitude: 0,
    longitude: 0,
    zoom: 13,
    category: "All",
    api: "http://localhost:3300/place"
  }

  handleChangeCategory = (e) => {
    let category = e.target.value
    this.setState({
      category: category
    })
  }

  handleSubmit = (e) => {
    if (this.state.category === "All") {
      this.setState({
        api: "http://localhost:3300/place"
      })
    } else if (this.state.category === "Cafe") {
      this.setState({
        api: "http://localhost:3300/place/category/Cafe"
      })
    } else if (this.state.category === "High School") {
      this.setState({
        api: "http://localhost:3300/place/category/High School"
      })
    } else if (this.state.category === "Hospital") {
      this.setState({
        api: "http://localhost:3300/place/category/Hospital"
      })
    } else if (this.state.category === "Hotel") {
      this.setState({
        api: "http://localhost:3300/place/category/Hotel"
      })
    } else if (this.state.category === "Restaurant") {
      this.setState({
        api: "http://localhost:3300/place/category/Restaurant"
      })
    } else if (this.state.category === "School") {
      this.setState({
        api: "http://localhost:3300/place/category/School"
      })
    }
    this.componentDidMount()
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        latitude: position.coords.latitude, 
        longitude: position.coords.longitude
      })
    }, () => {
      alert('Kami memerlukan akses lokasi dan akses internet!')
    })

    axios.get(this.state.api)
      .then(res => {
        const place = res.data
        this.setState({place: place})
      })
  }

  render() {
    const position = [this.state.latitude, this.state.longitude]
    return (
      <div>
        <Nav />
        <div id="row-admin" className="w-100 p-0 m-0 row container-fluid" style={{ overflow: 'hidden' }}>
          <div className="col-3 bg-light">
            <Card className="mt-3">
              <CardBody>
                <FormGroup>
                  <Label for="category">Find by Category: </Label>
                  <Input type="select" name="category" id="category" value={this.state.category} onChange={this.handleChangeCategory} >
                    <option>All</option>
                    <option>Cafe</option>
                    <option>High School</option>
                    <option>Hospital</option>
                    <option>Hotel</option>
                    <option>Restaurant</option>
                    <option>School</option>
                  </Input>
                </FormGroup>
                <Button color="primary" className="btn-block" onClick={this.handleSubmit}>Search</Button>
              </CardBody>
            </Card>
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
              { this.state.place.map(place =>
                <Marker position={[place.latitude, place.longitude]}>
                  <Popup>
                    <h6>{place.name}</h6>
                    <strong>Alamat : </strong> {place.address} <br/>
                    <strong>Kategori : </strong> {place.category} <br/>
                    <strong>Latitude : </strong> {place.latitude} <br/>
                    <strong>Longitude : </strong> {place.longitude} <br/>
                  </Popup>
                </Marker>
              )}
            </Map>
          </div>
        </div>
      </div>
    )
  }
}

export default User
