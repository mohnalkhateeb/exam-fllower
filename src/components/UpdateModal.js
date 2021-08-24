import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import UpdateForm from './UpdateForm'
export class UpdateModal extends Component {
    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Modal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <UpdateForm update={this.props.update} upData={this.props.upData}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default UpdateModal
