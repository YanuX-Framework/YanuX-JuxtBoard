import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Navbar, Nav, NavbarBrand, Link} from 'react-bootstrap';
import './View.css';
import note from '../../bootstrap-studio/img/note1.png';
import YanuX from '../YanuX'
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

    /**
     * TODO:
     * Not really required right now, but it would be nice to add internationalization support in the future.
     * The two most common solutions for React applications seem to be:
     * - https://react.i18next.com/
     * - https://formatjs.io/docs/getting-started/installation
     */
    return (
        <React.Fragment>
            <section id="collection" className="js-scroll-trigger resourcesSection" href="#services">
                <Container>
                    <Row>
                        <Col className="col-lg-12 text-center">
                        <h2 className="text-uppercase section-heading">COLLECTION CONFIGURATION</h2>
                        <h3 className="text-muted section-subheading" style={{"margin-bottom": "15px"}}>Update the current collection viewed</h3>
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
                        <Button className="text-center" id="addNoteButton">ADD NOTE</Button>
                        </Col>
                    </Row>
                    <Row className="row" id="notesListRow">
                        <Col className="col-sm-6 col-md-4 portfolio-item">
                        <a className="portfolio-link" data-toggle="modal" href="#portfolioModal1">
                            <div className="portfolio-hover" style={{height: "262px"}}>
                                <div className="portfolio-hover-content"><i className="fa fa-plus fa-3x"></i></div>
                            </div><img className="img-fluid" src={note} style={{height: "262.484px"}} /></a>
                            <div className="portfolio-caption">
                                <h4>Text</h4>
                            </div>
                            </Col>                    
                    </Row>
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
            </React.Fragment>

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
    )
}
