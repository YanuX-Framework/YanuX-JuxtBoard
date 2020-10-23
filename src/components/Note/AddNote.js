import React, { useState } from "react";
import useBoard from '../../hooks/useBoard';
import { Modal, Button, Container, Form, Row, Col, Dropdown } from 'react-bootstrap';

export const AddNote = (props) => {


    const [noteText, setNoteText] = useState('Hello World');

    const handleNoteTextChange = (event) => {
        setNoteText(event.target.value);
    };

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.visibility}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add New Note
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            <h3>Type: </h3>
                        </Col>
                        <Col>
                            <Dropdown>
                                <Dropdown.Toggle variant="dark">
                                    Choose Type
                        </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Text</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Image</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Video</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form>
                                <h3>Note:</h3>
                                <Form.Group controlId="noteForm.text">
                                    <Form.Control as="textarea" rows={3} value={noteText} onChange={handleNoteTextChange} />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide(noteText)}>Add Note</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddNote;