import api from '../utils/api'
import { setAlert } from './alert'
import { setAuthToken } from '../utils/setAuthToken'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './types'

// Load User
export const loadUser = () => async dispatch => {
  try {
    const res = await api.get('/auth')
    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}

// Register User
export const register = formData => async dispatch => {
  try {
    const res = await api.post('/users', formData)

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: REGISTER_FAIL
    })
  }
}

// Login User
export const login = (username, password) => async dispatch => {
  const body = { username, password }

  try {
    const res = await api.post('/auth', body)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })

    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    if (errors[0].msg === "Your Subscription Has Already Ended.") {
      const res = await api.get(`/auth/getCustomerPaymentUpdateLink/${username}`)
      window.location.href = `/update-customer-payment/${res.data.customerID}`
    }

    dispatch({
      type: LOGIN_FAIL
    })
  }
}

// Forgot Password
export const forgotPassword = (username) => async dispatch => {
  try {
    const res = await api.get(`/auth/forgotPassword/${username}`)
    dispatch(setAlert(res.data.sent[0].msg, 'success'))
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}

// Reset Password
export const resetPassword = (formData, history) => async dispatch => {
  try {
    const res = await api.post('/auth/resetPassword', formData)
    dispatch(setAlert(res.data.sent[0].msg, 'success'))
    history.push('/login')
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}

// Logout
export const logout = () => async dispatch => {
  setAuthToken()
  dispatch({
    type: LOGOUT
  })
}
