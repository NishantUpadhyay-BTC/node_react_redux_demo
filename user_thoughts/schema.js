var Schema = {
  users: {
    id: {type: 'increments', nullable: false, primary: true},
    name: {type: 'string', maxlength: 150, nullable: false}
  },

  thoughts: {
    id: {type: 'increments', nullable: false, primary: true},
    message: { type: 'text'}
  }
};

module.exports = Schema;
