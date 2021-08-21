import React from 'react'
import logoImg from "../../img/logo/logo-black.svg"
import { connect } from 'react-redux'
import { getPendingPartnerByUserId, updatePartnerConnectedAccount } from '../../actions/admin'
import Spaces from './Spaces'
import { Link } from 'react-router-dom'

const FailedConnectAccount = ({ match, getPendingPartnerByUserId, pendingPartnerIsLoaded, pendingPartner, updatePartnerConnectedAccount, partnerConnectedAccountUpdateLink }) => {
  const [buttonName, setButtonName] = React.useState("UPDATE MY ACCOUNT")

  React.useEffect(() => {
    if (!pendingPartnerIsLoaded) {
      getPendingPartnerByUserId(match.params.id)
    }
  }, [match.params.id, getPendingPartnerByUserId, pendingPartnerIsLoaded])

  React.useEffect(() => {
    if (partnerConnectedAccountUpdateLink.length) {
      window.location.href = partnerConnectedAccountUpdateLink;
    }
  }, [partnerConnectedAccountUpdateLink])

  const updateAccount = () => {
    setButtonName("Processing...")
    updatePartnerConnectedAccount(match.params.id)
  }

  return (
    <>
      <div className="container-fluid bg-partner">
        <div className="top-header">
          <Link to="/home"><img src={logoImg} alt="logo" /></Link>
          <div>
            <Link to="/home"><span className="glyphicon glyphicon-home"></span>&nbsp;HOME</Link>
            <Link to="/partner#"><span className="glyphicon glyphicon-book"></span>&nbsp;PARTNER APPLICATION</Link>
            <Link to="/login"><span className="glyphicon glyphicon-log-in"></span>&nbsp;LOGIN</Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">

          </div>
          <div className="col-md-8">
            <h1 className="w3-center">CONNECTED ACCOUNT HAVE SOME ISSUES</h1>
            <h4 className="w3-justify" style={{ margin: "0px 20px" }}>
              Hi <span className="w3-text-indigo">{pendingPartner.name}</span>. We detected some issues on your account connected to our stripe dashboard. You need to provide more information to Stripe to enable payments and payouts on this account. <br />INFORMATION NEEDED - DUE NOW (Bank account or debit card). You will receive an email, too. You can update your information by clicking the <span onClick={() => updateAccount()} className="w3-text-indigo">UPDATE MY ACCOUNT</span> button below.
              We will let you know again when your connected account is <span className="w3-text-indigo">ENABLED</span>. Thank you. <br /><br />DCGONBOARDING Team.
            </h4>
            <div className="w3-right">
              <button onClick={() => updateAccount()} className="w3-button w3-grey w3-round">{buttonName}</button>
              <Spaces spaceLength={3} />
              <Link to="/home" style={{ textDecoration: "none" }} className="w3-button w3-grey w3-round">RETURN TO HOMEPAGE</Link>
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
  pendingPartnerIsLoaded: state.admin.pendingPartnerIsLoaded,
  pendingPartner: state.admin.pendingPartner,
  partnerConnectedAccountUpdateLink: state.admin.partnerConnectedAccountUpdateLink
})

export default connect(mapStateToProps, { getPendingPartnerByUserId, updatePartnerConnectedAccount })(FailedConnectAccount)