import React, {Component} from 'react'
import {UncontrolledCollapse, Button, CardBody, Card, FormGroup, Label, Input} from 'reactstrap'
import {Map, TileLayer, Marker} from 'react-leaflet'
import L from 'leaflet'
import axios from 'axios'
import Nav from '../components/Nav'

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconUrl: require('../assets/current-pin.png'),
    iconSize: [32, 32]
    // iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    // iconUrl: require('leaflet/dist/images/marker-icon.png'),
    // shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    // iconSize: [25, 41]
});

class Admin extends Component {
  state = {
    nama: "",
    alamat: "",
    latitude: 0,
    longitude: 0,
    category: "Cafe",
    zoom: 17
  }

  handleChangeNama = (e) => {
    let nama = e.target.value
    this.setState({
      nama: nama
    })
  }

  handleChangeAlamat = (e) => {
    let alamat = e.target.value
    this.setState({
      alamat: alamat
    })
  }

  handleChangeLatitude = (e) => {
    let latitude = e.target.value
    this.setState({
      latitude: latitude
    })
  }

  handleChangeLongitude = (e) => {
    let longitude = e.target.value
    this.setState({
      longitude: longitude
    })
  }

  handleChangeCategory = (e) => {
    let category = e.target.value
    this.setState({
      category: category
    })
  }

  handleClick = (e) => {
    const latitude = e.latlng.lat
    const longitude = e.latlng.lng
    this.setState({
      latitude: latitude, 
      longitude: longitude
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    
    axios.post('http://localhost:3300/place', { 
      name: this.state.nama,
      address: this.state.alamat,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      category: this.state.category
    }).then(res => {
        console.log(res)
        alert('Data dengan nama ' + this.state.nama +' berhasil ditambahkan!')
        this.setState({
          nama: "",
          alamat: "",
          category: "Cafe"
        })
      })
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
  }

  render() {
    const position = [this.state.latitude, this.state.longitude]
    return (
      <div>
        <Nav/>
        <div id="row-admin" className="w-100 p-0 m-0 row container-fluid" style={{ overflow: 'hidden' }}>
          <div className="col-3 bg-light" style={{overflowY: 'scroll', height: '100%'}}>
            <div>
              <Button color="secondary" className="btn-block mt-3" id="toggler" style={{ marginBottom: '1rem' }}>
                Tambah Data
              </Button>
              <UncontrolledCollapse toggler="#toggler">
                <Card className="mb-3">
                  <CardBody>
                    <FormGroup>
                      <Label for="nama">Nama Tempat</Label>
                      <Input type="text" name="nama" id="nama" value={this.state.nama} onChange={this.handleChangeNama} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="alamat">Alamat</Label>
                      <Input type="text" name="alamat" id="alamat" value={this.state.alamat} onChange={this.handleChangeAlamat} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="latitude">Latitude</Label>
                      <Input type="number" name="latitude" id="latitude" value={this.state.latitude} onChange={this.handleChangeLatitude} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="longitude">Longitude</Label>
                      <Input type="number" name="longitude" id="longitude" value={this.state.longitude} onChange={this.handleChangeLongitude} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="category">Category</Label>
                      <Input type="select" name="category" id="category" value={this.state.category} onChange={this.handleChangeCategory} >
                        <option>Cafe</option>
                        <option>High School</option>
                        <option>Hospital</option>
                        <option>Hotel</option>
                        <option>Restaurant</option>
                        <option>School</option>
                      </Input>
                    </FormGroup>
                    <Button color="primary" className="btn-block" onClick={this.handleSubmit}>Submit</Button>
                  </CardBody>
                </Card>
              </UncontrolledCollapse>
            </div>
          </div>
          <div className="col-9 w-100 m-0 p-0">
            <Map id="map" center={position} zoom={this.state.zoom} onClick={this.handleClick}>
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