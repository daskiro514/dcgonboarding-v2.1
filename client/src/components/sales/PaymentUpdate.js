import React from 'react'
import { connect } from 'react-redux'
import { getCustomerUpdatePaymentInfo, updateCustomerPaymentMethod } from '../../actions/customer'
import sales2Payments from '../../img/sales2/sales2-payments.png'
import { setAlert } from '../../actions/alert'
import Spinner from '../layout/Spinner'
import countryCode from '../../utils/countryCode'

const years = ['2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033']
const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

const PaymentUpdate = ({ match, getCustomerUpdatePaymentInfo, customer, product, seller, setAlert, updateCustomerPaymentMethod }) => {
  const customerID = match.params.id

  const [isLoading, setIsLoading] = React.useState(false)

  const [name, setName] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [email, setEmail] = React.useState('')

  const [number, setNumber] = React.useState('')
  const [expMonth, setExpMonth] = React.useState('')
  const [expYear, setExpYear] = React.useState('')
  const [cvc, setCvc] = React.useState('')

  const [city, setCity] = React.useState('')
  const [country, setCountry] = React.useState('US')
  const [line1, setLine1] = React.useState('')
  const [line2, setLine2] = React.useState('')
  const [postalCode, setPostalCode] = React.useState('')
  const [state, setState] = React.useState('')


  React.useEffect(() => {
    getCustomerUpdatePaymentInfo(customerID)
  }, [customerID, getCustomerUpdatePaymentInfo])

  React.useEffect(() => {
    if (customer.name) {
      setName(customer.name)
      setPhone(customer.phone)
      setEmail(customer.email)
    }
  }, [customer])

  const onSubmit = e => {
    e.preventDefault()
    if (number.length < 7 || expMonth.length < 1 || expYear.length < 4 || cvc.length < 2) {
      setAlert('Invalid Card Info', 'danger')
      return
    }
    setIsLoading(true)
    let formData = {
      customerID,
      number,
      expMonth,
      expYear,
      cvc,
      product,
      seller,
      name,
      phone,
      email,
      line1,
      line2,
      city,
      state,
      country,
      postalCode
    }
    updateCustomerPaymentMethod(formData)
  }

  return (
    <div className='container-fluid bg-checksub2'>
      {customer._id
        ?
        <div className='row'>
          <div className='container'>
            <div className='row'>
              <div className='col-sm-5 mobileST'>
                <div className='order' style={{ minHeight: '140px' }}>
                  <div className='details'>
                    <h4>Your order</h4>
                  </div>
                  <div className='details'>
                    <h5>
                      {product.name}
                    </h5>
                  </div>
                  <div className='details'>
                    <div style={{ borderTop: '2px solid #ddd' }}>
                      <div style={{ float: 'left' }}>
                        <h5>Recurring</h5>
                      </div>
                      <div style={{ float: 'right' }}>
                        <h5>${product.price / 100} each 1 {product.recurringInterval}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-sm-7 mobileST'>
                <div className='order'>
                  <div>
                    <div className='details'>
                      <h4>Your details</h4>
                    </div>
                    {isLoading
                      ?
                      <Spinner />
                      :
                      <form className='form' onSubmit={onSubmit}>
                        <div className='details'>
                          <div className='row'>
                            <div className='col-sm-6'>
                              <input
                                className='form-control'
                                placeholder='Your name'
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                              />
                            </div>
                            <div className='col-sm-6'>
                              <input
                                className='form-control'
                                placeholder='User Name'
                                name="username"
                                defaultValue={customer.username}
                                disabled
                              />
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-sm-6'>
                              <input
                                className='form-control'
                                placeholder='Phone Number'
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                required
                              />
                            </div>
                            <div className='col-sm-6'>
                              <input
                                type='email'
                                className='form-control'
                                placeholder='Your email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <h5>Last 4 digits of current card</h5>
                          <div className='row'>
                            <div className='col-sm-6'>
                              <div className='row'>
                                <div className='col-sm-12'>
                                  <input
                                    className='form-control'
                                    defaultValue={customer.last4}
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='details'>
                          <h4>Payment Details</h4>
                          <h5>If you add a new card, DCG will no longer use the current card for the payment.</h5>
                        </div>
                        <div className='details'>
                          <div className='row'>
                            <div className='col-sm-6'>
                              <div className='row'>
                                <div className='col-sm-12'>
                                  <input
                                    className='form-control'
                                    placeholder='Card Number'
                                    value={number}
                                    onChange={e => setNumber(e.target.value)}
                                    required
                                    minLength={15}
                                  />
                                </div>
                              </div>
                              <div className='row cvc'>
                                <div className='col-sm-6'>
                                  <select
                                    className='form-control'
                                    placeholder='Exp Month'
                                    value={expMonth}
                                    onChange={e => setExpMonth(e.target.value)}
                                    required
                                  >
                                    <option value=''>Select Month</option>
                                    {months.map((item, index) =>
                                      <option key={index} value={item}>{item}</option>
                                    )}
                                  </select>
                                </div>
                                <div className='col-sm-6'>
                                  <select
                                    className='form-control'
                                    placeholder='Exp Full Year'
                                    value={expYear}
                                    onChange={e => setExpYear(e.target.value)}
                                    required
                                  >
                                    <option value=''>Select Year</option>
                                    {years.map((item, index) =>
                                      <option key={index} value={item}>{item}</option>
                                    )}
                                  </select>
                                </div>
                              </div>
                              <div className='row'>
                                <div className='col-sm-12'>
                                  <input
                                    className='form-control'
                                    placeholder='CVC'
                                    name="cvc"
                                    value={cvc}
                                    onChange={e => setCvc(e.target.value)}
                                    required
                                    minLength={3}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='col-sm-6'>
                              <img src={sales2Payments} alt='payments' className='img-responsive' />
                            </div>
                          </div>
                        </div>
                        <div className='details'>
                          <h4>Billing Details</h4>
                          <div className='row'>
                            <div className='col-sm-6' style={{ marginTop: '20px' }}>
                              <input
                                className='form-control'
                                placeholder='Address Line 1'
                                value={line1}
                                onChange={e => setLine1(e.target.value)}
                              />
                            </div>
                            <div className='col-sm-6' style={{ marginTop: '20px' }}>
                              <input
                                className='form-control'
                                placeholder='Address Line 2'
                                value={line2}
                                onChange={e => setLine2(e.target.value)}
                              />
                            </div>
                            <div className='col-sm-6' style={{ marginTop: '20px' }}>
                              <input
                                className='form-control'
                                placeholder='City'
                                value={city}
                                onChange={e => setCity(e.target.value)}
                              />
                            </div>
                            <div className='col-sm-6' style={{ marginTop: '20px' }}>
                              <input
                                className='form-control'
                                placeholder='State'
                                value={state}
                                onChange={e => setState(e.target.value)}
                              />
                            </div>
                            <div className='col-sm-6' style={{ marginTop: '20px' }}>
                              <select
                                className='form-control'
                                value={country}
                                onChange={e => setCountry(e.target.value)}
                              >
                                <option value=''>Select Country</option>
                                {countryCode().map((item, index) =>
                                  <option key={index} value={item['code']}>{item['name']} - {item['code']}</option>
                                )}
                              </select>
                            </div>
                            <div className='col-sm-6' style={{ marginTop: '20px' }}>
                              <input
                                className='form-control'
                                placeholder='Postal Code'
                                value={postalCode}
                                onChange={e => setPostalCode(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className='complete'>
                          <button type="submit">
                            Complete Order
                          </button>
                        </div>
                      </form>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        :
        null
      }
    </div>
  )
}

const mapStateToProps = state => ({
  customer: state.customer.customer,
  seller: state.customer.customer.seller,
  product: state.customer.customer.purchasedProductID
})

export default connect(mapStateToProps, { getCustomerUpdatePaymentInfo, setAlert, updateCustomerPaymentMethod })(PaymentUpdate)