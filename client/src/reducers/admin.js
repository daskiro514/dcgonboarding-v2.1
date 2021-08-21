import { 
  // PARTNER
  PARTNER_REGISTER_SUCCESS, 
  PENDINGPARTER_LOADED, 
  UPDATE_PARTNER_CONNECTED_ACCOUNT,
  PENDING_PARTNERS_LOADED,
  SHOW_PENDING_PARTNER_DETAIL,
  UPDATING_PARTNER_NOW,
  PARTNERS_LOADED,
  PARTNER_PAGE_LOADED,
  // PRODUCT
  ADMIN_PRODUCTS_LOADED,
  ADMIN_PRODUCT_EDIT_PAGE_LOADED,
  PRODUCT_IS_UPDATING,
  // CUSTOMER
  ADMIN_CUSTOMERS_LOADED,
  CUSTOMER_FOR_SUSPEND_LOADED,
  CUSTOMER_PAGE_IS_UPDATING,
  ADMIN_TRANSACTIONS_LOADED,
  CUSTOMER_PAGE_LOADED,
  CUSTOMER_TRANSACTIONS_LOADED,
  // REPORT
  ADMIN_REPORTS_LOADED,
  REPORT_BYID_LOADED
} from '../actions/types'

const initialState = {
  partnerIsRegistered: false,
  pendingPartnerIsLoaded: false,
  pendingPartner: {},
  connectURL: "",
  partnerConnectedAccountUpdateLink: '',
  pendingPartners: [],
  // FOR MASTER ADMIN / PENDING PARTNERS
  showPartner: 'none',
  PartnerForShow: {},
  updatingPartnerNow: false,
  // FOR MASTER ADMIN / PARTNERS
  partners: [],
  currentPartner: {},
  // FOR MASTER ADMIN / PRODUCTS
  products: [],
  productForEdit: {},
  productIsUpdating: false,
  // FOR MASTER ADMIN / CUSTOMERS
  customers: [],
  suspendCustomerModalShow: false,
  customerForSuspend: {},
  customerPageIsUpdating: false,
  currentCustomer: {},
  customerTransactions: [],
  // FOR MASTER DASHBOARD
  transactions: [],
  // FOR MASTER REPORTS
  reports: [],
  baseURL: "http://" + window.location.hostname + (window.location.port ? ":5000/files/" : "/files/"),
  reportByID: {}
};

function partnerReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // PARTNER
    case PARTNER_REGISTER_SUCCESS:
      return {
        ...state,
        partnerIsRegistered: payload.success,
        connectURL: payload.connectURL,
      }
    case PENDINGPARTER_LOADED:
      return {
        ...state,
        pendingPartnerIsLoaded: payload.success,
        pendingPartner: payload.partner
      }
    case UPDATE_PARTNER_CONNECTED_ACCOUNT:
      return {
        ...state,
        partnerConnectedAccountUpdateLink: payload.connectURL
      }
    case PENDING_PARTNERS_LOADED:
      return {
        ...state,
        pendingPartners: payload
      }
    case SHOW_PENDING_PARTNER_DETAIL:
      return {
        ...state,
        showPartner: payload.show,
        PartnerForShow: payload.pendingPartner
      }
    case UPDATING_PARTNER_NOW:
      return {
        ...state,
        updatingPartnerNow: payload
      }
    case PARTNERS_LOADED:
      return {
        ...state,
        partners: payload
      }
    case PARTNER_PAGE_LOADED:
      return {
        ...state,
        currentPartner: payload
      }
    // PRODUCT
    case ADMIN_PRODUCTS_LOADED:
      return {
        ...state,
        products: payload.products
      }
    case ADMIN_PRODUCT_EDIT_PAGE_LOADED:
      return {
        ...state,
        productForEdit: payload
      }
    case PRODUCT_IS_UPDATING:
      return {
        ...state,
        productIsUpdating: payload
      }
    // CUSTOMER
    case ADMIN_CUSTOMERS_LOADED:
      return {
        ...state,
        customers: payload.customers
      }
    case CUSTOMER_PAGE_LOADED:
      return {
        ...state,
        currentCustomer: payload
      }
    case CUSTOMER_FOR_SUSPEND_LOADED: {
      return {
        ...state,
        suspendCustomerModalShow: payload.show,
        customerForSuspend: payload.customer
      }
    }
    case CUSTOMER_PAGE_IS_UPDATING:
      return {
        ...state,
        customerPageIsUpdating: payload
      }
    case CUSTOMER_TRANSACTIONS_LOADED:
      return {
        ...state,
        customerTransactions: payload
      }
    case ADMIN_TRANSACTIONS_LOADED:
      return {
        ...state,
        transactions: payload.transactions
      }
    // REPORT
    case ADMIN_REPORTS_LOADED:
      return {
        ...state,
        reports: payload.reports
      }
    case REPORT_BYID_LOADED:
      return {
        ...state,
        reportByID: payload.report
      }
    default:
      return state;
  }
}

export default partnerReducer;
