import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';
import clsx from "clsx"

const Messages = ({ messages }) => {
  const message = () => {
    return messages.map(message => {
      return (
        <div key={message.id.toString()} className={clsx("px-3 py-2 mb-3",{ "message-customer": message.senderName !== "admin" }, {
          "message-admin": message.senderName === "admin"
        })}>
          <h6>{message.senderName}</h6>
          <p className="mb-0">{message.message}</p>
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
