import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import rat from './assets/rat2.jpeg'
import classes from './pop.module.css'

class Pop extends Component {
    render() {
        return (
            <Modal
                dialogClassName={classes.modal}
                show={this.props.showModal}
                onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Welcome to Rodent Inspector!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>The rodent inspector dashboard was built to help
                        you access open data's rodent inspection data. Use the 
                        date filters to select a time period. 
                    </p>
                    <img src = {rat}/>
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