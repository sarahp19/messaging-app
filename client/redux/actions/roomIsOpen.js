export default (args) => ({
  type: 'counter/roomIsOpen',
  payload: {
    counter: args,
  },
});
