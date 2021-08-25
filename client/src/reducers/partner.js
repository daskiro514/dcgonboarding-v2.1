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

const initialState = {
  oneTimeProductPageIsUpdating: false,
  createOneTimeProductInProgress: false,
  subscriptionProductPageIsUpdating: false,
  createSubscriptionProductInProgress: false,
  tempUser: {},
  oneTimeProducts: [],
  subscriptionProducts: [],
  defaultProducts: [],
  productForSale: {},
  stripePublishableKey: localStorage.getItem('stripePublishableKey'),
  customerCreateInProgress: false,
  customer: {},
  customerProduct: {},
  partnerTransactions: [],
  partnerCustomers: [],
  paymentIntent: {},
  checkoutIsInProgress: false,
  partnerCourses: [],
  customerCourse: {},
  editPageIsLoading: false
}

function partnerReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ONETIME_PRODUCT_CREATE_INPROGRESS:
      return {
        ...state,
        createOneTimeProductInProgress: payload
      }
    case UPDATING_ONE_TIME_PRODUCT_PAGE_NOW:
      return {
        ...state,
        oneTimeProductPageIsUpdating: payload
      }
    case SUBSCRIPTION_PRODUCT_CREATE_INPROGRESS:
      return {
        ...state,
        createSubscriptionProductInProgress: payload
      }
    case UPDATING_SUBSCRIPTION_PRODUCT_PAGE_NOW:
      return {
        ...state,
        subscriptionProductPageIsUpdating: payload
      }
    case PARTNER_PRODUCTS_LOADED:
      return {
        ...state,
        oneTimeProducts: payload.oneTimeProducts,
        subscriptionProducts: payload.subscriptionProducts,
        defaultProducts: payload.defaultProducts
      }
    case PARTNER_TEMP_USER_LOADED:
      return {
        ...state,
        tempUser: payload
      }
    case PARTNER_SALE_PRODUCT_LOADED:
      return {
        ...state,
        productForSale: payload.product
      }
    case PUSBLISHABLE_KEY_LOADED:
      return {
        ...state,
        stripePublishableKey: payload.publishableKey
      }
    case CUSTOMER_CREATE_INPROGRESS:
      return {
        ...state,
        customerCreateInProgress: payload
      }
    case CUSTOMER_CREATED:
      return {
        ...state,
        customer: payload.customer,
        customerProduct: payload.customerProduct
      }
    case PARTNER_TRANSACTIONS_LOADED:
      return {
        ...state,
        partnerTransactions: payload.transactions
      }
    case PARTNER_CUSTOMERS_LOADED:
      return {
        ...state,
        partnerCustomers: payload.customers
      }
    case PAYMENT_INTENT_LOADED:
      return {
        ...state,
        paymentIntent: payload.paymentIntent
      }
    case PARTNER_COURSES_LOADED:
      return {
        ...state,
        partnerCourses: payload.courses
      }
    case CUSTOMER_COURSE_LOADED:
      return {
        ...state,
        customerCourse: payload.course
      }
    case EDIT_PAGE_ISLOADING:
      return {
        ...state,
        editPageIsLoading: payload
      }
    default:
      return state;
  }
}

export default partnerReducer;
