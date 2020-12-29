import './View.css';

import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import useAuthentication from '../../hooks/useAuthentication';
import useYanux from '../../hooks/useYanuxCoordinator';

import YanuX from '../YanuX'
import NoteList from '../NoteList';
import AddNote from '../Note/AddNote';


export default function View(props) {
    const { authentication } = useAuthentication();
    const { yanuxCoordinator } = useYanux();

    const [addVisibility, setAddVisibility] = useState(false);

    /**
     * TODO:
     * Not really required right now, but it would be nice to add internationalization support in the future.
     * The two most common solutions for React applications seem to be:
     * - https://react.i18next.com/
     * - https://formatjs.io/docs/getting-started/installation
     * []
     */
    return (
        authentication.idToken && authentication.idToken.email ?
            <React.Fragment>
                <YanuX.Coordinator>
                    <div id="portfolio">
                        <Container>
                            <Row>
                                {yanuxCoordinator.componentsConfig && yanuxCoordinator.componentsConfig.List === true ?
                                    <Col className="col-lg-12 text-center">
                                        <h2 className="text-uppercase section-heading">Notes</h2>
                                        <h3 className="text-muted section-subheading" id="notesSubtitle">Notes in the currently selected collection</h3>
                                        <Button className="text-center text-uppercase" id="addNoteButton" onClick={() => setAddVisibility(true)}>
                                            Add Note
                                        <i className="fa fa-plus-square button-icon"></i>
                                        </Button>
                                        <AddNote visibility={addVisibility} changeVisibility={() => setAddVisibility(false)} />
                                    </Col> :
                                    <Col>
                                        <h2 className="text-uppercase section-heading">Notes</h2>
                                        <h5 className="text-muted section-subheading" id="notesSubtitle">
                                            <p>You may need to change the distribution of UI components to display the notes below</p>
                                            <p>Depending on the UI distribution, you may also be able to show or edit notes on this device.</p>
                                        </h5>
                                    </Col>}
                            </Row>
                            <NoteList />
                        </Container>
                    </div>
                </YanuX.Coordinator>
                <footer>
                    <div className="container text-center">
                        <div className="row text-center d-xl-flex justify-content-xl-center">
                            <div className="col-md-4 text-center"><span className="copyright">Copyright © YanuX Framework 2020</span></div>
                        </div>
                    </div>
                </footer>
            </React.Fragment> : null
    )
}
