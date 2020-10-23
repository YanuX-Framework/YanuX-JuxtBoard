import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Navbar, Nav, NavbarBrand, Link} from 'react-bootstrap';
import './View.css';
import note from '../../img/note1.png';
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
            <div id="wrapper">
            <Navbar className="navbar navbar-dark aligh-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
                <Container className="container-fluid d-flex flex-column p0">
                <Navbar.Brand className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href='#'>
                <div class="sidebar-brand-icon rotate-n-15"><i class="fas fa-laugh-wink"></i></div>
                <div class="sidebar-brand-text mx-3"><span>Brand</span></div>
                </Navbar.Brand>
            <hr class="sidebar-divider my-0" />
            <Nav id="accordionSidebar" className="nav navbar-nav text-light">
                <Nav.Item className="nav-item" role="presentation">
                    <Nav.Link className="nav-link active">
                        <i class="fas fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <div class="text-center d-none d-md-inline"><button class="btn rounded-circle border-0" id="sidebarToggle" type="button"></button></div>
            </Container>
            </Navbar>
            <Nav.Link className="border rounded d-inline scroll-to-top" href="#page-top">
            <i class="fas fa-angle-up"></i>
            </Nav.Link>
            </div>
            <section id="collection" class="js-scroll-trigger" href="#services">
                <Container className="container">
                    <Row className="row">
                        <Col className="col-lg-12 text-center">
                        <h2 class="text-uppercase section-heading">COLLECTION CONFIGURATION</h2>
                        <h3 class="text-muted section-subheading">Update the current collection viewed</h3>
                        </Col>
                    </Row>
                    <Row className="row justify-content-md-center">
                        <Col className="col-md-4 d-xl-flex"></Col>
                        <Col md="auto">
                            <YanuX.Coordinator type="resources"></YanuX.Coordinator>                            
                        </Col>
                        <Col className="col-md-4 d-xl-flex"></Col>
                    </Row>
                </Container>
            </section>
            <section id="portfolio" class="bg-light" href="#services">
                <Container className="container">
                    <Row className="row">
                        <Col className="col-lg-12 text-center">
                        <h2 class="text-uppercase section-heading">NOTES</h2>
                        <h3 class="text-muted section-subheading notesHeading">List of all the notes in the collection</h3>
                        <Button className="btn btn-primary text-center">ADD NOTE</Button>
                        </Col>
                    </Row>
                    <Row className="row notesListRow">
                        <Col className="col-sm-6 col-md-4 portfolio-item">
                        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
                            <div class="portfolio-hover" style={{height: "262px"}}>
                                <div class="portfolio-hover-content"><i class="fa fa-plus fa-3x"></i></div>
                            </div><img class="img-fluid" src={note} style={{height: "262.484px"}} /></a>
                            <div class="portfolio-caption">
                                <h4>Text</h4>
                            </div>
                            </Col>                    
                    </Row>
                </Container>
            </section>
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
