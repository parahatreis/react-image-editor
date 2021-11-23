/* eslint-disable default-case */
// Types
import { InitialStateType } from '../types/Type';

// Declare Type
const initialState: InitialStateType = {
  modalVisible: false,
  imageFile: null,
};

// Reducer for state
export default function imagesReducer(state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case 'SET_IMAGE_FILE':
      return {
        ...state,
        imageFile: payload,
      };
    case 'SET_MODAL_VISIBLE':
      return {
        ...state,
        modalVisible: payload,
      };
    default:
      return state;
  }
}
