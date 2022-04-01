import { SET_UPDATE_PAYMENT_INFO } from "../actions/types"

const initialState = {
  customer: {}
}

const partnerReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_UPDATE_PAYMENT_INFO:
      return {
        ...state,
        customer: payload
      }
    default:
      return state;
  }
}

export default partnerReducer