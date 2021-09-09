import api from '../utils/api'
import { setAlert } from './alert'
import { loadUser } from './auth'
import {
  // PARTNERS
  PARTNER_REGISTER_SUCCESS,
  REGISTER_FAIL,
  PENDINGPARTER_LOADED,
  UPDATE_PARTNER_CONNECTED_ACCOUNT,
  PENDING_PARTNERS_LOADED,
  SHOW_PENDING_PARTNER_DETAIL,
  UPDATING_PARTNER_NOW,
  PARTNERS_LOADED,
  PARTNER_PAGE_LOADED,
  // PRODUCTS
  ADMIN_PRODUCTS_LOADED,
  ADMIN_PRODUCT_EDIT_PAGE_LOADED,
  PRODUCT_IS_UPDATING,
  // CUSTOMERS
  ADMIN_CUSTOMERS_LOADED,
  CUSTOMER_FOR_SUSPEND_LOADED,
  CUSTOMER_PAGE_IS_UPDATING,
  ADMIN_TRANSACTIONS_LOADED,
  CUSTOMER_PAGE_LOADED,
  CUSTOMER_TRANSACTIONS_LOADED,
  // REPORTS
  ADMIN_REPORTS_LOADED,
  REPORT_BYID_LOADED
} from './types'

export const checkPartnerUsernameEmail = (formData) => async dispatch => {
  const res = await api.post('/admin/checkPartnerUsernameEmail', formData)
  if (res.data.success) {
    if (res.data.isExist) {
      dispatch(setAlert(res.data.notification, 'danger'))
    }
    return res.data.isExist
  }
}

export const partnerRegister = (formData, history) => async dispatch => {
  try {
    const res = await api.post('/admin/partnerRegister', formData)

    const partnerID = res.data.pendingPartner._id
    localStorage.setItem('partnerID', partnerID)

    dispatch({
      type: PARTNER_REGISTER_SUCCESS,
      payload: res.data
    })
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: REGISTER_FAIL
    })
    history.push('/home')
  }
}

export const getPendingPartnerByUserId = userID => async dispatch => {
  const res = await api.get(`/admin/getPendingPartnerByUserId/${userID}`)

  dispatch({
    type: PENDINGPARTER_LOADED,
    payload: res.data
  })
}

export const updatePartnerConnectedAccount = userID => async dispatch => {
  const res = await api.get(`/admin/updatePartnerConnectedAccount/${userID}`)

  dispatch({
    type: UPDATE_PARTNER_CONNECTED_ACCOUNT,
    payload: res.data
  })
}
// PENDING PARTNER
export const getPendingPartners = () => async dispatch => {
  const res = await api.get('/admin/getPendingPartners')

  dispatch({
    type: PENDING_PARTNERS_LOADED,
    payload: res.data
  })
}

export const showPartnerDetail = (show, pendingPartner) => dispatch => {
  dispatch({
    type: SHOW_PENDING_PARTNER_DETAIL,
    payload: { show, pendingPartner }
  })
}

export const deletePendingPartner = userID => async dispatch => {
  let deleteAnswer = window.confirm("Are you sure to delete this PARTNER?")
  if (deleteAnswer) {
    dispatch({
      type: UPDATING_PARTNER_NOW,
      payload: true
    })
    const res = await api.delete(`/admin/deletePendingPartner/${userID}`)
    if (res.data.partnerIsDeleted) {
      dispatch(getPendingPartners())
    }
    dispatch({
      type: UPDATING_PARTNER_NOW,
      payload: false
    })
  }
}

export const approvePendingPartner = formData => async dispatch => {
  dispatch({
    type: UPDATING_PARTNER_NOW,
    payload: true
  })
  const res = await api.post('/admin/approvePartner', formData)
  if (res.data.partnerIsApproved) {
    dispatch(getPendingPartners())
  }
  dispatch({
    type: UPDATING_PARTNER_NOW,
    payload: false
  })
}

export const updateConnectedAccount = userID => async dispatch => {
  dispatch({
    type: UPDATING_PARTNER_NOW,
    payload: true
  })
  const res = await api.get(`/admin/updateConnectedAccount/${userID}`)
  if (res.data.updateLinkSent) {
    dispatch(getPendingPartners())
  }
  dispatch({
    type: UPDATING_PARTNER_NOW,
    payload: false
  })
}
// PARTNER
export const getPartners = () => async dispatch => {
  const res = await api.get('/admin/getPartners')

  if (res.data.success) {
    dispatch({
      type: PARTNERS_LOADED,
      payload: res.data.partners
    })
  }
}

export const goPartnerPage = (partner, history) => async dispatch => {
  dispatch({
    type: PARTNER_PAGE_LOADED,
    payload: partner,
  })
  history.push(`/partner/${partner._id}`)
}

export const suspendPartner = partnerID => async dispatch => {
  const res = await api.get(`/admin/suspendPartner/${partnerID}`)
  if (res.data.success) {
    dispatch(getPartners())
  }
}

export const unsuspendPartner = partnerID => async dispatch => {
  const res = await api.get(`/admin/unsuspendPartner/${partnerID}`)
  if (res.data.success) {
    dispatch(getPartners())
  }
}

export const deletePartner = partnerID => async dispatch => {
  const res = await api.delete(`/admin/deletePartner/${partnerID}`)
  if (res.data.success) {
    dispatch(getPartners())
  }
}

export const resetPassword = formData => async dispatch => {
  const res = await api.post('/admin/resetPassword', formData)
  if (res.data.success) {
    dispatch(setAlert('Password Reset Success!', 'success'))
    dispatch(getPartners())
    dispatch(loadUser())
  }
}

// PRODUCTS
export const getProducts = () => async dispatch => {
  const res = await api.get('/admin/getProducts')
  if (res.data.success) {
    dispatch({
      type: ADMIN_PRODUCTS_LOADED,
      payload: res.data
    })
  }
}

export const approveProduct = productID => async dispatch => {
  const res = await api.get(`/admin/approveProduct/${productID}`)
  if (res.data.success) {
    dispatch(getProducts())
  }
}

export const goEditProductPage = (product, history) => async dispatch => {
  dispatch({
    type: ADMIN_PRODUCT_EDIT_PAGE_LOADED,
    payload: product,
  })
  history.push(`/editProduct/${product._id}`)
}

export const updateProduct = (product, history) => async dispatch => {
  dispatch({
    type: PRODUCT_IS_UPDATING,
    payload: true
  })
  const res = await api.post('/admin/updateProduct', product)
  if (res.data.success) {
    dispatch(getProducts())
    dispatch({
      type: PRODUCT_IS_UPDATING,
      payload: false
    })
  }
  history.push('/products')
}

export const suspendProduct = (productID) => async dispatch => {
  const res = await api.get(`/admin/suspendProduct/${productID}`)
  if (res.data.success) {
    dispatch(getProducts())
  }
}

// CUSTOMERS
export const getAllCustomers = () => async dispatch => {
  const res = await api.get('/admin/getAllCustomers')
  if (res.data.success) {
    dispatch({
      type: ADMIN_CUSTOMERS_LOADED,
      payload: res.data
    })
  }
}

export const goCustomerPage = (customer, history) => async dispatch => {
  dispatch({
    type: CUSTOMER_PAGE_LOADED,
    payload: customer,
  })
  history.push(`/customer/${customer._id}`)
}

export const showSuspendCustomerOptions = (show, customer) => dispatch => {
  dispatch({
    type: CUSTOMER_FOR_SUSPEND_LOADED,
    payload: {
      show, customer
    }
  })
}

export const changeCustomerPageState = isUpdating => async dispatch => {
  dispatch({
    type: CUSTOMER_PAGE_IS_UPDATING,
    payload: isUpdating
  })
}

export const suspendCustomer = formData => async dispatch => {
  dispatch(changeCustomerPageState(true))
  const res = await api.post('/admin/suspendCustomer', formData)
  if (res.data.success) {
    dispatch(getAllCustomers())
    dispatch(changeCustomerPageState(false))
  }
}

export const restoreCustomer = customerID => async dispatch => {
  dispatch(changeCustomerPageState(true))
  const res = await api.get(`/admin/restoreCustomer/${customerID}`)
  if (res.data.success) {
    dispatch(getAllCustomers())
    dispatch(changeCustomerPageState(false))
  }
}

export const deleteCustomer = customerID => async dispatch => {
  dispatch(changeCustomerPageState(true))
  const res = await api.delete(`/admin/deleteCustomer/${customerID}`)
  if (res.data.success) {
    dispatch(getAllCustomers())
    dispatch(changeCustomerPageState(false))
  }
}

export const getCustomerTransactions = customerID => async dispatch => {
  const res = await api.get(`/admin/getCustomerTransactions/${customerID}`)
  if (res.data.success) {
    dispatch({
      type: CUSTOMER_TRANSACTIONS_LOADED,
      payload: res.data.transactions
    })
  }
}

export const getAdminTransactions = adminID => async dispatch => {
  const res = await api.get(`/admin/getAdminTransactions/${adminID}`)
  if (res.data.success) {
    dispatch({
      type: ADMIN_TRANSACTIONS_LOADED,
      payload: res.data
    })
  }
}

// REPORTS
export const addNewReport = formData => async dispatch => {
  const res = await api.post('/admin/addNewReport', formData)
  if (res.data.success) {
    dispatch(getReports())
  }
}

export const getReports = () => async dispatch => {
  const res = await api.get('/admin/getReports')
  if (res.data.success) {
    dispatch({
      type: ADMIN_REPORTS_LOADED,
      payload: res.data
    })
  }
}

export const getReportByID = reportID => async dispatch => {
  const res = await api.get(`/admin/getReportByID/${reportID}`)
  if (res.data.success) {
    dispatch({
      type: REPORT_BYID_LOADED,
      payload: res.data
    })
  }
}

export const updateReport = formData => async dispatch => {
  const res = await api.post('/admin/updateReport', formData)
  if (res.data.success) {
    dispatch(getReports())
  }
}

export const deleteReport = reportID => async dispatch => {
  const res = await api.delete(`/admin/deleteReport/${reportID}`)
  if (res.data.success) {
    dispatch(getReports())
  }
}