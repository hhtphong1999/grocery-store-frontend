import React from "react";
import * as CONFIG from '../../../constants/config';

const Messages = ({ loading, messages, deleteMessage }) => {

    if (loading) {
        return <tr><td><h4>Loading Message List...</h4></td></tr>;
    }

    return (
        messages.map(message => (
            <tr key={message.id}>
                <td>{message.name}</td>
                <td>{message.phone}</td>
                <td>{message.email}</td>
                <td className="text-center">{CONFIG.CONVERT_DATETIME(message.created_at)}</td>
                <td>{message.message}</td>
                <td className="text-center">
                    <button type="button" onClick={(e) => deleteMessage(e, message.id)} className="btn2 btn2-danger2 btn2-lg" style={{ width: '70px' }}>Xoá</button>
                </td>
            </tr>
        ))
    );
}

export default Messages;