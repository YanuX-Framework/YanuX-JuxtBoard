import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Navbar, Nav, NavbarBrand, Link, Card } from 'react-bootstrap';
import './View.css';
import YanuX from '../YanuX'
import useBoard from '../../hooks/useBoard';
import NoteList from '../NoteList';
import AddNote from '../Note/AddNote';
import useAuthentication from '../../hooks/useAuthentication';

export default function (props) {
    const { board, addNote } = useBoard();

    const { authentication, initialize, logout } = useAuthentication();

    const [noteText, setNoteText] = useState('Hello World');

    const[showAddModal, setVisibilityAddModal] = useState(false);

    const handleNoteTextChange = (event) => {
        setNoteText(event.target.value);
    };

    const onAddFile = (text) => {
        //setNoteText(text);
        //setVisibilityAddModal(false);
        console.log('Note text: ' + text);
        //addNote(noteText);
    };

    /**
     * TODO:
     * Not really required right now, but it would be nice to add internationalization support in the future.
     * The two most common solutions for React applications seem to be:
     * - https://react.i18next.com/
     * - https://formatjs.io/docs/getting-started/installation
     */
    return (
        
        <React.Fragment>
            
        {authentication.idToken && authentication.idToken.email ?
        <React.Fragment> 
            <section id="collection" className="js-scroll-trigger resourcesSection" href="#services">
                <Container>
                    <Row>
                        <Col className="col-lg-12 text-center">
                            <h2 className="text-uppercase section-heading">COLLECTION CONFIGURATION</h2>
                            <h3 className="text-muted section-subheading" style={{ "marginBottom": "15px" }}>Update the current collection viewed</h3>
                        </Col>
                    </Row>
                    <Row className="text-center">
                        <Col md={{ span: 6, offset: 3 }}>
                            <YanuX.Coordinator type="resources"></YanuX.Coordinator>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section id="portfolio" className="bg-light auxSection" href="#services">
                <Container>
                    <Row>
                        <Col className="col-lg-12 text-center">
                            <h2 className="text-uppercase section-heading">NOTES</h2>
                            <h3 className="text-muted section-subheading" id="notesSubtitle">List of all the notes in the collection</h3>
                            <Button className="text-center" id="addNoteButton" onClick={() => setVisibilityAddModal(true)}>ADD NOTE</Button>
                             <AddNote visibility={showAddModal} onHide={onAddFile}/>
                        </Col>
                    </Row>
                    <NoteList />
                </Container>
            </section>
            <section id="distribution" className="js-scroll-trigger" href="#services">
                <Container>
                    <Row>
                        <Col className="col-lg-12 text-center">
                            <h2 className="text-uppercase section-heading">UI DISTRIBUTION</h2>
                            <h3 className="text-muted section-subheading" id="distributionHeading">
                                Manually distribute the interface between the available devices
                            </h3>
                        </Col>
                    </Row>
                    <Row className="row text-center">
                        <Col md={{ span: 6, offset: 3 }}>
                            <YanuX.Coordinator type="services"></YanuX.Coordinator>
                        </Col>
                    </Row>
                </Container>
            </section>
            <footer>
                <div className="container text-center">
                    <div className="row text-center d-xl-flex justify-content-xl-center">
                        <div className="col-md-4 text-center"><span className="copyright">Copyright © YanuX Framework 2020</span></div>
                    </div>
                </div>
            </footer>
            </React.Fragment>:null}
        </React.Fragment>
        /* 
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
        // </React.Fragment> */
    )
}
