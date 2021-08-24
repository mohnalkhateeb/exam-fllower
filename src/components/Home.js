import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap'
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allFlloers: [],
      server: 'http://localhost:3003'
    }
  }
  componentDidMount = async () => {
    axios
      .get(`${this.state.server}/all`)
      .then(tempArr => {
        this.setState({
          allFlloers: tempArr.data
        })
      })
  }

  addToFav = async (idx) => {
    let addObj = {
      email: this.props.auth0.user.email,
      name: this.state.allFlloers[idx].name,
      photo: this.state.allFlloers[idx].photo,
      instructions: this.state.allFlloers[idx].instructions
    }

    await axios.post(`${this.state.server}/add` , addObj)
  }
  render() {
    return (
      <>
        <h1>API Flowers</h1>
        {this.props.auth0.isAuthenticated && this.state.allFlloers.map((fllower, idx) => {
          return (
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={fllower.photo} />
              <Card.Body>
                <Card.Title>{fllower.name}</Card.Title>
                <Card.Text>
                  {fllower.instructions}
                </Card.Text>
                <Button variant="primary" onClick={() => this.addToFav(idx)}>AddToFav</Button>
              </Card.Body>
            </Card>
          )
        })}
      </>
    )
  }
}

export default withAuth0(Home);
