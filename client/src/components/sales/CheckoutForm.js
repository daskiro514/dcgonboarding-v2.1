import React from 'react'
import { connect } from 'react-redux'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { addTransactionForOneTimeProductSale } from '../../actions/partner'
import CardSection from './CardSection'
import Spinner from '../layout/Spinner'
import { useHistory } from "react-router-dom"

const CheckoutForm = ({ paymentIntent, ownerID, productForSale, addTransactionForOneTimeProductSale }) => {
  const history = useHistory()
  const stripe = useStripe()
  const elements = useElements()
  const [checkoutIsInProgress, setCheckoutIsInProgress] = React.useState(false)

  const [billingDetails, setBillingDetails] = React.useState({
    email: "",
    phone: "",
    name: ""
  })

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    if (paymentIntent.client_secret === undefined) {
      return
    }

    setCheckoutIsInProgress(true)

    const result = await stripe.confirmCardPayment(paymentIntent.client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: billingDetails
      }
    })

    if (result.error) {
      setCheckoutIsInProgress(false)
      alert(result.error.message)
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        addTransactionForOneTimeProductSale({
          ownerID,
          productForSale,
          billingDetails
        }, history, ownerID)
        setCheckoutIsInProgress(false)
      }
    }
  }

  return (
    <form className="Form" onSubmit={handleSubmit}>
      {checkoutIsInProgress ? <Spinner /> : null}
      <Field
        label="Name"
        id="name"
        type="text"
        placeholder="Jane Doe"
        required
        autoComplete="name"
        value={billingDetails.name}
        onChange={(e) => {
          setBillingDetails({ ...billingDetails, name: e.target.value });
        }}
      />
      <Field
        label="Email"
        id="email"
        type="email"
        placeholder="janedoe@gmail.com"
        required
        autoComplete="email"
        value={billingDetails.email}
        onChange={(e) => {
          setBillingDetails({ ...billingDetails, email: e.target.value });
        }}
      />
      <Field
        label="Phone"
        id="phone"
        type="tel"
        placeholder="(941) 555-0123"
        required
        autoComplete="tel"
        value={billingDetails.phone}
        onChange={(e) => {
          setBillingDetails({ ...billingDetails, phone: e.target.value });
        }}
      />
      <CardSection /><br />
      {checkoutIsInProgress ? null : <button className="w3-right" disabled={!stripe}>Confirm order</button>}
      <br /><br />
    </form>
  )
}

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange
}) => (
  <div className="FormRow">
    <label htmlFor={id} className="FormRowLabel">
      {label}
    </label>
    <input
      className="FormRowInput"
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
    />
  </div>
)

const mapStateToProps = state => ({
  ownerID: state.partner.tempUser._id,
  productForSale: state.partner.productForSale,
})

export default connect(mapStateToProps, { addTransactionForOneTimeProductSale })(CheckoutForm)