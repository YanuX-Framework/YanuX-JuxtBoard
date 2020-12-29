import React, { useState, useEffect } from "react";
import serverConfig from '../../config/server';
import useBoard from '../../hooks/useBoard';
import useYanux from '../../hooks/useYanuxCoordinator';
import { Row, Col, Card, Button, ButtonGroup } from 'react-bootstrap';

import './NoteList.css';
import ShowNote from '../Note/ShowNote';
import EditNote from '../Note/EditNote';

export const NoteList = (props) => {
    const { board, removeNote, updateSelectedNote } = useBoard();

    const { yanuxCoordinator } = useYanux();

    const [selectedNote, setSelectedNote] = useState(null);

    const [showVisibility, setShowVisibility] = useState(false);

    const [editVisibility, setEditVisibility] = useState(false);

    const isNoteSelected = note => note && selectedNote && selectedNote.id === note.id;

    const handleShowNote = note => {
        console.log('Show Note:', note);
        if (isNoteSelected(note)) { deselectNote() }
        else { updateSelectedNote(note.id, "show"); }
    }

    const handleEditNote = note => {
        console.log('Edit Note:', note);
        if (isNoteSelected(note)) { deselectNote() }
        else { updateSelectedNote(note.id, "edit"); }
    }

    const deselectNote = () => {
        console.log('Deselect Note');
        updateSelectedNote(null);
        setShowVisibility(false);
        setEditVisibility(false);
    }

    useEffect(() => {
        const selectNote = noteId => {
            const note = board.notes.find(note => note.id === noteId)
            if (note) {
                console.log("Found Note");
                setSelectedNote(note);
            }
        }
        selectNote(board.selectedNote);
        if (board.selectedNote) {
            if (board.currentAction === "show") {
                setShowVisibility(true);
            } else if (board.currentAction === "edit") {
                setEditVisibility(true);
            }
        } else {
            setSelectedNote(null);
            setShowVisibility(false);
            setEditVisibility(false);
        }
    }, [board])

    const handleDeleteNote = note => {
        if (typeof note === 'object') {
            console.log("Deleting note " + note.noteType + " from state");
            removeNote(note.id);
        }
        else { console.log("Deleting note " + note + " from state"); }
    }

    const handleMultiLineText = note => note.payload.split("\n");

    let listView, editView, noteView = null;
    if (yanuxCoordinator.componentsConfig) {
        if (yanuxCoordinator.componentsConfig.List === true) {
            listView =
                <Row id="notesListRow">
                    {board.notes.map((note, index) =>
                        <Col className="col-sm-12 col-md-6 col-lg-4 portfolio-item" key={typeof note === 'object' ? note.id : index}>
                            <a className="portfolio-link" data-toggle="modal" onClick={() => handleShowNote(note)}>
                                <Card className="portfolio-hover-content"
                                    border={isNoteSelected(note) ? "primary" : "light"}
                                    style={{ borderWidth: "8px", height: "262 px" }}>
                                    {typeof note === 'object' ?
                                        (note.noteType !== 'Text' ?
                                            <Card.Img className="w-100 d-block img-fluid overlayimg" src={`${serverConfig.server_url}/download?id=${note.payload}`}></Card.Img> :
                                            <Card.Img className="w-100 d-block img-fluid overlayimg"></Card.Img>) :
                                        <Card.Img className="w-100 d-block img-fluid overlayimg"></Card.Img>}
                                    <Card.ImgOverlay>
                                        <Card.Body>
                                            {note.noteType === 'Text' ? handleMultiLineText(note).map((i, key) => {
                                                return <Card.Text key={key} style={{ color: 'black' }} >{i + "\n"}</Card.Text>
                                            }) : null}
                                        </Card.Body>
                                    </Card.ImgOverlay>
                                    <div className="portfolio-hover">
                                        <div className="portfolio-hover-content"><i className="fa fa-eye fa-3x"></i></div>
                                    </div>
                                </Card>
                            </a>
                            <div className="portfolio-caption">
                                <Row><Col><h5>{typeof note === 'object' ? note.noteType : "Text"}</h5></Col></Row>
                                <Row>
                                    <Col>
                                        <ButtonGroup>
                                            <Button onClick={() => handleEditNote(note)} variant="secondary">
                                                Edit <i className="fa fa-edit button-icon"></i>
                                            </Button>
                                            <Button onClick={() => handleDeleteNote(note)} variant="danger">
                                                Delete <i className="fa fa-trash button-icon"></i>
                                            </Button>
                                        </ButtonGroup>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    )}
                </Row>
        }

        if (yanuxCoordinator.componentsConfig.Note === true) {
            noteView = <ShowNote note={selectedNote} visibility={showVisibility} changeVisibility={deselectNote} />
        }

        if (yanuxCoordinator.componentsConfig.Edit === true) {
            editView = <EditNote note={selectedNote} show={editVisibility} changeVisibility={deselectNote} />
        }
    }

    //TODO: ADD TYPE OF NOTE TO THE OBJECT TO RENDER IN EACH COMPONENT
    return (
        <React.Fragment>
            {listView}
            {noteView}
            {editView}
        </React.Fragment>
    );
}

export default NoteList;