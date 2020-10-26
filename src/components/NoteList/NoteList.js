import React, { useState, Suspense } from "react";
import useBoard from '../../hooks/useBoard';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import './NoteList.css';
import axios from 'axios';
import { rstrtohex } from "jsrsasign";

export const NoteList = (props) => {

    const { board, addNote } = useBoard();

    const [isLoading, setLoading] = useState(false);

    const [showEditModal, onHandleModalVisibility] = useState(false);

    const [multimediaFiles, setMultimediaFile] = useState([])

    function containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i].name === obj.name) {
                return list[i];
            }
        }

        return null;
    }

    const retrieveMultimediaFile = (targetUuid) => {
        console.log("Requesting file with uuid: " + targetUuid);
        axios.get("http://localhost:3096/download?id=" + targetUuid, {
            responseType: 'blob'
        })
            .then(res => {

                if (res.status === 200) {
                    var reader = new window.FileReader();
                    reader.readAsDataURL(res.data);
                    let backImage = new Image();
                    reader.onload = function () {

                        var imageDataUrl = reader.result;
                        backImage.src = imageDataUrl;
                        console.log("src");
                        console.log(Object.values(backImage));
                        setLoading(false);
                        let newObj = { 'name': targetUuid, 'src': backImage.src };
                        setMultimediaFile(multimediaFiles => [...multimediaFiles, newObj]);
                        return <Card.Img className="w-100 d-block img-fluid" src={backImage.src} id="overlayimg2"></Card.Img>;
                    }

                }
                else {
                    return <Card.Img className="w-100 d-block img-fluid" id="overlayimg"></Card.Img>;
                }
            })
    }

    const handleImageRender = (uuid) => {
        let obj = { 'name': uuid };
        let existingObject = containsObject(obj, multimediaFiles);

        if (existingObject === null && !isLoading) {
            setLoading(true);
            console.log("Image loading from server");
            retrieveMultimediaFile(uuid);
            return <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>;
        }
        else if (existingObject !== null && !isLoading) {
            console.log("Image already in memory");
            let src = existingObject.src;
            return <Card.Img className="w-100 d-block img-fluid" src={src} id="overlayimg2"></Card.Img>;
        }

    }



    const handleNoteClicked = (e) => {
        e.preventDefault();
        onHandleModalVisibility(true);
        console.log("Opening modal for existing note.");
    }


    //TODO: ADD TYPE OF NOTE TO THE OBJECT TO RENDER IN EACH COMPONENT
    return (

        <Row id="notesListRow">
            {board.notes.map((note, index) =>
                <Col className="col-sm-6 col-md-4 portfolio-item" key={typeof note === 'object' ? note.id : index}>
                    <a className="portfolio-link" data-toggle="modal" onClick={handleNoteClicked}>
                        <Card className="portfolio-hover-content" style={{ height: "262 px" }}>
                            {typeof note === 'object' ? (note.noteType === 'Image' ? handleImageRender(note.payload)
                                : <Card.Img className="w-100 d-block img-fluid" id="overlayimg"></Card.Img>) :
                                <Card.Img className="w-100 d-block img-fluid" id="overlayimg"></Card.Img>}
                            <Card.ImgOverlay>
                                <Card.Body>
                                    <Card.Text style={{ color: 'black' }}>
                                        {typeof note === 'object' ? (note.noteType === 'Text' ? note.payload : "") : note}
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
                                <h4>{typeof note === 'object' ? note.noteType : "Text"}</h4>
                            </Col>
                            <Col></Col>
                            <Col>
                                <i className="fa fa-times fa-2x" style={{ color: '#a6a6a6' }}></i>
                            </Col>
                        </Row>
                    </div>
                </Col>
            )}
        </Row>
    );
}

export default NoteList;