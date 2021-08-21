import React from 'react'
import { connect } from 'react-redux'
import Spaces from '../../../layout/Spaces'
import Spinner from '../../../layout/Spinner'
import { updateSubscriptionProduct } from '../../../../actions/partner'

const UpdateSubscriptionProduct = ({ setUpdateSubscriptionProductFlag, product, updateSubscriptionProduct, productOwner, isUpdating }) => {
  const [name, setName] = React.useState('')
  const [price, setPrice] = React.useState(0)
  const [description, setDescription] = React.useState('')
  const [recurringInterval, setRecurringInterval] = React.useState('')
  const [productID, setProductID] = React.useState('')

  const onSubmit = e => {
    e.preventDefault()
    if (name && description && (price > 0.1)) {
      updateSubscriptionProduct({ name, price, description, productOwner, recurringInterval, productID })
    }
  }

  React.useEffect(() => {
    setName(product.name)
    setPrice(product.price / 100)
    setDescription(product.description)
    setRecurringInterval(product.recurringInterval)
    setProductID(product._id)
  }, [product])

  if (isUpdating) {
    return (
      <Spinner />
    )
  } else {
    return (
      <form className="form" onSubmit={onSubmit}>
        <div className="row">
          <br />
          <div className="col-md-4">
            <label>PRODUCT NAME:</label>
          </div>
          <div className="col-md-8 form-group">
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <label>DESCRIPTION: </label>
          </div>
          <div className="col-md-8 form-group">
            <textarea
              value={description}
              rows={3}
              onChange={e => setDescription(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <label>PRODUCT PRICE($):</label>
          </div>
          <div className="col-md-8 form-group">
            <input
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <label>RECURRING INTERVAL:</label>
          </div>
          <div className="col-md-8 form-group">
            <select
              value={recurringInterval}
              onChange={e => setRecurringInterval(e.target.value)}
              className="form-control"
              required
            >
              <option value="day">DAY</option>
              <option value="week">WEEK</option>
              <option value="month">MONTH</option>
              <option value="year">YEAR</option>
            </select>
          </div>
        </div>
        <div className="w3-right">
          <button type="submit" className="w3-button w3-grey w3-round">UPDATE</button>
          <Spaces spaceLength={2} />
          <button
            onClick={() => setUpdateSubscriptionProductFlag(false)}
            className="w3-button w3-grey w3-round"
          >
            CANCEL
          </button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  productOwner: state.auth.user._id,
  isUpdating: state.partner.subscriptionProductPageIsUpdating
})

export default connect(mapStateToProps, { updateSubscriptionProduct })(UpdateSubscriptionProduct)