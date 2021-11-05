import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { checkPartnerUsernameEmail } from '../../actions/admin'
import { getProductByID, createCustomer, customerResubscribe } from '../../actions/partner'
import { loadStripe } from '@stripe/stripe-js'
import { CardNumberElement, CardExpiryElement, CardCvcElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js'
import { useHistory } from "react-router-dom"
import sales2Payments from '../../img/sales2/sales2-payments.png'
import Spinner from '../layout/Spinner'
import { setAlert } from '../../actions/alert'
import { logout } from '../../actions/auth'

const CheckoutForSubscription2 = ({ match, getProductByID, productForSale, stripePublishableKey, user, createCustomer, customerResubscribe, customerCreateInProgress, checkPartnerUsernameEmail, customer, setAlert, logout }) => {
  let history = useHistory()
  const stripePromise = loadStripe(stripePublishableKey)

  React.useEffect(() => {
    getProductByID(match.params.id)
  }, [getProductByID, match.params.id])

  return (
    <div className='container-fluid bg-checksub2'>
      <div className='row'>
        <div className='container'>
          <div className='row' style={{ margin: '10px' }}>
            {customer
              ?
              customer.type === 'customer'
                ?
                <a onClick={logout} className="btn w3-white" href="/">BACK</a>
                :
                <Link onClick={() => history.goBack()} className="btn w3-white">BACK</Link>
              :
              null
            }
          </div>
          <div className='row'>
            <div className='col-sm-5 mobileST'>
              <div className='order' style={{ minHeight: '140px' }}>
                <div className='details'>
                  <h5>Your order</h5>
                </div>
                <div className='details'>
                  <h5>
                    {productForSale.name}
                  </h5>
                </div>
                <div className='details'>
                  <div style={{ borderTop: '2px solid #ddd' }}>
                    <div style={{ float: 'left' }}>
                      <h5>Recurring</h5>
                    </div>
                    <div style={{ float: 'right' }}>
                      <h5>${productForSale.price / 100} each 1 {productForSale.recurringInterval}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-sm-7 mobileST'>
              {customerCreateInProgress ? <Spinner /> :
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    productForSale={productForSale}
                    stripe={stripePromise}
                    sellerID={user._id}
                    createCustomer={createCustomer}
                    customerResubscribe={customerResubscribe}
                    checkPartnerUsernameEmail={checkPartnerUsernameEmail}
                    history={history}
                    customer={customer}
                    setAlert={setAlert}
                  />
                </Elements>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const CheckoutForm = ({ productForSale, stripe, sellerID, createCustomer, customerResubscribe, history, checkPartnerUsernameEmail, customer, setAlert }) => {
  const [isResubscribe, setIsResubscribe] = React.useState(false)
  const [error, setError] = React.useState('');
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [password2, setPassword2] = React.useState('')
  const elements = useElements()
  const stripeUse = useStripe()

  React.useEffect(() => {
    if (customer !== null) {
      if (customer.type === 'customer') {
        setIsResubscribe(true)
        setName(customer.name)
        setUsername(customer.username)
        setEmail(customer.email)
        setPhone(customer.phone)
        setPassword(customer.passwordForUpdate)
        setPassword2(customer.passwordForUpdate)
      }
    }
  }, [customer])

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
      setAlert(paymentMethod.error.message, 'warning')
      return
    }

    if (isResubscribe) {
      await customerResubscribe({
        customerID: customer._id,
        paymentMethodID: paymentMethod.paymentMethod.id,
        productForSale: productForSale
      }, history, sellerID)
    } else {
      const isExist = await checkPartnerUsernameEmail({ username, email })

      if (isExist) {
        return
      }
      if (password.length < 6) {
        setAlert("Password should be over 6 letters or digits.", 'warning')
        return
      }
      if (password !== password2) {
        setAlert("Password and confirmed password are not matched. Try again.", 'warning')
        return
      }
      await createCustomer({
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
  }

  return (
    <div className='order'>
      <div>
        {isResubscribe
          ?
          <div className='details'>
            <p>If you have already resubscribed, please wait for a while. You can login later.</p>
          </div>
          :
          null
        }
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
                disabled={isResubscribe ? true : false}
              />
            </div>
            <div className='col-sm-6'>
              <input
                className='form-control'
                placeholder='User Name'
                name="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                disabled={isResubscribe ? true : false}
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
                disabled={isResubscribe ? true : false}
              />
            </div>
            <div className='col-sm-6'>
              <input
                className='form-control'
                placeholder='Your email'
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={isResubscribe ? true : false}
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
                disabled={isResubscribe ? true : false}
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
                disabled={isResubscribe ? true : false}
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
  customer: state.auth.user,
  productForSale: state.partner.productForSale,
  stripePublishableKey: state.partner.stripePublishableKey,
  customerCreateInProgress: state.partner.customerCreateInProgress
})

export default connect(mapStateToProps, { getProductByID, createCustomer, customerResubscribe, checkPartnerUsernameEmail, setAlert, logout })(CheckoutForSubscription2)