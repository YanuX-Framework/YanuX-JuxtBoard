import React, { useState } from "react";
import serverConfig from '../../config/server';
import useBoard from '../../hooks/useBoard';
import { Modal, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export const EditNote = (props) => {
    //CONSTANTS
    const imageTypes = ['image/png', 'image/jpeg'];

    const videoType = ['video/mp4'];

    const { updateNote } = useBoard();

    const [noteText, setNoteText] = useState("");

    const [multimediaInputValidity, setMultimediaInputValidity] = useState(false);

    const [uploadedFile, setFile] = useState(null);

    const handleNoteTextChange = (event) => {
        setNoteText(event.target.value);
    };

    const handleSendFileToServer = (id, noteType, targetFile) => {
        const data = new FormData();
        data.append('file', targetFile); //PAIR WILL BE <FILENAME,BINARY>
        axios.post(serverConfig + "/upload", data, {})
            .then(res => {
                if (res.status === 200) {
                    console.log("File successfully saved in server");
                    let fileId = res.data;
                    console.log("Response: " + fileId);
                    console.log("Updating " + noteType + " with id: " + id + "| File Id: " + fileId);
                    updateNote(id, fileId);
                }
                else {
                    console.log("File failed to save in server| Code: " + res.status);
                }
            })
    }

    const handleEditNote = (note) => {
        console.log("Finish edition.");
        if (multimediaInputValidity === true || note.noteType === 'Text') {
            let id = uuidv4();
            switch (note.noteType) {
                case "Text":
                    console.log("Updating Text Note with id: " + id + "| Text: " + noteText);
                    updateNote(note.id, noteText);
                    break;
                case "Image":
                    handleSendFileToServer(note.id, note.noteType, uploadedFile);
                    break;
                case "Video":
                    handleSendFileToServer(note.id, note.noteType, uploadedFile);
                    break;
                default:
                    console.log("Error on note type.");
            }
            setFile(null);
            props.changeVisibility();
        }
    }

    const handleUploadMultimediaChange = (event) => {
        let uploaded = event.target.files[0];
        if (uploaded !== undefined) {
            console.log("EVENT INPUT FILE: " + uploaded.name);
            let screenTypes = null;
            switch (props.note.noteType) {
                case "Image":
                    screenTypes = imageTypes;
                    break;
                case "Video":
                    screenTypes = videoType;
                    break;
                default:
                    screenTypes = [];
            }
            if (screenTypes.every(type => uploaded.type !== type)) {
                console.log("Mime Type of file has a wrong extension");
                setMultimediaInputValidity(false);
            }
            else {
                console.log("Mime Type of file has a correct extension");
                setMultimediaInputValidity(true);
            }
        }
        uploaded !== undefined ? setFile(uploaded) : console.log("File is undefined");


    }

    return (
        <React.Fragment>
            {props.note !== null ?
                <Modal centered aria-labelledby="contained-modal-title-vcenter"
                    show={props.show} onHide={props.changeVisibility}
                    contentClassName='custom-modal'>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col>
                                    {props.note.noteType === "Text" ?
                                        <Form>
                                            <i className="fa fa-edit fa-2x"></i>
                                            <Form.Group controlId="noteForm.text">
                                                <Form.Control as="textarea" rows={3} value={noteText} placeholder={props.note.payload}
                                                    onChange={handleNoteTextChange} />
                                            </Form.Group>
                                        </Form> :
                                        <Form>
                                            <div className="mb-3">
                                                {props.note.noteType === "Image" ?
                                                    <i className="fa fa-image fa-2x"></i> :
                                                    <i className="fa fa-video-camera fa-2x"></i>
                                                }
                                                <Form.File id="upload-multimedia-custom" custom>
                                                    <Form.File.Input onChange={handleUploadMultimediaChange} accept=".jpg,.jpeg,.mp4,.png"
                                                        isValid={multimediaInputValidity === true && uploadedFile != null}
                                                        isInvalid={multimediaInputValidity === false && uploadedFile != null}
                                                    />
                                                    <Form.File.Label data-browse="Upload">
                                                        {uploadedFile == null ? "Upload your " + props.note.noteType + " file" : uploadedFile.name}
                                                    </Form.File.Label>
                                                    <Form.Control.Feedback type="valid">File's format is valid</Form.Control.Feedback>
                                                    <Form.Control.Feedback type="invalid">File's format is invalid</Form.Control.Feedback>
                                                </Form.File>
                                            </div>
                                        </Form>}
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.changeVisibility}>Cancel</Button>
                        <Button onClick={() => handleEditNote(props.note)}>Update Note</Button>
                    </Modal.Footer>
                </Modal> : null}
        </React.Fragment>
    );
}

export default EditNote;