import validate from 'validate.js';

export const login = {
  email: {
    presence: { message: 'email.presence' },
    email: { message: 'email.invalid' },
  },
  password: {
    presence: { message: 'password.presence' },
  }
};

export const signUp = {
  username: {
    presence: { message: 'name.presence' },
  },
  email: {
    presence: { message: 'email.presence' },
    email: { message: 'email.invalid' }
  },
  password: {
    presence: { message: 'password.presence' }
  },
  passwordConfirmation: {
    presence: { message: 'passwordConfirmation.presence' },
    equality: { attribute: 'password', message: 'passwordConfirmation.equality' }
  },
};

export const createTarget = {
  title: {
    presence: { message: 'target.title.presence' },
  },
  radius: {
    presence: { message: 'target.radius.presence' },
  },
  topic_id: {
    presence: { message: 'target.topic.presence' },
  }
};

export const validations = (constraints, props = {}) =>
  data => validate(data.toJS(), constraints, props) || {};
