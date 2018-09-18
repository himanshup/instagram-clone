import { UPLOAD_IMAGE } from "../constants/action-types";

export default function(state = null, action) {
  switch (action.type) {
    case UPLOAD_IMAGE:
      return action.payload;
    default:
      return state;
  }
}
