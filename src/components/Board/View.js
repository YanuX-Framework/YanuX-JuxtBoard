import React, { useState } from 'react';
import useBoard from '../../hooks/useBoard';

export default function (props) {
    const { board, addNote } = useBoard();

    const [noteText, setNoteText] = useState('Hello World');

    const handleNoteTextChange = (event) => {
        setNoteText(event.target.value);
    };

    const handleAddNoteButtonClick = () => {
        console.log('Note Text:', noteText);
        addNote(noteText);
    };

    //TODO: Remake this use react-bootstrap components: https://react-bootstrap.github.io/
    return (
        <React.Fragment>
            <div>
                <textarea value={noteText} onChange={handleNoteTextChange}></textarea>
                <br />
                <button onClick={handleAddNoteButtonClick}>Add Note</button>
            </div>
            <h1>Board State</h1>
            <div>
                {JSON.stringify(board, null, 2)}
            </div>
        </React.Fragment>
    )
}
