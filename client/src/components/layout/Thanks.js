import React from 'react'
// import logoImg from "../../img/logo/logo-black.svg"
import { connect } from 'react-redux'
import { getPendingPartnerByUserId } from '../../actions/admin'
import { Link, useHistory } from "react-router-dom"

const Thanks = ({ match, getPendingPartnerByUserId, pendingPartnerIsLoaded, pendingPartner }) => {
  let history = useHistory()

  React.useEffect(() => {
    if (!pendingPartnerIsLoaded) {
      getPendingPartnerByUserId(match.params.id)
    }
  }, [match.params.id, getPendingPartnerByUserId, pendingPartnerIsLoaded])

  React.useEffect(() => {
    if (pendingPartnerIsLoaded && pendingPartner.connectedAccountStatus !== 'enabled') {
      history.push(`/failedconnectaccount/${match.params.id}`)
    } else if (pendingPartnerIsLoaded && pendingPartner.connectedAccountStatus === 'enabled') {
      localStorage.removeItem('partnerID')
    }
  }, [match.params.id, history, pendingPartner, pendingPartnerIsLoaded])

  return (
    <>
      <div className="container-fluid bg-partner">
        {/* <div className="top-header">
          <Link to="/home"><img src={logoImg} alt="logo" /></Link>
          <div>
            <Link to="/home"><span className="glyphicon glyphicon-home"></span>&nbsp;HOME</Link>
            <Link to="/partner#"><span className="glyphicon glyphicon-book"></span>&nbsp;PARTNER APPLICATION</Link>
            <Link to="/login"><span className="glyphicon glyphicon-log-in"></span>&nbsp;LOGIN</Link>
          </div>
        </div> */}
        <div className="row">
          <div className="col-md-2">

          </div>
          <div className="col-md-8">
            <h1 className="w3-center">THANK YOU</h1>
            <h4 className="w3-justify" style={{ margin: "0px 20px" }}>
              Thank you <span className="w3-text-light-green">{pendingPartner.name}</span>. Your username is <span className="w3-text-light-green">{pendingPartner.username}</span>. We have received your partnership request. You will receive an email, too. If you have completed the connected account creation then your partnership will be approved soon. We will let you know again when you are approved. Thank you. <br /><br />DCGONBOARDING Team.
            </h4>
            <div className="w3-right">
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
  pendingPartner: state.admin.pendingPartner
})

export default connect(mapStateToProps, { getPendingPartnerByUserId })(Thanks)