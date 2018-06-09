export default (state = null, action) => {
  switch (action.type) {
    case 'select_company':
      return action.payload;
    default:
      return state;
  }
};
