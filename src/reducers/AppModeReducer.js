export default (state = null, action) => {
  switch (action.type) {
    case 'select_app_mode':
       return action.mode
    default:
      return state;
  }
};
