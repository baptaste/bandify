import { connect } from 'react-redux';
import Header from 'src/components/Header';

const mapStateToProps = (state) => ({
  isLogged: state.login.isLogged,
});

const mapDispatchToProps = (dispatch) => ({
  toggleIsMenuOpen: () => {
    dispatch({ type: 'SET_IS_OPEN_MENU' });
  },
  toggleIsChatroomOpen: () => {
    dispatch({ type: 'SET_IS_OPEN_CHATROOM' });
  },
  toggleIsNotificationsOpen: () => {
    dispatch({ type: 'SET_IS_OPEN_NOTIF' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
