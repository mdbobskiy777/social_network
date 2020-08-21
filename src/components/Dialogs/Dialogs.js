import React from "react";
import S from "./dialogs.module.css";
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";

const showDialogsList = (dialogsList) => {
    return dialogsList.map((dialog) => {
        return <Dialog key={dialog.dialogId} dialogName={dialog.dialogName}
                       dialogId={dialog.dialogId} avatarURL={dialog.avatarURL}/>
    })
}
const showMessages = (messages) => {
    if (!messages) return <div>There is no messages</div>;
    return messages.map((message) => {
        return <Message key={message + 1} message={message}/>
    })
}
const showCurrentDialogValue = (currentDialog) => {
    if (isNaN(currentDialog)) {
        return 0;
    } else {
        return currentDialog;
    }
}

const Dialogs = (props) => {

    let currentDialog = window.location.pathname.substr(-1);

    let DialogsList = showDialogsList(props.messagesPage.dialogsList);
    let ListMessages = showMessages(props.messagesPage.dialogsList[showCurrentDialogValue(currentDialog)].messages);

    let sendMessage = () => {
        props.dispatch({type: "SEND_MESSAGE", dialogNumber:currentDialog});
    }

    let onNewMessageText = (e) => {
        props.dispatch({type: "UPDATE_MESSAGE_TEXT", text: e.target.value});
    }

    return (
        <div className={S.dialogs}>
            <div className={S.dialogsList}>
                {DialogsList}
            </div>
            <div className={S.messages}>
                <div>
                    {/*захардкодил*/}
                    {ListMessages}
                </div>
                <div className={S.newMessage}>
                    <div>
                        <textarea onChange={onNewMessageText}  value={props.messagesPage.newMessageText}/>
                    </div>
                    <div>
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dialogs;