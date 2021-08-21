import React from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { getCustomerTransactions } from '../../../actions/admin'
import { useHistory } from "react-router-dom"

const MasterAdminCustomer = ({ customer, getCustomerTransactions, transactions }) => {
  let history = useHistory()

  React.useEffect(() => {
    if (customer._id) getCustomerTransactions(customer._id)
  }, [getCustomerTransactions, customer])

  React.useEffect(() => {
    if (customer.name === undefined) history.push(`/customers`)
  }, [customer, history])


  return (
    <div className="bg-panelMain row">
      <div className="col-md-12">
        <div className="adminSales">
          <div className="row">
            <div className="col-md-12 ap-box">
              <h2>{customer.name}: ({customer.customerStatus ? customer.customerStatus.toUpperCase() : null})</h2>
              <br />
              <div className='row'>
                <div className='col-md-6'>
                  <table className="saleList w3-table">
                    <tbody>
                      <tr>
                        <td>REGISTERED:</td>
                        <td><Moment format="MM/DD/YYYY" className="w3-text-indigo">{customer.date}</Moment></td>
                      </tr>
                      <tr>
                        <td>PURCHASED SUBSCRIPTION:</td>
                        <td className="w3-text-indigo">{customer.purchasedProductID ? customer.purchasedProductID.name : null}</td>
                      </tr>
                      {customer.customerStatus === 'Active'
                        ?
                        <>
                          <tr>
                            <td>PERIOD STARTED:</td>
                            <td className="w3-text-indigo"><Moment format="MM/DD/YYYY">{customer.subscriptionStartDate * 1000}</Moment></td>
                          </tr>
                          <tr>
                            <td>PERIOD ENDS:</td>
                            <td className="w3-text-indigo"><Moment format="MM/DD/YYYY">{customer.subscriptionEndDate * 1000}</Moment></td>
                          </tr>
                        </>
                        :
                        null
                      }
                    </tbody>
                  </table>
                  <br />
                </div>
              </div>
            </div>
            <div className="col-md-12 ap-box">
              <h2>TRANSACTIONS</h2>
              <table className="w3-table w3-bordered w3-hoverable customerTransactions">
                <thead>
                  <tr>
                    <th>NO</th>
                    <th>AMOUNT</th>
                    <th>DATE</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((item, index) =>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.amount / 100}</td>
                      <td><Moment format="MM/DD/YYYY">{item.date}</Moment></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  customer: state.admin.currentCustomer,
  transactions: state.admin.customerTransactions
})

export default connect(mapStateToProps, { getCustomerTransactions })(MasterAdminCustomer)