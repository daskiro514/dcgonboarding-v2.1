import React from 'react'
import Moment from 'react-moment'
import Chart from "react-apexcharts"
import { connect } from 'react-redux'
import { getAdminTransactions, getPendingPartners, getReports } from '../../../actions/admin'
import formatDate from '../../../utils/formatDate'
import Spaces from '../../layout/Spaces'
import { useHistory } from 'react-router-dom'

const MasterAdminDashboard = ({ getAdminTransactions, adminID, transactions, getPendingPartners, pendingPartners, getReports, reports, baseURL }) => {
  const history = useHistory()
  const [graphSeriesData, setGraphSeriesData] = React.useState([])
  const [totalTransferAmount, setTotalTransferAmount] = React.useState(0)

  React.useEffect(() => {
    getAdminTransactions(adminID)
    getPendingPartners()
    getReports()
  }, [getAdminTransactions, adminID, getPendingPartners, getReports])

  React.useEffect(() => {
    let transferArray = transactions ? transactions : []
    for (let i = 0; i < transferArray.length; i++) {
      let transfer = transferArray[i]
      let transfer_created = new Date(transfer.date)
      let transfer_created_fullDay = transfer_created.toLocaleDateString()
      transferArray[i].transferCreatedFullDay = transfer_created_fullDay
    }
    let dailyTransfers = []
    let firstTransferFlag = true
    let total = 0
    for (let i = 0; i < transferArray.length; i++) {
      let dailyTransfer = {
        transfer_created_day: transferArray[i].transferCreatedFullDay,
        amount: transferArray[i].amount / 100,
      }
      let sameTransferDayFindFlag = false
      for (let j = 0; j < dailyTransfers.length; j++) {
        if (dailyTransfers[j].transfer_created_day === dailyTransfer.transfer_created_day) {
          sameTransferDayFindFlag = true
          dailyTransfers[j].amount += dailyTransfer.amount
          break
        }
      }
      if (!sameTransferDayFindFlag || firstTransferFlag) {
        sameTransferDayFindFlag = false
        firstTransferFlag = false
        dailyTransfers.push(dailyTransfer)
      }
      total += transferArray[i].amount
    }

    setTotalTransferAmount(total / 100)

    var dailyTransferSeriesData = dailyTransfers.map(d => {
      var tempTransferObject = {}
      tempTransferObject.x = d.transfer_created_day
      tempTransferObject.y = d.amount
      return tempTransferObject
    })
    let temp = []
    let temp1 = {
      name: "Transfer Amount(USD)",
      data: dailyTransferSeriesData
    }
    temp.push(temp1)
    setGraphSeriesData(temp)
  }, [setGraphSeriesData, setTotalTransferAmount, transactions])

  const LineChart = () => {
    const options = {
      chart: {
        id: "basic-bar"
      }
    }

    return (
      <div
        style={{
          width: '100%',
          display: "inline-block"
        }}
      >
        <Chart
          options={options}
          series={graphSeriesData}
          type="bar"
          height="200"
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
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h3 className="w3-center ap-title">Total Income</h3><Spaces spaceLength={4} />
                <h1 className="w3-center">{totalTransferAmount} $</h1>
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
          {transactions.map((item, index) => (
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