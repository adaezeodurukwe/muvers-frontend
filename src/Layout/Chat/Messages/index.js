import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';
import clsx from "clsx"

const Messages = ({ messages }) => {
  const message = () => {
    return messages.map(message => {
      return (
        <div key={message.id.toString()} className={clsx("p-2",{ "message-customer": message.senderName !== "admin" }, {
          "message-admin": message.senderName === "admin"
        })}>
          <h5>{message.senderName}</h5>
          <p>{message.message}</p>
        </div>
      )
    })
  }

  return (
    <ScrollToBottom className="message">
      {message()}
    </ScrollToBottom>
  )
}

export default Messages
