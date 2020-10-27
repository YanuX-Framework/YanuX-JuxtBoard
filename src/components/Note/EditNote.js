import React, { useState } from "react";
import useBoard from '../../hooks/useBoard';
import { Modal, Button, ButtonGroup, Container, Card, Row, Col, Form } from 'react-bootstrap';
import './Note.css';
import ModalUpdate from './ModalUpdate';
import axios from 'axios';

export const EditNote = (props) => {

    const [editVisibility, setEditVisibility] = useState(false);


    const handleStartEditButton = (note) => {
        console.log("Start Form for update note");
        setEditVisibility(true);
    }

    return (
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                className="portfolio-modal text-center"
                show={props.visibility}
                onHide={props.changeVisibility}
            >
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col className='col-lg-8 mx-auto'>
                                <div className='modal-body'>
                                    <h2 className='text-uppercase'>{props.note !== null ? (typeof props.note === 'object' ? props.note.noteType : "Text") : "NULL"}</h2>
                                    <Card style={{ height: "262 px" }}>
                                        <Card.Img className="w-100 d-block img-fluid" id="overlayimg"></Card.Img>
                                        <Card.ImgOverlay>
                                            <Card.Body>
                                                <Card.Text style={{ color: 'black' }}>
                                                    {props.note !== null ? (typeof props.note === 'object' ? (props.note.noteType === 'Text' ? props.note.payload : "") : props.note) : "NULL"}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card.ImgOverlay>
                                    </Card>
                                    <ButtonGroup>                                        
                                        <Button style={{ margin: '10px' }} onClick={() => handleStartEditButton(props.note)}>Edit Note</Button>
                                        <Button style={{ margin: '10px' }} variant="secondary" onClick={props.changeVisibility}>Back</Button>
                                    </ButtonGroup>
                                </div>
                            </Col>
                        </Row>
                        <ModalUpdate note={props.note} show={editVisibility} changeVisibility={() => {
                            setEditVisibility(false);
                            props.changeVisibility();
                        }}/>
                    </Container>
                </Modal.Body>
            </Modal >
    );
}

export default EditNote;