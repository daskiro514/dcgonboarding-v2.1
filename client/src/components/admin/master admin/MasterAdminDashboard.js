import React from 'react'
import Moment from 'react-moment'
import Chart from "react-apexcharts"
import { connect } from 'react-redux'
import { getAdminTransactions, getPendingPartners, getReports } from '../../../actions/admin'
import Spaces from '../../layout/Spaces'

const MasterAdminDashboard = ({ getAdminTransactions, adminID, transactions, getPendingPartners, pendingPartners, getReports, reports, baseURL }) => {
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
                <h3 className="w3-center ap-title">TOTAL INCOME</h3><Spaces spaceLength={4} />
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
              <br />
              {pendingPartners.map((item, index) =>
                <div key={index}>
                  {item.name}
                </div>
              )}
            </div>
          </div>
          <div className='col-md-6'>
            <div className="adminSales p-2">
              <h3 className="ap-title">Recent Reports</h3>
              {reports.map((item, index) =>
                <div key={index} className='pt-1 d-flex align-items-center'>
                  <div className='mr-2'>
                    <img src={baseURL + item.thumbimage} alt="THUMB" width="40px" height="40px" className='rounded-circle' />
                  </div>
                  <div>
                    <p className='text-black mb-0'>{item.title}</p>
                    <p className='text-silver'>From Jamar James</p>
                  </div>
                </div>
              )}
              <div className='text-dcg'>
                <p className='w3-right'>View All Reports<i className='fas fa-long-arrow-alt-right ml-1'></i></p>
                <br/>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
      <div className="col-md-5 ap-box">
        <div className="adminSales overflow1">
          <h3 className="w3-center ap-title">TRACK SALES</h3>
          <br />
          {transactions.map((item, index) => (
            <table className="saleList w3-table" key={index}>
              <tbody>
                <tr>
                  <td>PRODUCT NAME:</td>
                  <td>{item.product ? item.product : item.productID.name}</td>
                </tr>
                <tr>
                  <td>AMOUNT:</td>
                  <td>{item.amount / 100}<span>$</span></td>
                </tr>
                <tr>
                  <td>CUSTOMER:</td>
                  <td>{item.customerID ? item.customerID.name : item.customerName}</td>
                </tr>
                <tr>
                  <td>DATE:</td>
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