import { TOGGLE_OPTIONS, TOGGLE_HIDE_CONTENT } from "../../actions/general";

const initState = {
  showOptionsMenu: false,
  showHiddenContent: false,
};

const generalReducer = (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_OPTIONS:
      return { ...state, showOptionsMenu: !state.showOptionsMenu };
    case TOGGLE_HIDE_CONTENT:
      return { ...state, showHiddenContent: !state.showHiddenContent };
    default:
      return { ...state };
  }
};

export default generalReducer;
