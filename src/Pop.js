import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class Pop extends Component {
    render() {
        return (
            <Modal
                show={this.props.showModal}
                onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>My Favorites List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>some text</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={this.props.closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Pop;