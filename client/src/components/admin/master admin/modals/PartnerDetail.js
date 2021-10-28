import React from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { showPartnerDetail } from '../../../../actions/admin'

const PartnerDetail = ({ showPartnerDetail, PartnerForShow, showPartner }) => {
  return (
    <div className="w3-modal" style={{ display: showPartner }}>
      <div className="w3-modal-content w3-animate-top w3-card-4 partnerDetails">
        <header className="w3-container">
          <span onClick={() => showPartnerDetail('none', {})}
            className="w3-button w3-display-topright">&times;</span>
          <h2 style={{ minHeight: '36px' }}>Partner Detail</h2>
        </header>
        <div className="w3-container">
          <div className='row px-2 pt-2'>
            <div className='col-md-3 pt-1'>
              <h5 className='text-bold pb-1'>Name</h5>
              <p>{PartnerForShow.name}</p>
            </div>
            <div className='col-md-3 pt-1'>
              <h5 className='text-bold pb-1'>EMAIL</h5>
              <p>{PartnerForShow.email}</p>
            </div>
            <div className='col-md-3 pt-1'>
              <h5 className='text-bold pb-1'>PASSWORD</h5>
              <p>{PartnerForShow.passwordForUpdate}</p>
            </div>
            <div className='col-md-3 pt-1'>
              <h5 className='text-bold pb-1'>CONNECTED ACCOUNT STATUS</h5>
              <p>{PartnerForShow.connectedAccountStatus === 'enabled' ? <span><span className="w3-text-indigo">TRANSFERS</span> and <span className="w3-text-indigo">PAYOUTS</span> are enabled.</span> : <span>Account is <span className="w3-text-indigo">RESTRICTED</span>. It needs more information.</span>}</p>
            </div>
          </div>
          <div className='row px-2 pt-2'>
            <div className='col-md-3 pt-1'>
              <h5 className='text-bold pb-1'>REQUEST DATE</h5>
              <p><Moment format="MM/DD/YYYY">{PartnerForShow.date}</Moment></p>
            </div>
            <div className='col-md-3 pt-1'>
              <h5 className='text-bold pb-1'>USERNAME</h5>
              <p>{PartnerForShow.username}</p>
            </div>
            <div className='col-md-3 pt-1'>
              <h5 className='text-bold pb-1'>STATUS</h5>
              <p>{PartnerForShow.status ? PartnerForShow.status.toUpperCase() : null}</p>
            </div>
            <div className='col-md-3 pt-1'>
              <h5 className='text-bold pb-1'>STATUS DESCRIPTION</h5>
              <p>{PartnerForShow.inActiveReason}</p>
            </div>
          </div>
          <div className='row px-2 pt-2'>
            <div className='col-md-3 pt-1'>
              <h5 className='text-bold pb-1'>BRAND</h5>
              <p>{PartnerForShow.brand}</p>
            </div>
            <div className='col-md-3 pt-1'>
              <h5 className='text-bold pb-1'>PHONE</h5>
              <p>{PartnerForShow.phone}</p>
            </div>
            <div className='col-md-6 pt-1'>
              <h5 className='text-bold pb-1'>DESCRIPTION</h5>
              <p>{PartnerForShow.description}</p>
            </div>
          </div>
          <div className='row px-2 pt-2'>
            <div className='col-md-3 pt-1'>
              <h5 className='text-bold pb-1'>FACEBOOK</h5>
              <p>{PartnerForShow.facebook}</p>
            </div>
            <div className='col-md-3 pt-1'>
              <h5 className='text-bold pb-1'>TWITTER</h5>
              <p>{PartnerForShow.twitter}</p>
            </div>
            <div className='col-md-3 pt-1'>
              <h5 className='text-bold pb-1'>INSTAGRAM</h5>
              <p>{PartnerForShow.instagram}</p>
            </div>
            <div className='col-md-3 pt-1'>
              <h5 className='text-bold pb-1'>STRIPE CONNECTED ACCOUNT NUMBER</h5>
              <p>{PartnerForShow.stripeConnectedAccount}</p>
            </div>
          </div>
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