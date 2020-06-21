const initialState = {
  menuData: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GETMENU":
      return {
        menuData: action.v,
      };
    default:
      return state;
  }
};
