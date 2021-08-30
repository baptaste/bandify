import axios from 'axios';

const notificationMiddleware = (store) => (next) => (action) => {
  const state = store.getState();

  if (action.type === 'ON_LOGIN_SUCCESS' || action.type === 'RECONNECT_USER') {
    const memberId = state.login.id;
    // invitations
    axios.get(`http://localhost:3000/members/${memberId}/invitations`)
      .then((response) => {
        console.log('response dans notifMiddleware :', response.data);
        response.data.map((inv) => {
          const notif = { notification: 'invitation', invitation: inv };
          return (
            store.dispatch({ type: 'GET_ALL_NOTIFICATIONS', notif, memberId: memberId })
          );
        });
      });
    // messages
    axios.get(`http://localhost:3000/members/${memberId}/messages`)
      .then((response) => {
        console.log('response dans notifMiddleware :', response.data);
        response.data.map((msg) => {
          if (msg.status === false) {
            const notif = { notification: 'message', message: msg };
            return (
              store.dispatch({ type: 'GET_ALL_NOTIFICATIONS', notif, memberId: memberId })
            );
          }
          return null;
        });
      });
  }
  next(action);
};

export default notificationMiddleware;
