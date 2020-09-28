import React from 'react';

export default function (props) {
    return (
        <div className="content">
            {JSON.stringify(props, null, 2)}
        </div>
    )    
}
