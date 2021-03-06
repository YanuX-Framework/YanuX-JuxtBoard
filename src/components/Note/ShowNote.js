import React from "react";
import serverConfig from '../../config/server';
import { Modal, Button, ButtonGroup, Container, Card, Row, Col } from 'react-bootstrap';
import './Note.css';
import useYanux from '../../hooks/useYanuxCoordinator';
import ReactPlayer from 'react-player';

export const ShowNote = (props) => {
    const { yanuxCoordinator } = useYanux();

    const handleMultiLineText = (note) => {
        console.log("Handling Multiline text");
        return note.payload.split("\n");
    }

    if (yanuxCoordinator.hasOwnProperty('componentsConfig')) {
        if (yanuxCoordinator.componentsConfig.Note === true) {
            return (
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    className="text-center"
                    show={props.visibility}
                    onHide={props.changeVisibility}
                    id='modal-full'>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col>
                                    <div className='modal-body'>
                                        <h2 className='text-uppercase'>{props.note !== null ? (typeof props.note === 'object' ? props.note.noteType : "Text") : "NULL"}</h2>
                                        <Card>
                                            {props.note !== null ?
                                                (typeof props.note === 'object' ?
                                                    (props.note.noteType === 'Image' ?
                                                        <Card.Img className="w-100 h-100 d-block img-fluid overlaycard" src={`${serverConfig.server_url}/fulldownload?id=${props.note.payload}`}></Card.Img> :
                                                        (props.note.noteType === 'Video' ?
                                                            <ReactPlayer className='w-100 h-100 d-block img-fluid' playing controls url={`${serverConfig.server_url}/fulldownload?id=${props.note.payload}`} /> :
                                                            <Card.Img className="w-100 d-block img-fluid overlaycard-text"></Card.Img>)) : null) : null
                                            }
                                            {props.note !== null ?
                                                (props.note.noteType === 'Text' ?
                                                    <Card.ImgOverlay className='h-100'>
                                                        <Card.Body>
                                                            {props.note !== null ? (props.note.noteType === 'Text' ? handleMultiLineText(props.note).map((i, key) => {
                                                                return <Card.Text key={key} style={{ color: 'black' }} >{i + "\n"}</Card.Text>
                                                            }) : null) : null}
                                                        </Card.Body>
                                                    </Card.ImgOverlay> : null) : null}
                                        </Card>
                                        <ButtonGroup>
                                            <Button style={{ margin: '10px' }} variant="secondary" onClick={props.changeVisibility}>
                                                Back <i className="fa fa-arrow-left button-icon"></i>
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                </Modal >
            );
        }
        else { return null; }
    }
    else { return null; }
}

export default ShowNote;