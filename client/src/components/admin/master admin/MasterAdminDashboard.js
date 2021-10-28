import React from 'react'
import Moment from 'react-moment'
import Chart from "react-apexcharts"
import { connect } from 'react-redux'
import { getAdminTransactions, getPendingPartners, getReports } from '../../../actions/admin'
import formatDate from '../../../utils/formatDate'
import Spaces from '../../layout/Spaces'
import { useHistory } from 'react-router-dom'
import { getTotalIncome, getAdminChartOptions, getAdminChartSeries } from '../../../utils/adminCharts'

const MasterAdminDashboard = ({ getAdminTransactions, adminID, transactions, getPendingPartners, pendingPartners, getReports, reports, baseURL }) => {
  const history = useHistory()

  React.useEffect(() => {
    getAdminTransactions(adminID)
    getPendingPartners()
    getReports()
  }, [getAdminTransactions, adminID, getPendingPartners, getReports])

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

  const [pageTransactions, setPageTransactions] = React.useState([])
  const [pageNumber, setPageNumber] = React.useState(1)
  const [maxPageNumber, setMaxPageNumber] = React.useState(1)

  React.useEffect(() => {
    setPageTransactions(transactions.sort((element1, element2) => { return new Date(element2.date) - new Date(element1.date) }).slice((pageNumber - 1) * 5, pageNumber * 5))
    setMaxPageNumber(Math.ceil(transactions.length / 5))
  }, [transactions, pageNumber])

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

  return (
    <div className="bg-panelMain row">
      <div className="col-md-7">
        <div className="adminSales">
          <div className="row">
            <div className="col-md-12 ap-box">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h3 className="w3-center ap-title">Total Income</h3><Spaces spaceLength={4} />
                <h1 className="w3-center">{getTotalIncome(transactions)} $</h1>
              </div>
              <LineChart />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className="adminSales p-2">
              <h3 className="ap-title">Pending Users</h3>
              {pendingPartners.slice(0, 4).map((item, index) =>
                <div key={index} className='mt-1 pl-1' style={{ borderLeft: '5px solid #D2A869' }}>
                  <p className='text-black mb-0'>{item.name}</p>
                  <p className='text-silver'>{formatDate(item.date)}</p>
                </div>
              )}
              {pendingPartners.length > 4 ? <h3 className='w3-center text-black'>...</h3> : null}
              <div className='text-dcg mt-1'>
                <p className='w3-right cursor-pointer' onClick={async () => history.push('/pending')}>View All Users<i className='fas fa-long-arrow-alt-right ml-1'></i></p>
                <br />
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className="adminSales p-2">
              <h3 className="ap-title">Recent Reports</h3>
              {reports.reverse().slice(0, 4).map((item, index) =>
                <div key={index} className='pt-1 d-flex align-items-center'>
                  <div className='mr-1'>
                    <img src={baseURL + item.thumbimage} alt="THUMB" width="40px" height="40px" className='rounded-circle' />
                  </div>
                  <div>
                    <p className='text-black mb-0'>{item.title}</p>
                    <p className='text-silver'>From Jamar James</p>
                  </div>
                </div>
              )}
              {reports.length > 4 ? <h3 className='w3-center text-black'>...</h3> : null}
              <div className='text-dcg mt-1'>
                <p className='w3-right cursor-pointer' onClick={async () => history.push('/reports')}>View All Reports<i className='fas fa-long-arrow-alt-right ml-1'></i></p>
                <br />
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
      <div className="col-md-5 ap-box">
        <div className="adminSales overflow1">
          <h3 className="ap-title ml-1 mt-1">Track Sales</h3>
          <br />
          {pageTransactions.map((item, index) => (
            <table className="saleList w3-table" key={index}>
              <tbody>
                <tr>
                  <td className='text-bold'>PRODUCT NAME:</td>
                  <td>{item.product ? item.product : item.productID.name}</td>
                </tr>
                <tr>
                  <td className='text-bold'>AMOUNT:</td>
                  <td>{item.amount / 100}<span>$</span></td>
                </tr>
                <tr>
                  <td className='text-bold'>CUSTOMER:</td>
                  <td>{item.customerID ? item.customerID.name : item.customerName}</td>
                </tr>
                <tr>
                  <td className='text-bold'>DATE:</td>
                  <td><Moment format="MM/DD/YYYY HH:mm:ss">{item.date}</Moment></td>
                </tr>
              </tbody>
            </table>
          ))}
          <div className='text-center pt-1'>
            {(pageNumber - 1) * 5 + 1} - {(pageNumber - 1) * 5 + pageTransactions.length} of {transactions.length}
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
  adminID: state.auth.user._id,
  transactions: state.admin.transactions,
  pendingPartners: state.admin.pendingPartners,
  reports: state.admin.reports,
  baseURL: state.admin.baseURL
})

export default connect(mapStateToProps, { getAdminTransactions, getPendingPartners, getReports })(MasterAdminDashboard)