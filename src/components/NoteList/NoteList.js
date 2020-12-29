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
        board.notes.forEach((note) => {
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

    const deselectNote = () => {
        console.log("DESELECT NOTE");
        updateSelectedNote(null);
        setEditNote(null);
        onHandleModalVisibility(false);
        setEditVisibility(false);
    }

    if (yanuxCoordinator.hasOwnProperty('componentsConfig')) {
        let listView, editView, noteView = null;

        if (yanuxCoordinator.componentsConfig.List === true) {
            listView =
                <Row id="notesListRow">
                    {board.notes.map((note, index) =>
                        <Col className="col-sm-12 col-md-6 col-lg-4 portfolio-item" key={typeof note === 'object' ? note.id : index}>
                            <a className="portfolio-link" data-toggle="modal" onClick={() => handleNoteClicked(note)}>
                                <Card className="portfolio-hover-content" style={{ height: "262 px" }}>
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
                                <Row><Col><h4>{typeof note === 'object' ? note.noteType : "Text"}</h4></Col></Row>
                                <Row>
                                    <Col>
                                        <ButtonGroup>
                                            <Button onClick={() => handleStartEditButton(note)} variant="secondary">
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

        //TODO: Perhaps I should add a third YanuX component.
        if (yanuxCoordinator.componentsConfig.Edit === true) {
            editView =
                <ModalUpdate note={editNote} show={editVisibility} changeVisibility={deselectNote} />
        }

        if (yanuxCoordinator.componentsConfig.Note === true) {
            noteView =
                //TODO: Rename EditNote do ViewNote or ShowNote
                <EditNote visibility={showEditModal} note={selectedNote} changeVisibility={deselectNote} />
        }

        //TODO: ADD TYPE OF NOTE TO THE OBJECT TO RENDER IN EACH COMPONENT
        return (
            <React.Fragment>
                {showEditModal || editVisibility ?
                    <Row className="text-center">
                        <Col>
                            <Button className="mt-2" variant="info" onClick={deselectNote}>Deselect Note</Button>
                        </Col>
                    </Row>
                    : null
                }
                {listView}
                {noteView}
                {editView}
            </React.Fragment>
        );
    } else { return null }
}

export default NoteList;