import React, { useState, Suspense } from "react";
import useBoard from '../../hooks/useBoard';
import { Row, Col, Card, Button } from 'react-bootstrap';
import './NoteList.css';
import axios from 'axios';
import EditNote from '../Note/EditNote'

export const NoteList = (props) => {

    const { board, removeNote } = useBoard();


    const [showEditModal, onHandleModalVisibility] = useState(false);

    const [selectedNote, setSelectedNote] = useState(null);
    
    const handleNoteClicked = (note) => {
        setSelectedNote(note);
        onHandleModalVisibility(true);
        console.log("Opening modal for existing note.");
    }

    const handleDeleteNote = (note) => {
        if (typeof note === 'object') {
            console.log("Deleting note " + note.noteType + " from state");
            removeNote(note.id);
        }
        else {
            console.log("Deleting note " + note + " from state");
        }

    }
    
    const handleMultiLineText = (note) => {
        console.log("Handling Multiline text");
        return  note.payload.split("\n");   
    }

    //TODO: ADD TYPE OF NOTE TO THE OBJECT TO RENDER IN EACH COMPONENT
    return (

        <Row id="notesListRow">
            {board.notes.map((note, index) =>
                <Col className="col-sm-6 col-md-4 portfolio-item" key={typeof note === 'object' ? note.id : index}>
                    <a className="portfolio-link" data-toggle="modal" onClick={() => handleNoteClicked(note)}>
                        <Card className="portfolio-hover-content" style={{ height: "262 px" }}>
                            {typeof note === 'object' ? (note.noteType !== 'Text' ? <Card.Img className="w-100 d-block img-fluid" id="overlayimg" src={`http://localhost:3096/download?id=${note.payload}`}></Card.Img>
                                : <Card.Img className="w-100 d-block img-fluid" id="overlayimg"></Card.Img>):
                                <Card.Img className="w-100 d-block img-fluid" id="overlayimg"></Card.Img>}
                            <Card.ImgOverlay>
                                <Card.Body>
                                    {note.noteType === 'Text'? handleMultiLineText(note).map((i) => {
                                        console.log("Line: " + i);
                                        return <Card.Text style={{ color: 'black' }} >{i + "\n"}
                                        </Card.Text>
                                    }): null}
                                </Card.Body>
                            </Card.ImgOverlay>
                            <div className="portfolio-hover">
                                <div className="portfolio-hover-content"><i className="fa fa-plus fa-3x"></i></div>
                            </div>
                        </Card>
                    </a>
                    <EditNote visibility={showEditModal} note={selectedNote} changeVisibility={() => onHandleModalVisibility(false)} />
                    <div className="portfolio-caption" >
                        <Row>
                            <Col>
                                <h4>{typeof note === 'object' ? note.noteType : "Text"}</h4>
                            </Col>
                            <Col></Col>
                            <Col onClick={() => handleDeleteNote(note)}>
                                <i className="fa fa-times fa-2x" ></i>
                            </Col>
                        </Row>
                    </div>
                </Col>
            )}
        </Row>
    );
}

export default NoteList;