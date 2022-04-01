import api from '../utils/api'
import { SET_UPDATE_PAYMENT_INFO } from './types'
import { setAlert } from './alert'

export const getCustomerUpdatePaymentInfo = (customerID) => async dispatch => {
  const res = await api.get(`/customer/getCustomerUpdatePaymentInfo/${customerID}`)

  if (res.data.success) {
    dispatch({
      type: SET_UPDATE_PAYMENT_INFO,
      payload: res.data.customer
    })
  }
}

export const updateCustomerPaymentMethod = (formData) => async dispatch => {
  const res = await api.post('/customer/updateCustomerPaymentMethod', formData)

  if (res.data.success) {
    window.location.href= '/thanks-payment-update'
  } else {
    dispatch(setAlert(res.data.message, 'danger'))
  }
}