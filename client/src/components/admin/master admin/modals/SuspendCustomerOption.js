import React from 'react'
import { connect } from 'react-redux'
import { showSuspendCustomerOptions, suspendCustomer } from '../../../../actions/admin'
import Spaces from '../../../layout/Spaces'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const SuspendCustomerOption = ({ showSuspendCustomerOptions, suspendCustomer, showFlag, customer }) => {
  const [subscriptionEndDate, setSubscriptionEndDate] = React.useState(new Date())
  const [option, setOption] = React.useState('immediately')
  const [endDate, setEndDate] = React.useState(new Date())

  const clear = () => {
    showSuspendCustomerOptions('none', {})
  }

  React.useEffect(() => {
    if (customer.subscriptionEndDate) {
      setOption('immediately')
      setSubscriptionEndDate(new Date(customer.subscriptionEndDate * 1000))
      setEndDate(new Date(customer.subscriptionEndDate * 1000))
    }
  }, [customer])

  return (
    <div className="w3-modal" style={{ display: showFlag }}>
      <div className="w3-modal-content w3-animate-top w3-card-4 suspendCustomer">
        <header className="w3-container">
          <span onClick={() => showSuspendCustomerOptions('none', {})}
            className="w3-button w3-display-topright">&times;</span>
          <h2>SUSPEND CUSTOMER OPTIONS</h2>
        </header>
        <div className="w3-container">
          <br />
          <div>
            <input type='radio' value='immediately' checked={option === "immediately"} onChange={() => setOption("immediately")} />
            <Spaces spaceLength={1} />
            <label>SUBSCRIPTION ENDS IMMEDIATELY.</label>
            {option === 'immediately'
              ?
              <>
                <h6 className="w3-text-red w3-justify" style={{marginLeft: '40px'}}>If you choose this, the customer will not be charged again for the subscription. And also, the REST DAYS of customer's subscription will be REMOVED. DISPUTES may arise with customers, so please CONSIDER it again.</h6>
              </>
              : null
            }
          </div>
          <div>
            <input type='radio' value='atEnd' checked={option === "atEnd"} onChange={() => setOption("atEnd")} />
            <Spaces spaceLength={1} />
            <label>SUBSCRIPTION ENDS AT THE END OF PERIOD.</label>
          </div>
          <div>
            <input type='radio' value='setDate' checked={option === "setDate"} onChange={() => setOption("setDate")} />
            <Spaces spaceLength={1} />
            <label>DECIDE THE SUBSCRIPTION END DATE.</label>
          </div>
          {option === 'setDate'
            ?
            <div>
              <Spaces spaceLength={5} />
              <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
              <Spaces spaceLength={2} />
              {endDate > subscriptionEndDate
                ? <span className="w3-text-indigo">DCG will automatically calculate the PRORATION of subscription.</span>
                : <span className="w3-text-red">The date should be after than SUBSCRIPTION END DATE</span>
              }
            </div>
            :
            null
          }
          {(option === 'immediately' || option === 'atEnd' || (option === 'setDate' && endDate > subscriptionEndDate)
            ?
            <>
              <button
                className="w3-right"
                onClick={() => {
                  suspendCustomer({
                    customer: customer,
                    option,
                    endDate
                  })
                  clear()
                }}
              >
                <span className="glyphicon glyphicon-pause">SUSPEND</span>
              </button>
              <br />
            </>
            : null
          )}
          <br />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  showFlag: state.admin.suspendCustomerModalShow,
  customer: state.admin.customerForSuspend
})

export default connect(mapStateToProps, { showSuspendCustomerOptions, suspendCustomer })(SuspendCustomerOption)