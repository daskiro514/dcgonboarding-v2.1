import React from 'react'
import { connect } from 'react-redux'
import { getPartners, showPartnerDetail, goPartnerPage, suspendPartner, unsuspendPartner, deletePartner } from '../../../actions/admin'
import PartnerDetail from './modals/PartnerDetail'
import PasswordReset from './modals/PasswordReset'
import { useHistory } from "react-router-dom"
import Spaces from '../../layout/Spaces'

const MasterAdminPartners = ({ partners, getPartners, showPartnerDetail, goPartnerPage, suspendPartner, unsuspendPartner, deletePartner }) => {
  let history = useHistory()

  const [partnerForReset, setPartnerForReset] = React.useState(partners[0])
  const [showPartnerForReset, setShowPartnerForReset] = React.useState('none')

  React.useEffect(() => {
    getPartners()
  }, [getPartners])

  const showPasswordResetModal = (showFlag, partner) => {
    setShowPartnerForReset(showFlag)
    setPartnerForReset(partner)
  }

  return (
    <div className="bg-panelMain row masterAdminPartners">
      <div className="col-md-12">
        <div className="adminSales">
          <div className="row">
            <div className="col-md-12 ap-box">
              <h2>PARTNERS</h2>
              <div className="w3-text-indigo" style={{ display: 'flex', flexWrap: 'wrap' }}>
                <span><Spaces spaceLength={4} /><span className="glyphicon glyphicon-eye-open"></span> is for DETAILS.</span>
                <span><Spaces spaceLength={4} /><span className="glyphicon glyphicon-pencil"></span> is for Password RESET.</span>
                <span><Spaces spaceLength={4} /><span className="glyphicon glyphicon-pause"></span> is for SUSPEND.</span>
                <span><Spaces spaceLength={4} /><span className="glyphicon glyphicon-play"></span> is for UNSUSPEND.</span>
                <span><Spaces spaceLength={4} /><span className="glyphicon glyphicon-trash"></span> is for DELETE.</span>
              </div><br />
              <div className='table-responsive'>
                <table className="w3-table w3-bordered w3-hoverable">
                  <thead>
                    <tr>
                      <th>NO</th>
                      <th>USERNAME</th>
                      <th>AVATAR</th>
                      <th>NAME</th>
                      <th>TYPE</th>
                      <th>EMAIL</th>
                      <th>PHONE</th>
                      <th>CONNECTED ACCOUNT</th>
                      <th>BRAND</th>
                      <th>DESCRIPTION</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partners.map((item, index) => (
                      <tr key={index} onClick={() => goPartnerPage(item, history)}>
                        <td>{index + 1}</td>
                        <td>{item.username}</td>
                        <td><img src={item.avatar} alt="PARTNER AVATAR" width="70px" height="70px" /></td>
                        <td>{item.name}</td>
                        <td>{item.type}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.stripeConnectedAccount}</td>
                        <td>{item.brand}</td>
                        <td><p style={{ width: '300px' }}>{item.description}</p></td>
                        <td style={{ minWidth: '160px' }}>
                          <button
                            onClick={e => {
                              e.stopPropagation()
                              showPartnerDetail('block', item)
                            }}
                          ><span className="glyphicon glyphicon-eye-open"></span></button>
                          <Spaces spaceLength={1} />
                          <button
                            onClick={e => {
                              e.stopPropagation()
                              showPasswordResetModal('block', item)
                            }}
                          ><span className="glyphicon glyphicon-pencil"></span></button>
                          {item.type === 'partner'
                            ?
                            item.status === 'active'
                              ?
                              <>
                                <Spaces spaceLength={1} />
                                <button
                                  onClick={e => {
                                    e.stopPropagation()
                                    let answer = window.confirm("Are you sure to SUSPEND this partner?")
                                    if (answer) suspendPartner(item._id)
                                  }}
                                ><span className="glyphicon glyphicon-pause"></span></button>
                                <Spaces spaceLength={1} />
                                <button
                                  onClick={e => {
                                    e.stopPropagation()
                                    let answer = window.confirm("Are you sure to DELETE this partner?")
                                    if (answer) deletePartner(item._id)
                                  }}
                                ><span className="glyphicon glyphicon-trash"></span></button>
                              </>
                              :
                              <>
                                <Spaces spaceLength={1} />
                                <button
                                  onClick={e => {
                                    e.stopPropagation()
                                    let answer = window.confirm("Are you sure to UNSUSPEND this partner?")
                                    if (answer) unsuspendPartner(item._id)
                                  }}
                                ><span className="glyphicon glyphicon-play"></span></button>
                                <Spaces spaceLength={1} />
                                <button
                                  onClick={e => {
                                    e.stopPropagation()
                                    let answer = window.confirm("Are you sure to DELETE this partner?")
                                    if (answer) deletePartner(item._id)
                                  }}
                                ><span className="glyphicon glyphicon-trash"></span></button>
                              </>
                            :
                            null
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
      <PartnerDetail />
      <PasswordReset
        showPasswordResetModal={showPasswordResetModal}
        partnerForReset={partnerForReset}
        showPartnerForReset={showPartnerForReset}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  partners: state.admin.partners
})

export default connect(mapStateToProps, { getPartners, showPartnerDetail, goPartnerPage, suspendPartner, unsuspendPartner, deletePartner })(MasterAdminPartners)