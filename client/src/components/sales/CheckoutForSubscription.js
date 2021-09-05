import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getProductByID, createCustomer } from '../../actions/partner'
import logoImage from '../../img/course/logo2.png'
import { loadStripe } from '@stripe/stripe-js'
import { CardNumberElement, CardExpiryElement, CardCvcElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js'
import Spinner from '../layout/Spinner'
import { useHistory } from "react-router-dom"

const CheckoutForSubscription = ({ match, getProductByID, productForSale, stripePublishableKey, user, createCustomer, customerCreateInProgress }) => {
  let history = useHistory()
  const stripePromise = loadStripe(stripePublishableKey)

  React.useEffect(() => {
    getProductByID(match.params.id)
  }, [getProductByID, match.params.id])

  return (
    <div className="bg-check container-fluid">
      <div className="container">
        <div className="row">
          <br />
          <br />
          <div>
            <Link to={`/sales/${user._id}`} className="btn w3-white">BACK</Link>
          </div>
          <br />
          <div className="col-md-7">
            <div className="report-below-courses">
              <img src={logoImage} alt="PRODUCT" className="img-responsive" />
              <h3 className="w3-center">{productForSale.name} ({productForSale.price / 100} $ / {productForSale.recurringInterval})</h3>
              <p className="w3-center justify">{productForSale.description}</p>
            </div>
          </div>
          <div className="col-md-5" style={{ backgroundColor: "#fff", color: "black" }}>
            {customerCreateInProgress ? <Spinner /> :
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  productForSale={productForSale}
                  stripe={stripePromise}
                  sellerID={user._id}
                  createCustomer={createCustomer}
                  history={history}
                />
              </Elements>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const CheckoutForm = ({ productForSale, stripe, sellerID, createCustomer, history }) => {
  const [error, setError] = React.useState('');
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [password2, setPassword2] = React.useState('')
  const elements = useElements()
  const stripeUse = useStripe()

  const handleCardElementsChange = (event) => {
    if (event.error && !error) {
      setError(event.error.message)
    } else {
      setError('')
    }
  }

  const onSubmit = async () => {
    let card = elements.getElement(CardNumberElement)
    const paymentMethod = await stripeUse.createPaymentMethod({
      type: 'card',
      card: card,
      billing_details: {
        email: email,
      },
    })
    if (paymentMethod.error) {
      alert(paymentMethod.error.message)
      return
    }
    if (password !== password2) {
      alert("Password and confirmed password are not matched. Try again.")
      return
    }
    createCustomer({
      name: name,
      email: email,
      phone: phone,
      username: username,
      password: password,
      sellerID: sellerID,
      paymentMethodID: paymentMethod.paymentMethod.id,
      productForSale: productForSale
    }, history, sellerID)
  }

  return (
    <div className="row">
      <div className="col-md-6">
        <br />
        <label>Name</label><br />
        <input
          style={{ border: "none", outline: "0" }}
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="John Doe"
        /><br /><br />
        <label>Email</label><br />
        <input
          type="email"
          style={{ border: "none", outline: "0" }}
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="john.doe@placeholder.com"
        /><br /><br />
        <label>Phone</label><br />
        <input
          style={{ border: "none", outline: "0" }}
          name="phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="0734234234"
        /><br /><br />
        <label>Username</label><br />
        <small>This is for your login</small>
        <input
          style={{ border: "none", outline: "0" }}
          name="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="star"
        /><br /><br />
        <label>Password</label><br />
        <small>This is for your login. This should be over 6 letters or digits</small>
        <input
          type="password"
          style={{ border: "none", outline: "0" }}
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        /><br /><br />
        <label>Confirm Password</label><br />
        <input
          type="password"
          style={{ border: "none", outline: "0" }}
          name="password2"
          value={password2}
          onChange={e => setPassword2(e.target.value)}
        /><br /><br />
      </div>
      <div className="col-md-6">
        <br />
        <label>Card number</label>
        <CardNumberElement
          onChange={handleCardElementsChange}
        />
        <br />
        <label>Expiration date</label>
        <CardExpiryElement
          onChange={handleCardElementsChange}
        />
        <br />
        <label>CVC</label>
        <CardCvcElement
          onChange={handleCardElementsChange}
        /><br />
        <button type="submit" onClick={onSubmit} disabled={!stripe}>
          {`Pay ${productForSale.price / 100}$/month`}
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.partner.tempUser,
  productForSale: state.partner.productForSale,
  stripePublishableKey: state.partner.stripePublishableKey,
  customerCreateInProgress: state.partner.customerCreateInProgress
})

export default connect(mapStateToProps, { getProductByID, createCustomer })(CheckoutForSubscription)