/* eslint-disable default-case */
import {
  SET_MODAL_VISIBLE,
  SET_IMAGE_FILE
} from "../actions/actionTypes";

const initialState = {
  modalVisible: false,
  imageFile: null,
};

export default function imagesReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_IMAGE_FILE:
      return {
        ...state,
        imageFile: payload,
      };
    case SET_MODAL_VISIBLE:
      return {
        ...state,
        modalVisible: payload,
      };
    default:
      return state;
  }
}
