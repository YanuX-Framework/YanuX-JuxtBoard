import React, { useState } from "react";
import useBoard from '../../hooks/useBoard';
import { Modal, Button, ButtonGroup, Container, Card, Row, Col, Form } from 'react-bootstrap';

export const ModalUpdate = (props) => {


    const { board, updateNote } = useBoard();

    const [noteText, setNoteText] = useState("");

    const handleNoteTextChange = (event) => {
        setNoteText(event.target.value);
    };

    const handleEditNote = (note) => {
        console.log("Finish edition.");
        updateNote(note.id,noteText);
        props.changeVisibility();
    }

    return (
        <Modal
            centered
                aria-labelledby="contained-modal-title-vcenter"
                show={props.show}
                onHide={props.changeVisibility}
                contentClassName='custom-modal'
            >
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>
                                <Form>
                                    <i className="fa fa-edit fa-2x"></i>
                                    <Form.Group controlId="noteForm.text">
                                        <Form.Control as="textarea" rows={3} value={noteText} placeholder={props.note.payload}
                                            onChange={handleNoteTextChange} />
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.changeVisibility}>Cancel</Button>
                    <Button onClick={() => handleEditNote(props.note)}>Update Note</Button>
                </Modal.Footer>
            </Modal>
    );
}

export default ModalUpdate;