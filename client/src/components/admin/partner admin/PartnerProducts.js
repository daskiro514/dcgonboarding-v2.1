import React from 'react'
import { connect } from 'react-redux'
// import CreateOneTimeProduct from './partials/CreateOneTimeProduct'
// import CreateSubscriptionProduct from './partials/CreateSubscriptionProduct'
import UpdateOneTimeProduct from './partials/UpdateOneTimeProduct'
import UpdateSubscriptionProduct from './partials/UpdateSubscriptionProduct'
import Spinner from '../../layout/Spinner'

const PartnerProducts = ({ oneTimeProductPageIsUpdating, subscriptionProductPageIsUpdating, oneTimeProducts, subscriptionProducts }) => {
  const [updateSubscriptionProductFlag, setUpdateSubscriptionProductFlag] = React.useState(false)
  const [updateOneTimeProductFlag, setUpdateOneTimeProductFlag] = React.useState(false)
  const [oneTimeProductForUpdate, setOneTimeProductForUpdate] = React.useState({})
  const [subscriptionProductForUpdate, setSubscriptionProductForUpdate] = React.useState({})

  React.useEffect(() => {
    if (subscriptionProductPageIsUpdating) setUpdateSubscriptionProductFlag(false)
    if (oneTimeProductPageIsUpdating) setUpdateOneTimeProductFlag(false)
  }, [subscriptionProductPageIsUpdating, oneTimeProductPageIsUpdating])

  return (
    <div className="bg-panelMain row partnerAdminProducts">
      <div className="col-md-6">
        <div className="adminSales">
          <div className="row">
            <div className="col-md-12 ap-box">
              <h2>SUBSCRIPTION PRODUCTS</h2>
              {
                updateSubscriptionProductFlag
                  ?
                  <UpdateSubscriptionProduct
                    setUpdateSubscriptionProductFlag={setUpdateSubscriptionProductFlag}
                    product={subscriptionProductForUpdate}
                  />
                  : subscriptionProductPageIsUpdating
                    ? <Spinner />
                    : null
                    // : <CreateSubscriptionProduct />
              }
              <br /><br /><br />
              <div className='table-responsive'>
                <table className="w3-table w3-bordered w3-hoverable">
                  <thead>
                    <tr>
                      <th>NO</th>
                      <th>NAME</th>
                      <th>DESCRIPTION</th>
                      <th>RECURRING INTERVAL</th>
                      <th>PRICE</th>
                      <th>STATUS</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptionProducts.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.recurringInterval}</td>
                        <td>{item.price / 100}</td>
                        <td>{item.status === 'Approved' ? <span className='w3-text-indigo'>{item.status}</span> : <span className='w3-text-red'>{item.status}</span>}</td>
                        <td>
                          <button
                            onClick={() => {
                              setUpdateSubscriptionProductFlag(true)
                              setSubscriptionProductForUpdate(item)
                            }}
                          ><span className="glyphicon glyphicon-pencil"></span></button>
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
      <div className="col-md-6">
        <div className="adminSales">
          <div className="row">
            <div className="col-md-12 ap-box">
              <h2>ONE-TIME PRODUCTS</h2>
              {
                updateOneTimeProductFlag
                  ?
                  <UpdateOneTimeProduct
                    setUpdateOneTimeProductFlag={setUpdateOneTimeProductFlag}
                    product={oneTimeProductForUpdate}
                  />
                  : oneTimeProductPageIsUpdating
                    ? <Spinner />
                    : null
                    // : <CreateOneTimeProduct />
              }
              <br /><br /><br />
              <div className='table-responsive'>
                <table className="w3-table w3-bordered w3-hoverable">
                  <thead>
                    <tr>
                      <th>NO</th>
                      <th>NAME</th>
                      <th>DESCRIPTION</th>
                      <th>PRICE</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {oneTimeProducts.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.price / 100}</td>
                        <td>{item.status === 'Approved' ? <span className='w3-text-indigo'>{item.status}</span> : <span className='w3-text-red'>{item.status}</span>}</td>
                        <td>
                          <button
                            onClick={() => {
                              setUpdateOneTimeProductFlag(true)
                              setOneTimeProductForUpdate(item)
                            }}
                          ><span className="glyphicon glyphicon-pencil"></span></button>
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
  user: state.auth.user,
  oneTimeProductPageIsUpdating: state.partner.oneTimeProductPageIsUpdating,
  subscriptionProductPageIsUpdating: state.partner.subscriptionProductPageIsUpdating,
  oneTimeProducts: state.partner.oneTimeProducts,
  subscriptionProducts: state.partner.subscriptionProducts,
})

export default connect(mapStateToProps, {})(PartnerProducts)