import React from 'react'
import { connect } from 'react-redux'
import { getProductByID, createCustomer } from '../../actions/partner'
import { loadStripe } from '@stripe/stripe-js'
import { CardNumberElement, CardExpiryElement, CardCvcElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js'
import { useHistory } from "react-router-dom"
import sales2Payments from '../../img/sales2/sales2-payments.png'
import Spinner from '../layout/Spinner'

const CheckoutForSubscription2 = ({ match, getProductByID, productForSale, stripePublishableKey, user, createCustomer, customerCreateInProgress }) => {
  let history = useHistory()
  const stripePromise = loadStripe(stripePublishableKey)

  React.useEffect(() => {
    getProductByID(match.params.id)
  }, [getProductByID, match.params.id])

  return (
    <div className='container-fluid bg-checksub2'>
      <div className='row'>
        <div className='container'>
          <div className='col-sm-5 mobileST'>
            {/* <div className='order'>
              <h1>LALALA</h1>
            </div> */}
          </div>
          <div className='col-sm-7 mobileST'>
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
    if (password.length < 6) {
      alert("Password should be over 6 letters or digits.")
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
    <div className='order'>
      <div>
        <div className='details'>
          <h5>Your details</h5>
        </div>
        <div className='details'>
          <div className='row'>
            <div className='col-sm-6'>
              <input
                className='form-control'
                placeholder='Your name'
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className='col-sm-6'>
              <input
                className='form-control'
                placeholder='User Name'
                name="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-6'>
              <input
                className='form-control'
                placeholder='Phone Number'
                name="phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>
            <div className='col-sm-6'>
              <input
                className='form-control'
                placeholder='Your email'
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-6'>
              <input
                className='form-control'
                placeholder='Password'
                type="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className='col-sm-6'>
              <input
                className='form-control'
                placeholder='Confirm Password'
                type="password"
                name="password2"
                value={password2}
                onChange={e => setPassword2(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className='details'>
          <h5>Payment Details</h5>
        </div>
        <div className='details'>
          <div className='row'>
            <div className='col-sm-6'>
              <div className='row'>
                <div className='col-sm-12'>
                  <CardNumberElement
                    onChange={handleCardElementsChange}
                  />
                </div>
              </div>
              <div className='row cvc'>
                <div className='col-sm-6'>
                  <CardExpiryElement
                    onChange={handleCardElementsChange}
                  />
                </div>
                <div className='col-sm-6'>
                  <CardCvcElement
                    onChange={handleCardElementsChange}
                  />
                </div>
              </div>
            </div>
            <div className='col-sm-6'>
              <img src={sales2Payments} alt='payments' className='img-responsive' />
            </div>
          </div>
        </div>
        <div className='complete'>
          <button type="submit" onClick={onSubmit} disabled={!stripe}>
            Complete Order
          </button>
        </div>
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

export default connect(mapStateToProps, { getProductByID, createCustomer })(CheckoutForSubscription2)