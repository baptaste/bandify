import { connect } from 'react-redux';
import Messages from 'src/components/Messages';

const mapStateToProps = (state) => ({
  messages: state.settings.messages,
  receiverName: state.settings.reicever_name,
  reicever: state.settings.reicever_id,
  sender: state.settings.sender_id,
  isTyping: state.socket.isTyping,
});

export default connect(mapStateToProps, null)(Messages);
