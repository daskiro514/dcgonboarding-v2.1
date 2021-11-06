import React from 'react'
import Moment from 'react-moment'
import Chart from "react-apexcharts"
import { connect } from 'react-redux'
import { getPartnerTransactions, getPartnerCustomers } from '../../../actions/partner'
import { getTotalIncome, getAdminChartOptions, getAdminChartSeries } from '../../../utils/adminCharts'
import Spaces from '../../layout/Spaces'

const MasterAdminPartner = ({ partner, history, partnerID, transactions, getPartnerTransactions, getPartnerCustomers, customers }) => {
  if (partner.type === undefined) {
    history.push('/partners')
  }

  React.useEffect(() => {
    getPartnerTransactions(partnerID)
    getPartnerCustomers(partnerID)
  }, [getPartnerTransactions, getPartnerCustomers, partnerID])

  const [pageCustomers, setPageCustomers] = React.useState([])
  const [pageNumber, setPageNumber] = React.useState(1)
  const [maxPageNumber, setMaxPageNumber] = React.useState(1)

  React.useEffect(() => {
    setPageCustomers(customers.filter(customer => customer.customerStatus === 'Active').slice((pageNumber - 1) * 5, pageNumber * 5))
    setMaxPageNumber(Math.ceil(customers.length / 5))
  }, [customers, pageNumber])

  const nextPage = () => {
    if (pageNumber + 1 > maxPageNumber) {
      lastPage()
      return
    }
    setPageNumber(pageNumber + 1)
  }

  const prevPage = () => {
    if (pageNumber - 1 < 1) {
      firstPage()
      return
    }
    setPageNumber(pageNumber - 1)
  }

  const firstPage = () => {
    setPageNumber(1)
  }

  const lastPage = () => {
    setPageNumber(maxPageNumber)
  }

  const LineChart = () => {
    return (
      <div
        style={{
          width: '100%',
          display: "inline-block"
        }}
      >
        <Chart
          options={getAdminChartOptions()}
          series={getAdminChartSeries(transactions)}
          type='bar'
          height='200px'
          width='100%'
        />
      </div>
    )
  }

  return (
    <div className="bg-panelMain row">
      <div className="col-md-7">
        <div className="adminSales">
          <div className="row">
            <div className="col-md-12 ap-box">
              <h2>{partner.username}: ({partner.type ? partner.type.toUpperCase() : null})</h2>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h3 className="w3-center ap-title">TOTAL INCOME</h3><Spaces spaceLength={4} />
                <h1 className="w3-center">{getTotalIncome(transactions)} $</h1>
              </div>
              <LineChart />
            </div>
          </div>
        </div>

        <br />
      </div>
      <div className="col-md-5 ap-box">
        <div className="adminSales overflow1">
          <h3 className="ap-title ml-1 mt-1">Customers</h3>
          <br />
          {pageCustomers.map((item, index) =>
            <table className="saleList w3-table" key={index}>
              <tbody>
                <tr>
                  <td className='text-bold'>CUSTOMER NAME:</td>
                  <td>{item.name}</td>
                </tr>
                <tr>
                  <td className='text-bold'>REGISTERED:</td>
                  <td><Moment format="MM/DD/YYYY">{item.date}</Moment></td>
                </tr>
                <tr>
                  <td className='text-bold'>PURCHASED SUBSCRIPTION:</td>
                  <td>{item.purchasedProductID ? item.purchasedProductID.name : null}</td>
                </tr>
                <tr>
                  <td className='text-bold'>PERIOD ENDS:</td>
                  <td><Moment format="MM/DD/YYYY">{item.subscriptionEndDate * 1000}</Moment></td>
                </tr>
              </tbody>
            </table>
          )}
          <div className='text-center pt-1'>
            {(pageNumber - 1) * 5 + 1} - {(pageNumber - 1) * 5 + pageCustomers.length} of {customers.filter(customer => customer.customerStatus === 'Active').length}
          </div>
          <div className='text-center pt-1'>
            <button className='btn btn-sm' onClick={() => firstPage()}>
              <i className="material-icons">first_page</i>
            </button>
            <button className='btn btn-sm' onClick={() => prevPage()}>
              <i className="material-icons">navigate_before</i>
            </button>
            <button className='btn btn-sm' onClick={() => nextPage()}>
              <i className="material-icons">navigate_next</i>
            </button>
            <button className='btn btn-sm' onClick={() => lastPage()}>
              <i className="material-icons">last_page</i>
            </button>
          </div>
        </div>
        <br />
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  partner: state.admin.currentPartner,
  partnerID: state.admin.currentPartner._id,
  transactions: state.partner.partnerTransactions,
  customers: state.partner.partnerCustomers
})

export default connect(mapStateToProps, { getPartnerTransactions, getPartnerCustomers })(MasterAdminPartner)