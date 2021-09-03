import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Message from './Message';
import './style.scss';

const Messages = ({
  messages, receiverName, reicever, sender, isTyping,
}) => {
  // create messageRef
  const messageRef = useRef();
  // UseEffect à chaque chagement du state de messages
  useEffect(() => {
    /* scroll de toute la hauteur de scroll disponible /
    Quand le tableau de message change on appel cet effet */
    messageRef.current.scrollTop = messageRef.current.scrollHeight;
  }, [messages]);
  console.log('messages dans composant Messages: ', messages);
  return (
    <div
    // On y pose la ref ici
      ref={messageRef}
      className="messages"
    >
      <p className="messages__author">{receiverName}</p>
      {messages.map((message) => (
        <Message
          key={message.id}
          {...message}
          reicever={reicever}
          sender={sender}
        />
      ))}
      <span className={`isTyping ${isTyping[1] && (isTyping[0] === reicever)
        ? 'isTyping--visible' : 'isTyping--hiden'}`}
      >{receiverName} écrit
        <div className={`isTyping__anim ${isTyping[1] && (isTyping[0] === reicever)
          ? 'isTyping__anim--first' : 'isTyping__anim--hiden'}`}
        />
        <div className={`isTyping__anim ${isTyping[1] && (isTyping[0] === reicever)
          ? 'isTyping__anim--second' : 'isTyping__anim--hiden'}`}
        />
        <div className={`isTyping__anim ${isTyping[1] && (isTyping[0] === reicever)
          ? 'isTyping__anim--third' : 'isTyping__anim--hiden'}`}
        />
      </span>
    </div>
  );
};

Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
  })).isRequired,
  receiverName: PropTypes.string.isRequired,
  reicever: PropTypes.number,
  sender: PropTypes.number.isRequired,
  isTyping: PropTypes.array,
};

Messages.defaultProps = {
  reicever: null,
  isTyping: [false, 0],
};

export default Messages;
