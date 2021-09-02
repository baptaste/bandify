import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const ChatForm = ({
  messageInputValue, onMessageInputChange, onChatFormSubmit, sendTyping, sendNoTyping,
}) => (
  <form
    className="chatroom__form"
    onSubmit={onChatFormSubmit}
  >
    <input
      className="chatroom__form-input"
      type="text"
      placeholder="Saisir votre message..."
      value={messageInputValue}
      onChange={(evt) => {
        onMessageInputChange(evt.target.value);
        sendTyping();
        setTimeout(sendNoTyping, 2000);
      }}
      onBlur={sendNoTyping}
    />
    <button
      className="chatroom__form-button"
      type="submit"
      onClick={onChatFormSubmit}
    >
      <i className="fas fa-paper-plane" />
    </button>
  </form>
);

ChatForm.propTypes = {
  messageInputValue: PropTypes.string.isRequired,
  onMessageInputChange: PropTypes.func.isRequired,
  onChatFormSubmit: PropTypes.func.isRequired,
  sendTyping: PropTypes.func.isRequired,
  sendNoTyping: PropTypes.func.isRequired,
};

export default ChatForm;
