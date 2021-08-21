import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import admin from './admin'
import partner from './partner'

export default combineReducers({
  alert,
  auth,
  admin,
  partner
})
