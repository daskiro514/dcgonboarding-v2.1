import React from 'react'
import logoImg from "../../img/logo/logo-black.svg"
import { connect } from 'react-redux'
import { } from '../../actions/partner'
import { Link } from "react-router-dom"
import Spaces from './Spaces'

const Thanks = ({ customer, customerProduct }) => {

  return (
    <>
      <div className="container-fluid bg-partner">
        <div className="top-header">
          <Link to="/home"><img src={logoImg} alt="logo" /></Link>
          <div>
            <Link to="/login"><span className="glyphicon glyphicon-log-in"></span><Spaces spaceLength={1} />LOGIN PAGE</Link>
            <Link to="/home"><span className="glyphicon glyphicon-home"></span><Spaces spaceLength={1} />HOME PAGE</Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">

          </div>
          <div className="col-md-8">
            <h1 className="w3-center">THANK YOU</h1>
            {customerProduct.type === 'Subscription Product' ?
              <h4 className="w3-justify" style={{ margin: "0px 20px" }}>
                Thank you <span className="w3-text-indigo">{customer.name}</span>. We have received your product request. Your purchased product is <span className="w3-text-indigo">{customerProduct.name}</span>. And the price is <span className="w3-text-indigo">{customerProduct.price / 100}$ / {customerProduct.recurringInterval}</span>. Your username is <span className="w3-text-indigo">{customer.username}</span> and password is <span className="w3-text-indigo">{customer.passwordForUpdate}</span>. You can login from now on. Thank you. <br /><br />DCGONBOARDING Team.
              </h4> :
              <h4 className="w3-justify" style={{ margin: "0px 20px" }}>
                Thank you <span className="w3-text-indigo">{customer.name}</span>. We have received your product request. Your purchased product is <span className="w3-text-indigo">{customerProduct.name}</span>. And the price is <span className="w3-text-indigo">{customerProduct.price / 100}$</span>. Thank you. <br /><br />DCGONBOARDING Team.
              </h4>
            }

            <div className="w3-right">
              <Link to="/login" style={{ textDecoration: "none" }} className="w3-button w3-grey w3-round">LOGIN PAGE</Link>
              <Spaces spaceLength={1} />
              <Link to="/home" style={{ textDecoration: "none" }} className="w3-button w3-grey w3-round">HOMEPAGE</Link>
            </div><br /><br /><br />
          </div>
          <div className="col-md-2">

          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  customer: state.partner.customer,
  customerProduct: state.partner.customerProduct
})

export default connect(mapStateToProps, {})(Thanks)