import axios from 'axios';

const signupMiddleware = (store) => (next) => (action) => {
  if (action.type === 'SUBMIT_SIGNUP') {
    const state = store.getState();

    const form = new FormData();
    form.append('firstname', state.signup.firstName);
    form.append('lastname', state.signup.lastName);
    form.append('birthdate', state.signup.dateOfBirth);
    form.append('description', state.signup.description);
    form.append('email', state.signup.email);
    form.append('user_password', state.signup.password);
    form.append('city_code', state.signup.code);
    form.append('instruments', JSON.stringify(state.signup.instruments));
    form.append('styles', JSON.stringify(state.signup.styles));
    form.append('file', action.image, action.image.name);

    const options = {
      method: 'POST',
      url: 'http://localhost:3000/signup',
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
      data: form,
    };
    axios(options)
      .then((response) => {
        console.log(response.data);
        store.dispatch({ type: 'ON_LOGIN_SUCCESS', data: response.data });
      })
      .catch((e) => {
        // TODO
        store.dispatch({ type: 'ON_SUBMIT_ERROR', error: e });
      });
    next(action);
  }
  else {
    next(action);
  }
};

export default signupMiddleware;
