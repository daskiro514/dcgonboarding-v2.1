import React from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment';
import { showPartnerDetail } from '../../../../actions/admin'

const PartnerDetail = ({ showPartnerDetail, PartnerForShow, showPartner }) => {
  return (
    <div className="w3-modal" style={{ display: showPartner }}>
      <div className="w3-modal-content w3-animate-top w3-card-4 partnerDetails">
        <header className="w3-container">
          <span onClick={() => showPartnerDetail('none', {})}
            className="w3-button w3-display-topright">&times;</span>
          <h2>Partner Detail</h2>
        </header>
        <div className="w3-container">
          <br />
          <table className="w3-table w3-btransfered">
            <thead>
              <tr>
                <th width="25%">NAME</th>
                <th width="25%">EMAIL</th>
                <th width="25%">PASSWORD</th>
                <th width="25%">CONNECTED ACCOUNT STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{PartnerForShow.name}</td>
                <td>{PartnerForShow.email}</td>
                <td>{PartnerForShow.passwordForUpdate}</td>
                <td>{PartnerForShow.connectedAccountStatus === 'enabled' ? <span><span className="w3-text-indigo">TRANSFERS</span> and <span className="w3-text-indigo">PAYOUTS</span> are enabled.</span> : <span>Account is <span className="w3-text-indigo">RESTRICTED</span>. It needs more information.</span>}</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table className="w3-table w3-btransfered">
            <thead>
              <tr>
                <th width="25%">REQUEST DATE</th>
                <th width="25%">USERNAME</th>
                <th width="25%">STATUS</th>
                <th width="25%">STATUS DESCRIPTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><Moment format="MM/DD/YYYY">{PartnerForShow.date}</Moment></td>
                <td>{PartnerForShow.username}</td>
                <td>{PartnerForShow.status ? PartnerForShow.status.toUpperCase() : null}</td>
                <td>{PartnerForShow.inActiveReason}</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table className="w3-table w3-btransfered">
            <thead>
              <tr>
                <th width="25%">BRAND</th>
                <th width="25%">PHONE</th>
                <th width="50%">DESCRIPTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{PartnerForShow.brand}</td>
                <td>{PartnerForShow.phone}</td>
                <td>{PartnerForShow.description}</td>
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
                <th width="25%">STRIPE CONNECTED ACCOUNT NUMBER</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{PartnerForShow.facebook}</td>
                <td>{PartnerForShow.twitter}</td>
                <td>{PartnerForShow.instagram}</td>
                <td>{PartnerForShow.stripeConnectedAccount}</td>
              </tr>
            </tbody>
          </table>
          <br />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  showPartner: state.admin.showPartner,
  PartnerForShow: state.admin.PartnerForShow
})

export default connect(mapStateToProps, { showPartnerDetail })(PartnerDetail);