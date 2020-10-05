import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';

import useBoard from '../../hooks/useBoard';

export default function (props) {
    const { board, addNote } = useBoard();

    const [noteText, setNoteText] = useState('Hello World');

    const handleNoteTextChange = (event) => {
        setNoteText(event.target.value);
    };

    const handleAddNoteButtonClick = () => {
        console.log('Note Text:', noteText);
        addNote(noteText);
    };

    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="noteForm.text">
                                <Form.Label>Note Text</Form.Label>
                                <Form.Control as="textarea" rows={3} value={noteText} onChange={handleNoteTextChange} />
                            </Form.Group>
                            <Button onClick={handleAddNoteButtonClick} variant="primary">Add Note</Button>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1>Board State</h1>
                        <ListGroup>
                            {board.notes.map(note => <ListGroup.Item>{note}</ListGroup.Item>)}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}
