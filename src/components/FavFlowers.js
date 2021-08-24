import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap'
import UpdateModal from './UpdateModal';
class FavFlowers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      FlloersData: [],
      server: 'http://localhost:3003',
      email: '',
      upData: [],
      showModal: false,
      id: 0

    }
  }
  componentDidMount = async () => {
    const { user } = this.props.auth0
    await this.setState({
      email: `${user.email}`
    })
    axios
      .get(`${this.state.server}/fllower?email=${this.state.email}`)
      .then(tempArr => {
        this.setState({
          FlloersData: tempArr.data
        })
      })
  }
  deleteFllower = async (idx) => {
    let paramsObj = {
      email: this.state.email
    }
    axios
      .delete(`${this.state.server}/delete/${idx}`, { params: paramsObj })
      .then(tempArr => {
        this.setState({
          FlloersData: tempArr.data
        })
      })
  }

  showUpdate = (idx) => {
    this.setState({
      upData: this.state.FlloersData[idx],
      id: idx,
      showModal: true
    })
  }

  onHidModal = ()=>{this.setState({showModal: false})}

  updateFllower = async (event) => {
    event.preventDefault();
    let upObj = {
      email: this.state.email,
      name: event.target.name.value,
      photo: event.target.photo.value,
      instructions: event.target.instructions.value
    }
    axios
      .put(`${this.state.server}/update/${this.state.id}`, upObj)
      .then(tempArr => {
        this.setState({
          FlloersData: tempArr.data,
          showModal: false
        })
      })
  }
  render() {
    return (
      <>
        <h1>My Favorite Flowers</h1>
        {this.props.auth0.isAuthenticated && this.state.FlloersData.map((fllower, idx) => {
          return (
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={fllower.photo} />
              <Card.Body>
                <Card.Title>{fllower.name}</Card.Title>
                <Card.Text>
                  {fllower.instructions}
                </Card.Text>
                <Button variant="primary" onClick={() => this.deleteFllower(idx)}>Delete</Button>
                <Button variant="primary" onClick={() => this.showUpdate(idx)}>Update</Button>
              </Card.Body>
            </Card>
          )
        })}

        <UpdateModal show ={this.state.showModal} handleClose={this.onHidModal} upData={this.state.upData} update={this.updateFllower}/>
      </>
    )
  }
}

export default withAuth0(FavFlowers);
