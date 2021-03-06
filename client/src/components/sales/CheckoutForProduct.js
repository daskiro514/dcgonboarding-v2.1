import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from './CheckoutForm'
import logoImage from '../../img/course/logo2.png'
import { getProductByID, getPaymentIntent } from '../../actions/partner'

const CheckoutForProduct = ({ match, getProductByID, productForSale, stripePublishableKey, user, paymentIntent, getPaymentIntent }) => {
  React.useEffect(() => {
    getProductByID(match.params.id)
  }, [getProductByID, match.params.id])

  React.useEffect(() => {
    if (productForSale.price > 0 && paymentIntent.id === undefined) {
      getPaymentIntent(productForSale.price)
    }
  }, [getPaymentIntent, productForSale.price, paymentIntent.id])

  const stripePromise = loadStripe(stripePublishableKey)

  return (
    <div className="bg-check container-fluid checkoutForProduct">
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
              <h3 className="w3-center">{productForSale.name} ({productForSale.price / 100} $)</h3>
              <p className="w3-center justify">{productForSale.description}</p>
            </div>
          </div>
          <div className="col-md-5" style={{ backgroundColor: "#fff", color: "black" }}>
            <Elements stripe={stripePromise}>
              <CheckoutForm paymentIntent={paymentIntent} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.partner.productForSale.owner ? state.partner.productForSale.owner : {},
  productForSale: state.partner.productForSale,
  stripePublishableKey: state.partner.stripePublishableKey,
  paymentIntent: state.partner.paymentIntent,
})

export default connect(mapStateToProps, { getProductByID, getPaymentIntent })(CheckoutForProduct)