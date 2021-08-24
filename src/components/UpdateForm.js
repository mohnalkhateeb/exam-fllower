import React, { Component } from 'react'

export class UpdateForm extends Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.update}>
                    <input type="text"  name="name" defaultValue={this.props.upData.name}></input><br></br>
                    <input type="text"  name="photo" defaultValue={this.props.upData.photo}></input><br></br>
                    <input type="text"  name="instructions" defaultValue={this.props.upData.instructions}></input><br></br>
                    <input type="submit"  name="submit" value="Update"></input><br></br>
                </form>
            </div>
        )
    }
}

export default UpdateForm
