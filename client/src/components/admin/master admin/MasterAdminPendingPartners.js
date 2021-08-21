import React from 'react'
import { connect } from 'react-redux'
import PendingUserTableRow from './partials/PendingPartnerTableRow'
import { getPendingPartners } from '../../../actions/admin'
import PartnerDetail from './modals/PartnerDetail'
import Spinner from '../../layout/Spinner'
import Spaces from '../../layout/Spaces'

const MasterAdminPendingPartners = ({ getPendingPartners, pendingPartners, updatingPartnerNow }) => {
  React.useEffect(() => {
    getPendingPartners()
  }, [getPendingPartners])

  return (
    <div className="bg-panelMain row">
      <div className="col-md-12">
        <div className="adminSales">
          <div className="row">
            <div className="col-md-12 ap-box">
              <h2>PENDING USER APPLICATIONS</h2>
              <div className="w3-text-indigo" style={{ display: 'flex', flexWrap: 'wrap' }}>
                <span><Spaces spaceLength={4} /><span className="glyphicon glyphicon-check"></span> is for APPROVE.</span>
                <span><Spaces spaceLength={4} /><span className="glyphicon glyphicon-eye-open"></span> is for DETAIL.</span>
                <span><Spaces spaceLength={4} /><span className="glyphicon glyphicon-trash"></span> is for DELETE.</span>
                <span><Spaces spaceLength={4} /><span className="glyphicon glyphicon-refresh"></span> is for SEND update link via email.</span>
              </div><br />
              <div className="w3-container">
                <div className='table-responsive'>
                  <div className="pending_user_tr">
                    <p style={{ width: "5%" }}>NO</p>
                    <p style={{ width: "13.57%" }}>NAME</p>
                    <p style={{ width: "13.57%" }}>EMAIL</p>
                    <p style={{ width: "13.57%" }}>USERNAME</p>
                    <p style={{ width: "13.57%" }}>PASSWORD</p>
                    <p style={{ width: "13.57%" }}>REQUEST DATE</p>
                    <p style={{ width: "25%" }}>INFO</p>
                    <p style={{ width: "20%" }}>ACTION</p>
                  </div>
                  {updatingPartnerNow ? (
                    <Spinner />
                  ) : (
                    <>
                      {pendingPartners.length === 0 ? <h4 className="w3-center">THERE ARE NO PENDING USERS.</h4> : null}
                      {pendingPartners.map((each, i) => (
                        <PendingUserTableRow
                          key={i}
                          pendingPartner={each}
                          index={i}
                        />
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div >
          </div >
        </div >
        <br />
      </div >
      <PartnerDetail />
    </div >
  )
}

const mapStateToProps = state => ({
  pendingPartners: state.admin.pendingPartners,
  updatingPartnerNow: state.admin.updatingPartnerNow
})

export default connect(mapStateToProps, { getPendingPartners })(MasterAdminPendingPartners)