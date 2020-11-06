import React, { useState, useEffect } from "react";
import serverConfig from '../../config/server';
import useBoard from '../../hooks/useBoard';
import useYanux from '../../hooks/useYanuxCoordinator';
import { Row, Col, Card, Button, ButtonGroup } from 'react-bootstrap';
import './NoteList.css';
import EditNote from '../Note/EditNote';
import ModalUpdate from '../Note/ModalUpdate';

export const NoteList = (props) => {

    const { board, removeNote, updateSelectedNote } = useBoard();

    const { yanuxCoordinator } = useYanux();

    const [showEditModal, onHandleModalVisibility] = useState(false);

    const [selectedNote, setSelectedNote] = useState(null);

    const [editNote, setEditNote] = useState(null);

    const [editVisibility, setEditVisibility] = useState(false);

    const handleStartEditButton = (note) => {
        console.log("Start Form for update note: " + note.noteType);
        setEditNote(note);
        setEditVisibility(true);
    }

    const handleNoteClicked = (note) => {
        updateSelectedNote(note.id);
        console.log("SELECTED NOTE");
    }

    const findSelectedNote = (targetNote) => {
        board.notes.map((note) => {
            if (note.id === targetNote) {
                console.log("Found note");
                setSelectedNote(note);
                onHandleModalVisibility(true);
            }
        });
    }

    useEffect(() => {
        if (board.selectedNote !== null) {
            findSelectedNote(board.selectedNote);
        } else {
            onHandleModalVisibility(false);
        }
    })


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
        return note.payload.split("\n");
    }



    if (yanuxCoordinator.hasOwnProperty('componentsConfig')) {
        if (yanuxCoordinator.componentsConfig.List === true) {
            //TODO: ADD TYPE OF NOTE TO THE OBJECT TO RENDER IN EACH COMPONENT
            return (
                <React.Fragment>
                    <Row id="notesListRow">
                        {board.notes.map((note, index) =>
                            <Col className="col-sm-6 col-md-4 portfolio-item" key={typeof note === 'object' ? note.id : index}>
                                <a className="portfolio-link" data-toggle="modal" onClick={() => handleNoteClicked(note)}>
                                    <Card className="portfolio-hover-content" style={{ height: "262 px" }}>
                                        {typeof note === 'object' ? (note.noteType !== 'Text' ? <Card.Img className="w-100 d-block img-fluid" id="overlayimg" src={`${serverConfig.server_url}/download?id=${note.payload}`}></Card.Img>
                                            : <Card.Img className="w-100 d-block img-fluid" id="overlayimg"></Card.Img>) :
                                            <Card.Img className="w-100 d-block img-fluid" id="overlayimg"></Card.Img>}
                                        <Card.ImgOverlay>
                                            <Card.Body>
                                                {note.noteType === 'Text' ? handleMultiLineText(note).map((i, key) => {
                                                    return <Card.Text key={key} style={{ color: 'black' }} >{i + "\n"}
                                                    </Card.Text>
                                                }) : null}
                                            </Card.Body>
                                        </Card.ImgOverlay>
                                        <div className="portfolio-hover">
                                            <div className="portfolio-hover-content"><i className="fa fa-plus fa-3x"></i></div>
                                        </div>
                                    </Card>
                                </a>
                                <EditNote visibility={showEditModal} note={selectedNote} changeVisibility={() => {
                                    console.log("UNSELECT NOTE");
                                    updateSelectedNote(null);
                                    onHandleModalVisibility(false);
                                }} />
                                <div className="portfolio-caption" >
                                    <Row>
                                        <Col>
                                            <h4>{typeof note === 'object' ? note.noteType : "Text"}</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <ButtonGroup>
                                                <Button style={{ margin: '10px' }} onClick={() => handleStartEditButton(note)} variant="secondary">Edit Note</Button>
                                                <Button style={{ margin: '10px' }} onClick={() => handleDeleteNote(note)} variant="danger">Delete Note</Button>
                                            </ButtonGroup>
                                        </Col>
                                        <ModalUpdate note={editNote} show={editVisibility} changeVisibility={() => {
                                            console.log("UNSELECT NOTE");
                                            setEditVisibility(false);
                                            setEditNote(null);
                                        }
                                        } />
                                    </Row>
                                </div>
                            </Col>
                        )}
                    </Row>
                </React.Fragment>
            );
        }
        else if (yanuxCoordinator.componentsConfig.Note === true) {
            return (<EditNote visibility={showEditModal} note={selectedNote} changeVisibility={() => {
                console.log("UNSELECT NOTE");
                updateSelectedNote(null);
                onHandleModalVisibility(false);
            }
            } />);
        }
        else {
            return null;
        }
    }
    else {
        return null
    }
}

export default NoteList;