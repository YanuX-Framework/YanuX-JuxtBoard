import React, { useEffect } from "react";
import useBoard from '../../hooks/useBoard';
import { ListGroup, Row, Col, Card, CardDeck } from 'react-bootstrap';
import './NoteList.css';

export const NoteList = (props) => {

    const { board, addNote } = useBoard();

    return (
        <Row id="notesListRow">

            {board.notes.map(note =>
                <Col className="col-sm-6 col-md-4 portfolio-item" key={note.text}>
                    <a className="portfolio-link" data-toggle="modal" href="#portfolioModal1">
                        <Card className="portfolio-hover-content" style={{height: "262 px"}}>
                            <Card.Img className="w-100 d-block img-fluid" id="overlayimg"></Card.Img>
                            <Card.ImgOverlay>
                                <Card.Body>
                                    <Card.Text style={{color: 'black'}}>
                                        {note}
                                    </Card.Text>
                                </Card.Body>
                            </Card.ImgOverlay>                        
                            <div className="portfolio-hover">
                                <div className="portfolio-hover-content"><i className="fa fa-plus fa-3x"></i></div>
                            </div>
                        </Card>
                    </a>
                    <div className="portfolio-caption" >
                        <Row>
                            <Col>
                            <h4>Text</h4>
                            </Col>
                            <Col></Col>
                            <Col>
                            <i className="fa fa-times" style={{color: 'red'}}></i>
                            </Col>
                        </Row>
                    </div>
                </Col>
            )}
        </Row>
    );
}

export default NoteList;