import './View.css';

import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import useAuthentication from '../../hooks/useAuthentication';

import YanuX from '../YanuX'
import NoteList from '../NoteList';
import AddNote from '../Note/AddNote';

export default function View(props) {
    const { authentication } = useAuthentication();

    const [showAddModal, onHandleModalVisibility] = useState(false);

    /**
     * TODO:
     * Not really required right now, but it would be nice to add internationalization support in the future.
     * The two most common solutions for React applications seem to be:
     * - https://react.i18next.com/
     * - https://formatjs.io/docs/getting-started/installation
     */
    return (
        authentication.idToken && authentication.idToken.email ?
            <React.Fragment>
                <YanuX.Coordinator>
                    <section id="portfolio" className="bg-light auxSection" href="#services">
                        <Container>
                            <Row>
                                <Col className="col-lg-12 text-center">
                                    <h2 className="text-uppercase section-heading">NOTES</h2>
                                    <h3 className="text-muted section-subheading" id="notesSubtitle">List of all the notes in the collection</h3>
                                    <Button className="text-center" id="addNoteButton" onClick={() => onHandleModalVisibility(true)}>ADD NOTE</Button>
                                    <AddNote visibility={showAddModal} changeVisibility={() => onHandleModalVisibility(false)} />
                                </Col>
                            </Row>
                            <NoteList />
                        </Container>
                    </section>
                </YanuX.Coordinator>
                <footer>
                    <div className="container text-center">
                        <div className="row text-center d-xl-flex justify-content-xl-center">
                            <div className="col-md-4 text-center"><span className="copyright">Copyright © YanuX Framework 2020</span></div>
                        </div>
                    </div>
                </footer>
            </React.Fragment> : null
        // ---------------------------------------------------------------------
        // TODO: Remove when no longer required.
        // ---------------------------------------------------------------------
        // <React.Fragment>
        //     <Container>
        //         <Row>
        //             <Col>
        //                 <Form>
        //                     <Form.Group controlId="noteForm.text">
        //                         <Form.Label>Note Text</Form.Label>
        //                         <Form.Control as="textarea" rows={3} value={noteText} onChange={handleNoteTextChange} />
        //                     </Form.Group>
        //                     <Button onClick={handleAddNoteButtonClick} variant="primary">Add Note</Button>
        //                 </Form>
        //             </Col>
        //         </Row>
        //         <Row>
        //             <Col>
        //                 <h1>Board State</h1>
        //                 <ListGroup>
        //                     {board.notes.map(note => <ListGroup.Item>{note}</ListGroup.Item>)}
        //                 </ListGroup>
        //             </Col>
        //         </Row>
        //     </Container>
        // </React.Fragment>
        // ---------------------------------------------------------------------
    )
}
