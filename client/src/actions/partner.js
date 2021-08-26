import api from '../utils/api'
import { loadUser } from './auth'
import {
  ONETIME_PRODUCT_CREATE_INPROGRESS,
  UPDATING_ONE_TIME_PRODUCT_PAGE_NOW,
  SUBSCRIPTION_PRODUCT_CREATE_INPROGRESS,
  UPDATING_SUBSCRIPTION_PRODUCT_PAGE_NOW,
  PARTNER_PRODUCTS_LOADED,
  PARTNER_TEMP_USER_LOADED,
  PARTNER_SALE_PRODUCT_LOADED,
  PUSBLISHABLE_KEY_LOADED,
  CUSTOMER_CREATE_INPROGRESS,
  CUSTOMER_CREATED,
  PARTNER_TRANSACTIONS_LOADED,
  PARTNER_CUSTOMERS_LOADED,
  PAYMENT_INTENT_LOADED,
  PARTNER_COURSES_LOADED,
  CUSTOMER_COURSE_LOADED,
  EDIT_PAGE_ISLOADING
} from '../actions/types'

export const onetimeProductCreateInprogress = status => async dispatch => {
  dispatch({
    type: ONETIME_PRODUCT_CREATE_INPROGRESS,
    payload: status
  })
}

export const addOneTimeProductToStripe = formData => async dispatch => {
  dispatch({
    type: UPDATING_ONE_TIME_PRODUCT_PAGE_NOW,
    payload: true
  })

  const res = await api.post('/partner/addOneTimeProductToStripe', formData)
  if (res.data.success) {
    dispatch(getProducts(formData.productOwner))
    dispatch(onetimeProductCreateInprogress(false))
  }

  dispatch({
    type: UPDATING_ONE_TIME_PRODUCT_PAGE_NOW,
    payload: false
  })
}

export const updateOneTimeProduct = formData => async dispatch => {
  dispatch({
    type: UPDATING_ONE_TIME_PRODUCT_PAGE_NOW,
    payload: true
  })

  const res = await api.post('/partner/updateOneTimeProduct', formData)
  if (res.data.success) {
    dispatch(getProducts(formData.productOwner))
    dispatch({
      type: UPDATING_ONE_TIME_PRODUCT_PAGE_NOW,
      payload: false
    })
  }
}

export const subscriptionProductCreateInprogress = status => async dispatch => {
  dispatch({
    type: SUBSCRIPTION_PRODUCT_CREATE_INPROGRESS,
    payload: status
  })
}

export const addSubscriptionProductToStripe = formData => async dispatch => {
  dispatch({
    type: UPDATING_SUBSCRIPTION_PRODUCT_PAGE_NOW,
    payload: true
  })

  const res = await api.post('/partner/addSubscriptionProductToStripe', formData)
  if (res.data.success) {
    dispatch(getProducts(formData.productOwner))
    dispatch(subscriptionProductCreateInprogress(false))
  }

  dispatch({
    type: UPDATING_SUBSCRIPTION_PRODUCT_PAGE_NOW,
    payload: false
  })
}

export const updateSubscriptionProduct = formData => async dispatch => {
  dispatch({
    type: UPDATING_SUBSCRIPTION_PRODUCT_PAGE_NOW,
    payload: true
  })

  const res = await api.post('/partner/updateSubscriptionProduct', formData)
  if (res.data.success) {
    dispatch(getProducts(formData.productOwner))
    dispatch({
      type: UPDATING_SUBSCRIPTION_PRODUCT_PAGE_NOW,
      payload: false
    })
  }
}

export const getProducts = userID => async dispatch => {
  const res = await api.get(`/partner/getProducts/${userID}`)
  if (res.data.success) {
    dispatch({
      type: PARTNER_PRODUCTS_LOADED,
      payload: res.data
    })
  }
}

export const getTempUser = userID => async dispatch => {
  const res = await api.get(`/partner/getTempUser/${userID}`)
  if (res.data.success) {
    dispatch({
      type: PARTNER_TEMP_USER_LOADED,
      payload: res.data.user
    })
  }
}

export const getSalesProducts = userID => async dispatch => {
  const res = await api.get(`/partner/getSalesProducts/${userID}`)
  if (res.data.success) {
    dispatch({
      type: PARTNER_PRODUCTS_LOADED,
      payload: res.data
    })
  }
}

export const getProductByID = productID => async dispatch => {
  const res = await api.get(`/partner/getProductByID/${productID}`)
  if (res.data.success) {
    dispatch({
      type: PARTNER_SALE_PRODUCT_LOADED,
      payload: res.data
    })
  }
}

export const getPublishableKey = () => async dispatch => {
  const res = await api.get('/partner/getPublishableKey')
  if (res.data.success) {
    localStorage.setItem('stripePublishableKey', res.data.publishableKey)
    dispatch({
      type: PUSBLISHABLE_KEY_LOADED,
      payload: res.data
    })
  }
}

export const createCustomer = (formData, history, sellerID) => async dispatch => {
  dispatch({
    type: CUSTOMER_CREATE_INPROGRESS,
    payload: true
  })
  const res = await api.post('/partner/createCustomer', formData)
  if (res.data.success) {
    dispatch({
      type: CUSTOMER_CREATED,
      payload: res.data
    })
  }
  dispatch({
    type: CUSTOMER_CREATE_INPROGRESS,
    payload: false
  })
  history.push(`/sales/${sellerID}`)
}

export const getPartnerTransactions = partnerID => async dispatch => {
  const res = await api.get(`/partner/getPartnerTransactions/${partnerID}`)
  if (res.data.success) {
    dispatch({
      type: PARTNER_TRANSACTIONS_LOADED,
      payload: res.data
    })
  }
}

export const getPartnerCustomers = partnerID => async dispatch => {
  const res = await api.get(`/partner/getPartnerCustomers/${partnerID}`)
  if (res.data.success) {
    dispatch({
      type: PARTNER_CUSTOMERS_LOADED,
      payload: res.data
    })
  }
}

export const getPaymentIntent = price => async dispatch => {
  const res = await api.get(`/partner/getPaymentIntent/${price}`)
  if (res.data.success) {
    dispatch({
      type: PAYMENT_INTENT_LOADED,
      payload: res.data
    })
  }
}

export const addTransactionForOneTimeProductSale = (transaction, history, ownerID) => async dispatch => {
  const res = await api.post(`/partner/addTransactionForOneTimeProductSale`, transaction)
  if (res.data.success) {
    history.push(`/sales/${ownerID}`)
  }
}

export const addNewCourse = formData => async dispatch => {
  const res = await api.post('/partner/addNewCourse', formData)
  if (res.data.success) {
    dispatch(getCourses())
  }
}

export const getCourses = partnerID => async dispatch => {
  const res = await api.get(`/partner/getCourses/${partnerID}`)
  if (res.data.success) {
    dispatch({
      type: PARTNER_COURSES_LOADED,
      payload: res.data
    })
  }
}

export const updateCourse = (formData, partnerID) => async dispatch => {
  const res = await api.post('/partner/updateCourse', formData)
  if (res.data.success) {
    dispatch(getCourses(partnerID))
  }
}

export const deleteCourse = (courseID, partnerID) => async dispatch => {
  const res = await api.delete(`/partner/deleteCourse/${courseID}`)
  if (res.data.success) {
    dispatch(getCourses(partnerID))
  }
}

export const getCourseByID = courseID => async dispatch => {
  const res = await api.get(`/partner/getCourseByID/${courseID}`)
  if (res.data.success) {
    dispatch({
      type: CUSTOMER_COURSE_LOADED,
      payload: res.data
    })
  }
}

export const changeEditPageState = state => dispatch => {
  dispatch({
    type: EDIT_PAGE_ISLOADING,
    payload: state
  })
}

export const updateSalesPage = formData => async dispatch => {
  dispatch(changeEditPageState(true))
  const res = await api.post('/partner/updateSalesPage', formData)
  if (res.data.success) {
    dispatch(loadUser())
    dispatch(changeEditPageState(false))
  }
}

export const defaultSalesPage = partnerID => async dispatch => {
  dispatch(changeEditPageState(true))
  const res = await api.get(`/partner/defaultSalesPage/${partnerID}`)
  if (res.data.success) {
    dispatch(loadUser())
    dispatch(changeEditPageState(false))
  }
}

export const updateCoursePage = formData => async dispatch => {
  dispatch(changeEditPageState(true))
  const res = await api.post('/partner/updateCoursePage', formData)
  if (res.data.success) {
    dispatch(loadUser())
    dispatch(changeEditPageState(false))
  }
}

export const defaultCoursePage = partnerID => async dispatch => {
  dispatch(changeEditPageState(true))
  const res = await api.get(`/partner/defaultCoursePage/${partnerID}`)
  if (res.data.success) {
    dispatch(loadUser())
    dispatch(changeEditPageState(false))
  }
}