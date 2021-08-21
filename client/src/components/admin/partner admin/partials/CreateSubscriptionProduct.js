import React from 'react'
import { connect } from 'react-redux'
import Spaces from '../../../layout/Spaces'
import { subscriptionProductCreateInprogress, addSubscriptionProductToStripe } from '../../../../actions/partner'

const CreateSubscriptionProduct = ({ productOwner, createSubscriptionProductInProgress, subscriptionProductCreateInprogress, addSubscriptionProductToStripe }) => {
  const [name, setName] = React.useState("Test Subscription Product")
  const [price, setPrice] = React.useState(100)
  const [description, setDescription] = React.useState("Test Subscription Product Description")
  const [recurringInterval, setRecurringInterval] = React.useState("month")

  const onSubmit = e => {
    e.preventDefault()
    if (name && description && (price > 0.1)) {
      addSubscriptionProductToStripe({ name, price, description, productOwner, recurringInterval })
    }
  }

  if (createSubscriptionProductInProgress) {
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
          <button type="submit" className="w3-button w3-grey w3-round">SUBMIT</button>
          <Spaces spaceLength={2} />
          <button onClick={() => subscriptionProductCreateInprogress(false)} className="w3-button w3-grey w3-round">
            CANCEL
          </button>
        </div>
      </form>
    )
  } else {
    return (
      <button onClick={() => subscriptionProductCreateInprogress(true)} className="w3-button w3-grey w3-right w3-round">
        CREATE A PRODUCT
      </button>
    )
  }
}

const mapStateToProps = state => ({
  productOwner: state.auth.user._id,
  createSubscriptionProductInProgress: state.partner.createSubscriptionProductInProgress
})

export default connect(mapStateToProps, { subscriptionProductCreateInprogress, addSubscriptionProductToStripe })(CreateSubscriptionProduct)