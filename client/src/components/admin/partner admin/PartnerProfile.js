import React from 'react'
import { connect } from 'react-redux'
import { } from '../../../actions/partner'
import Moment from 'react-moment'
import PasswordReset from './modals/PasswordReset'
import Spaces from '../../layout/Spaces'

const PartnerProfile = ({ partner }) => {
  const [partnerForReset, setPartnerForReset] = React.useState(partner)
  const [showPartnerForReset, setShowPartnerForReset] = React.useState('none')

  const showPasswordResetModal = (showFlag, partner) => {
    setShowPartnerForReset(showFlag)
    setPartnerForReset(partner)
  }

  return (
    <div className="bg-panelMain row partnerAdminProfile">
      <div className="adminSales">
        <div className="row">
          <div className="col-md-12 ap-box">
            <h2>PARTNER PROFILE</h2>
            <div className="w3-text-green" style={{ display: 'flex', flexWrap: 'wrap' }}>
              <span><Spaces spaceLength={4} />Profile image is changed on gravatar.com. You can simply go there by clicking RESET IMAGE below.</span>
            </div><br />
            <br />
            <table className="w3-table w3-btransfered">
              <thead>
                <tr>
                  <th width="25%">NAME</th>
                  <th width="25%">EMAIL</th>
                  <th width="25%">PASSWORD</th>
                  <th width="25%">REGISTERED DATE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{partner.name}</td>
                  <td>{partner.email}</td>
                  <td>{partner.passwordForUpdate}</td>
                  <td><Moment format="MM/DD/YYYY">{partner.date}</Moment></td>
                </tr>
              </tbody>
            </table>
            <br />
            <table className="w3-table w3-btransfered">
              <thead>
                <tr>
                  <th width="25%">BRAND</th>
                  <th width="25%">USERNAME</th>
                  <th width="25%">STATUS</th>
                  <th width="25%">PHONE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{partner.brand}</td>
                  <td>{partner.username}</td>
                  <td>{partner.status ? partner.status.toUpperCase() : null}</td>
                  <td>{partner.phone}</td>
                </tr>
              </tbody>
            </table>
            <br />
            <table className="w3-table w3-btransfered">
              <thead>
                <tr>
                  <th width="25%">CONNECTED ACCOUNT STATUS</th>
                  <th width="25%">STRIPE CONNECTED ACCOUNT NUMBER</th>
                  <th width="50%">DESCRIPTION</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{partner.connectedAccountStatus === 'enabled' ? <span><span className="w3-text-indigo">TRANSFERS</span> and <span className="w3-text-indigo">PAYOUTS</span> are enabled.</span> : <span>Account is <span className="w3-text-indigo">RESTRICTED</span>. It needs more information.</span>}</td>
                  <td className="w3-text-indigo">{partner.stripeConnectedAccount}</td>
                  <td>{partner.description}</td>
                </tr>
              </tbody>
            </table>
            <br />
            <table className="w3-table w3-btransfered">
              <thead>
                <tr>
                  <th width="25%">FACEBOOK</th>
                  <th width="25%">TWITTER</th>
                  <th width="25%">INSTAGRAM</th>
                  <th width="25%"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{partner.facebook}</td>
                  <td>{partner.twitter}</td>
                  <td>{partner.instagram}</td>
                </tr>
              </tbody>
            </table>
            <br />
            <div className="w3-right">
              <button
                // className="btn btn-primary"
                onClick={e => {
                  e.stopPropagation()
                  showPasswordResetModal('block', partner)
                }}
              >RESET PASSWORD</button>
              <Spaces spaceLength={1} />
              <button><a href='https://gravatar.com' target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'black' }}>RESET IMAGE</a></button>
            </div>
          </div>
        </div>
      </div>
      <PasswordReset
        showPasswordResetModal={showPasswordResetModal}
        partnerForReset={partnerForReset}
        showPartnerForReset={showPartnerForReset}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  partner: state.auth.user
})

export default connect(mapStateToProps, {})(PartnerProfile)