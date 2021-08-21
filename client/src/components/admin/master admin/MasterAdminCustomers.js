import React from 'react'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { getAllCustomers, goCustomerPage, showSuspendCustomerOptions, restoreCustomer, deleteCustomer } from '../../../actions/admin'
import Spaces from '../../layout/Spaces'
import Spinner from '../../layout/Spinner'
import SuspendCustomerOption from './modals/SuspendCustomerOption'
import { useHistory } from "react-router-dom"

const MasterAdminCustomers = ({ customers, getAllCustomers, goCustomerPage, showSuspendCustomerOptions, restoreCustomer, deleteCustomer, inProgress }) => {
  let history = useHistory()

  React.useEffect(() => {
    getAllCustomers()
  }, [getAllCustomers])

  return (
    <div className="bg-panelMain row masterAdminCustomers">
      <div className="col-md-12">
        <div className="adminSales">
          <div className="row">
            <div className="col-md-12 ap-box">
              <h2>ALL DCG CUSTOMERS</h2>
              <div className="w3-text-indigo" style={{ display: 'flex', flexWrap: 'wrap' }}>
                <span><Spaces spaceLength={4} /><span className="glyphicon glyphicon-pause"></span> is for SUSPEND.</span>
                <span><Spaces spaceLength={4} /><span className="glyphicon glyphicon-refresh"></span> is for RESTORE a suspended.</span>
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
                      <th>STATE</th>
                      <th>EMAIL</th>
                      <th>PHONE</th>
                      <th>PURCHASED SUBSCRIPTION</th>
                      <th>CURRENT PERIOD START</th>
                      <th>CURRENT PERIOD END</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  {inProgress
                    ? null
                    :
                    <tbody>
                      {customers.map((item, index) => (
                        <tr
                          key={index}
                          onClick={() => goCustomerPage(item, history)}
                          style={{ wordBreak: 'break-word' }}
                        >
                          <td>{index + 1}</td>
                          <td>{item.username}</td>
                          <td><img src={item.avatar} alt="PARTNER AVATAR" width="70px" height="70px" /></td>
                          <td><p style={{width: '120px'}}>{item.name}</p></td>
                          <td>{item.customerStatus === 'Suspended' ? <span className="w3-text-red">Suspended</span> : <span className="w3-text-blue">Active</span>}</td>
                          <td><p style={{width: '100px'}}>{item.email}</p></td>
                          <td><p style={{width: '100px'}}>{item.phone}</p></td>
                          <td>{item.purchasedProductID.name}</td>
                          <td><p style={{width: '100px'}}><Moment format="MM/DD/YYYY HH:mm:ss">{item.subscriptionStartDate * 1000}</Moment></p></td>
                          <td><p style={{width: '100px'}}><Moment format="MM/DD/YYYY HH:mm:ss">{item.subscriptionEndDate * 1000}</Moment></p></td>
                          <td>
                            {item.customerStatus === 'Suspended'
                              ?
                              <button
                                onClick={e => {
                                  e.stopPropagation()
                                  let answer = window.confirm("Are you sure to RESTORE this customer?")
                                  if (answer) restoreCustomer(item._id)
                                }}
                              >
                                <span className="glyphicon glyphicon-refresh"></span>
                              </button>
                              :
                              <button
                                onClick={e => {
                                  e.stopPropagation()
                                  showSuspendCustomerOptions('block', item)
                                }}
                              >
                                <span className="glyphicon glyphicon-pause"></span>
                              </button>
                            }
                            <Spaces spaceLength={1} />
                            <button
                              onClick={e => {
                                e.stopPropagation()
                                let answer = window.confirm("Are you sure to DELETE this customer?")
                                if (answer) deleteCustomer(item._id)
                              }}
                            ><span className="glyphicon glyphicon-trash"></span></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  }
                </table>
              </div>
              {inProgress ? <Spinner /> : null}
            </div>
          </div>
        </div>
        <br />
      </div>
      <SuspendCustomerOption />
    </div>
  )
}

const mapStateToProps = state => ({
  customers: state.admin.customers,
  inProgress: state.admin.customerPageIsUpdating
})

export default connect(mapStateToProps, { getAllCustomers, goCustomerPage, showSuspendCustomerOptions, restoreCustomer, deleteCustomer })(MasterAdminCustomers)