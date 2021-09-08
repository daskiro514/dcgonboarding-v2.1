import React from 'react'
import { connect } from 'react-redux'
import { getProducts, approveProduct, goEditProductPage, suspendProduct } from '../../../actions/admin'
import Spaces from '../../layout/Spaces'
import { useHistory } from "react-router-dom"

const MasterAdminProducts = ({ getProducts, approveProduct, pendingApprovalProducts, approvedProducts, goEditProductPage, suspendProduct }) => {
  let history = useHistory()

  React.useEffect(() => {
    getProducts()
  }, [getProducts])

  return (
    <div className="bg-panelMain row masterAdminProducts">
      <div className="col-md-12">
        <div className="adminSales">
          <div className="row">
            <div className="col-md-12 ap-box">
              <h2>PENDING APPROVAL PRODUCTS</h2>
              <div className="w3-text-indigo" style={{ display: 'flex', flexWrap: 'wrap' }}>
                <span><Spaces spaceLength={4} /><span className="glyphicon glyphicon-check"></span> is for APPROVE for SALE.</span>
                <span><Spaces spaceLength={4} /><span className="glyphicon glyphicon-pencil"></span> is for EDIT.</span>
                <span><Spaces spaceLength={4} /><span className="glyphicon glyphicon-pause"></span> is for SUSPEND for SALE.</span>
              </div><br />
              <div className='table-responsive'>
                <table className="w3-table w3-bordered w3-hoverable">
                  <thead>
                    <tr>
                      <th>NO</th>
                      <th>NAME</th>
                      <th>TYPE</th>
                      <th>STATUS</th>
                      <th>DESCRIPTION</th>
                      <th>OWNER</th>
                      <th>RECURRING INTERVAL</th>
                      <th>PRICE</th>
                      <th>STRIPE PRODUCT ID</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingApprovalProducts.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td><p style={{width: '100px'}}>{item.name}</p></td>
                        <td><p style={{width: '100px'}}>{item.type}</p></td>
                        <td>{item.status}</td>
                        <td><p style={{width: '200px'}}>{item.description}</p></td>
                        <td>{item.owner.username}</td>
                        <td>{item.recurringInterval}</td>
                        <td>{item.price / 100}</td>
                        <td>{item.stripeProductID}</td>
                        <td>
                          <button onClick={() => approveProduct(item._id)}><span className="glyphicon glyphicon-check"></span></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="adminSales">
          <div className="row">
            <div className="col-md-12 ap-box">
              <h2>APPROVED PRODUCTS</h2>
              <div className='table-responsive'>
                <table className="w3-table w3-bordered w3-hoverable">
                  <thead>
                    <tr>
                      <th>NO</th>
                      <th>NAME</th>
                      <th>TYPE</th>
                      <th>STATUS</th>
                      <th>DESCRIPTION</th>
                      <th>OWNER</th>
                      <th>RECURRING INTERVAL</th>
                      <th>PRICE</th>
                      <th>STRIPE PRODUCT ID</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvedProducts.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td><p style={{width: '100px'}}>{item.name}</p></td>
                        <td><p style={{width: '100px'}}>{item.type}</p></td>
                        <td>{item.status}</td>
                        <td><p style={{width: '200px'}}>{item.description}</p></td>
                        <td>{item.owner.username}</td>
                        <td>{item.recurringInterval}</td>
                        <td>{item.price / 100}</td>
                        <td>{item.stripeProductID}</td>
                        <td>
                          <button onClick={() => goEditProductPage(item, history)}><span className="glyphicon glyphicon-pencil"></span></button>
                          <Spaces spaceLength={1} />
                          <button onClick={() => suspendProduct(item._id)}><span className="glyphicon glyphicon-pause"></span></button>
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
    </div>
  )
}

const mapStateToProps = state => ({
  pendingApprovalProducts: state.admin.products.filter(element => element.status === 'Not Approved'),
  approvedProducts: state.admin.products.filter(element => element.status === 'Approved')
})

export default connect(mapStateToProps, { getProducts, approveProduct, goEditProductPage, suspendProduct })(MasterAdminProducts)