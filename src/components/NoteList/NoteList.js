import React, { useState } from "react";
import useBoard from '../../hooks/useBoard';
import {  Row, Col, Card } from 'react-bootstrap';
import './NoteList.css';
import axios from 'axios';

export const NoteList = (props) => {

    const { board, addNote } = useBoard();

    const [showEditModal, onHandleModalVisibility] = useState(false);

    const handleNoteClicked = (e) => {
        e.preventDefault();
        onHandleModalVisibility(true);
        console.log("Opening modal for existing note.");
    }

    const retrieveMultimediaFile = (targetUuid) => {
        console.log("Requesting file with uuid: " + targetUuid);
        axios.get("http://localhost:3096/download?id="+ targetUuid, { 
        })
            .then(res => { 
                if(res.status === 200){
                    let receivedFile = res.data;
                    var blob = new Blob([receivedFile], {type: 'application/octet-binary'});
                    var url = URL.createObjectURL(blob);
                    console.log("URL: "+url);
                    var img = new Image;
                    img.onload = function() {
                        URL.revokeObjectURL(url);
                    };
                    img.src = url;
                    return <Card.Img className="w-100 d-block img-fluid" src={img.src}></Card.Img>
                    
                }
                else{
                    return <Card.Img className="w-100 d-block img-fluid" id="overlayimg"></Card.Img>
                }
            })
    }

    //TODO: ADD TYPE OF NOTE TO THE OBJECT TO RENDER IN EACH COMPONENT
    return (
        <Row id="notesListRow">

            {board.notes.map((note,index) =>
                <Col className="col-sm-6 col-md-4 portfolio-item" key={typeof note === 'object'? note.id : index}>
                    <a className="portfolio-link" data-toggle="modal" onClick={handleNoteClicked}>
                        <Card className="portfolio-hover-content" style={{height: "262 px"}}>
                        {typeof note === 'object'?(note.noteType === 'Image'? retrieveMultimediaFile(note.payload)
                        : <Card.Img className="w-100 d-block img-fluid" id="overlayimg"></Card.Img>): 
                            <Card.Img className="w-100 d-block img-fluid" id="overlayimg"></Card.Img>}
                            <Card.ImgOverlay>
                                <Card.Body>
                                    <Card.Text style={{color: 'black'}}>
                                        {typeof note === 'object'? (note.noteType === 'Text'? note.payload: "HEY"):note}
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
                            <h4>{typeof note === 'object'? note.noteType: "Text"}</h4> 
                            </Col>
                            <Col></Col>
                            <Col>
                            <i className="fa fa-times fa-2x" style={{color: '#a6a6a6'}}></i>
                            </Col>
                        </Row>
                    </div>
                </Col>
            )}
        </Row>
    );
}

export default NoteList;