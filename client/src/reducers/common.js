import {
  GET_PREVIEW,
  RESET_VALUE,
  SUBMIT_NEW_POST,
  EDIT_POST,
  HOVER_POST,
  UNHOVER_POST,
  CHECK_IF_FOLLOWING,
  LOADING,
  SUBMIT_LOADING,
  SET_LOADING
} from "../constants/action-types";

const initialState = {
  prevew: "",
  imagePreviewError: "",
  submitted: false,
  visible: null,
  loading: true,
  submitLoading: false,
  following: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PREVIEW:
      if (action.payload.message) {
        return {
          imagePreviewError: action.payload.message
        };
      }
      return {
        preview: action.payload
      };
    case RESET_VALUE:
      return {
        preview: action.payload,
        imagePreviewError: action.payload
      };
    case SUBMIT_NEW_POST:
      return {
        submitted: action.payload
      };
    case EDIT_POST:
      return {
        imagePreviewError: action.payload
      };
    case HOVER_POST:
      return {
        visible: action.payload
      };
    case UNHOVER_POST:
      return {
        visible: action.payload
      };
    case CHECK_IF_FOLLOWING:
      return {
        following: action.payload
      };
    case LOADING:
      return {
        loading: false
      };
    case SUBMIT_LOADING:
      return {
        submitLoading: true
      };
    case SET_LOADING:
      return {
        loading: action.payload
      };
    default:
      return state;
  }
}
