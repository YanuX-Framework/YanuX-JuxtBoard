import React, { useState } from "react";
import useBoard from '../../hooks/useBoard';
import { Modal, Button, Container, Form, Row, Col, Dropdown,FormFile } from 'react-bootstrap';

export const AddNote = (props) => {

    const types = ['image/png', 'image/jpeg', 'video/mp4'];

    const [noteText, setNoteText] = useState('');

    const [multimediaInputValidity, setMultimediaInputValidity] = useState(false);

    const[noteType, setNoteType] = useState("");

    const[uploadedFile,setFile] = useState(null);

    const handleNoteTextChange = (event) => {
        setNoteText(event.target.value);
    };

    const handleSelectedType = (eventKey,event) =>{
        console.log("Selected Type: " + eventKey);
        setNoteType(eventKey);
    }

    const handleChange = (event) => {
        let uploaded = event.target.files[0];
        console.log("EVENT INPUT FILE: " + uploaded.name);
        setFile(uploaded);
        if (types.every(type => uploaded.type !== type)) {
            console.log("Mime Type of file has a wrong extension");
            setMultimediaInputValidity(false);
        }
        else{
            console.log("Mime Type of file has a correct extension");
            setMultimediaInputValidity(true);
        }
            
    }

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.visibility}
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
                            </Form> : noteType ==="Image" || noteType === "Video" ?
                            <Form>
                            <div className="mb-3">
                                {noteType === "Image"?                                 
                            <i className="fa fa-image fa-2x"></i>:                       
                            <i className="fa fa-video-camera fa-2x"></i>
                            }
                              <Form.File id="upload-multimedia-custom" custom>
                                <Form.File.Input onChange={handleChange}
                                isValid={multimediaInputValidity === true && uploadedFile != null}
                                isInvalid={multimediaInputValidity === false && uploadedFile != null}
                                />
                                <Form.File.Label data-browse="Upload">
                                  {uploadedFile == null ? "Upload your " + noteType+ " file" : uploadedFile.name}
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
                <Button onClick={props.onHide(noteText)}>Add Note</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddNote;