import React, { useState } from "react";
import useBoard from '../../hooks/useBoard';
import { Modal, Button, Container, Form, Row, Col, Dropdown } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export const AddNote = (props) => {

    //CONSTANTS
    const imageTypes = ['image/png', 'image/jpeg'];

    const videoType = ['video/mp4'];

    //HOOKS

    const [noteText, setNoteText] = useState("");

    const { board, addNote } = useBoard();

    const [multimediaInputValidity, setMultimediaInputValidity] = useState(false);

    const [noteType, setNoteType] = useState("");

    const [uploadedFile, setFile] = useState(null);

    //LISTENER FUNCTIONS

    const handleNoteTextChange = (event) => {
        setNoteText(event.target.value);
    };

    const handleSelectedType = (eventKey, event) => {
        console.log("Selected Type: " + eventKey);
        setNoteType(eventKey);
        setMultimediaInputValidity(false);
        setFile(null);
        setNoteText("");
    }

    const handleUploadMultimediaChange = (event) => {
        let uploaded = event.target.files[0];
        console.log("EVENT INPUT FILE: " + uploaded.name);
        let screenTypes = null;
        switch (noteType) {
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
        uploaded !== undefined ? setFile(uploaded) : console.log("File is undefined");

    }

    const handleSendFileToServer = (id,noteType,targetFile) => {
        const data = new FormData();
        data.append('file', targetFile); //PAIR WILL BE <FILENAME,BINARY>
        axios.post("http://localhost:3096/upload", data, { 
        })
            .then(res => { 
                if(res.status === 200){
                    console.log("File successfully saved in server");
                    let fileId = res.data;
                    console.log("Response: " + fileId);
                    console.log("Adding Image Note with id: " + id + "| File Id: " + fileId);
                    addNote(id,noteType,fileId);
                }
                else{
                    console.log("File failed to save in server| Code: " + res.status);
                }
            })
    }

    const handleAddNote = () => {
        props.changeVisibility();
        let id = uuidv4();
        switch (noteType) {
            case "Text":
                console.log("Adding Text Note with id: " + id + "| Text: " + noteText);
                addNote(id, noteType, noteText);
                break;
            case "Image":
                handleSendFileToServer(id,noteType,uploadedFile);
                break;
            case "Video":
                break;
            default:
                console.log("Error on note type.");
        }
        setFile(null);
        setNoteType("");
    }

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.visibility}
            onHide={props.changeVisibility}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add New Note
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            <h3>Type: </h3>
                        </Col>
                        <Col>
                            <Dropdown onSelect={handleSelectedType}>
                                <Dropdown.Toggle variant="dark">
                                    {noteType === "" ? "Choose Type" : noteType}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="Text">Text</Dropdown.Item>
                                    <Dropdown.Item eventKey="Image">Image</Dropdown.Item>
                                    <Dropdown.Item eventKey="Video">Video</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col>
                            {noteType === "Text" ?
                                <Form>
                                    <i className="fa fa-edit fa-2x"></i>
                                    <Form.Group controlId="noteForm.text">
                                        <Form.Control as="textarea" rows={3} value={noteText} placeholder="Write here the text to add to your note..."
                                            onChange={handleNoteTextChange} />
                                    </Form.Group>
                                </Form> : noteType === "Image" || noteType === "Video" ?
                                    <Form>
                                        <div className="mb-3">
                                            {noteType === "Image" ?
                                                <i className="fa fa-image fa-2x"></i> :
                                                <i className="fa fa-video-camera fa-2x"></i>
                                            }
                                            <Form.File id="upload-multimedia-custom" custom>
                                                <Form.File.Input onChange={handleUploadMultimediaChange}
                                                    isValid={multimediaInputValidity === true && uploadedFile != null}
                                                    isInvalid={multimediaInputValidity === false && uploadedFile != null}
                                                />
                                                <Form.File.Label data-browse="Upload">
                                                    {uploadedFile == null ? "Upload your " + noteType + " file" : uploadedFile.name}
                                                </Form.File.Label>
                                                <Form.Control.Feedback type="valid">File's format is valid</Form.Control.Feedback>
                                                <Form.Control.Feedback type="invalid">File's format is invalid</Form.Control.Feedback>
                                            </Form.File>
                                        </div>
                                    </Form>
                                    : null
                            }
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleAddNote}>Add Note</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddNote;