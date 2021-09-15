import React from 'react'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { getPartnerCustomers } from '../../../actions/partner'

const PartnerCustomers = ({ customers, getPartnerCustomers, partnerID }) => {
  React.useEffect(() => {
    getPartnerCustomers(partnerID)
  }, [getPartnerCustomers, partnerID])

  return (
    <div className="bg-panelMain row partnerCustomers">
      <div className="col-md-12">
        <div className="adminSales">
          <div className="row">
            <div className="col-md-12 ap-box">
              <h2>Customers</h2>
              <div className='table-responsive'>
                <table className="w3-table w3-bordered w3-hoverable">
                  <thead>
                    <tr>
                      <th>NO</th>
                      <th>USERNAME</th>
                      {/* <th>PASSWORD</th> */}
                      <th>AVATAR</th>
                      <th>NAME</th>
                      <th>TYPE</th>
                      <th>EMAIL</th>
                      <th>PHONE</th>
                      <th>PURCHASED SUBSCRIPTION</th>
                      <th>SUBSCRIPTION START DATE</th>
                      <th>SUBSCRIPTION END DATE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.username}</td>
                        {/* <td>{item.passwordForUpdate}</td> */}
                        <td><img src={item.avatar} alt="PARTNER AVATAR" width="70px" height="70px" /></td>
                        <td>{item.name}</td>
                        <td>{item.type}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.purchasedProductID.name}</td>
                        <td><Moment format="MM/DD/YYYY HH:mm:ss">{item.subscriptionStartDate * 1000}</Moment></td>
                        <td><Moment format="MM/DD/YYYY HH:mm:ss">{item.subscriptionEndDate * 1000}</Moment></td>
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
    </div>
  )
}

const mapStateToProps = state => ({
  partnerID: state.auth.user._id,
  customers: state.partner.partnerCustomers
})

export default connect(mapStateToProps, { getPartnerCustomers })(PartnerCustomers)