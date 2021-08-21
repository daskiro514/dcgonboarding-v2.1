import React from 'react'
import Moment from 'react-moment'
import Chart from "react-apexcharts"
import { PieChart } from 'react-minimal-pie-chart'
import { connect } from 'react-redux'
import { getPartnerTransactions } from '../../../actions/partner'
import Spaces from '../../layout/Spaces'

const MasterAdminPartner = ({ partner, history, partnerID, transactions, getPartnerTransactions }) => {
  if (partner.type === undefined) {
    history.push('/partners')
  }

  const [graphSeriesData, setGraphSeriesData] = React.useState([])
  const [totalTransferAmount, setTotalTransferAmount] = React.useState(0)

  React.useEffect(() => {
    getPartnerTransactions(partnerID)
  }, [getPartnerTransactions, partnerID])

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

    var dailyTransferSeriesData = dailyTransfers.reverse().map(d => {
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
              <h2>{partner.username}: ({partner.type ? partner.type.toUpperCase() : null})</h2>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h3 className="w3-center ap-title">TOTAL INCOME</h3><Spaces spaceLength={4} />
                <h1 className="w3-center">{totalTransferAmount} $</h1>
              </div>
              <LineChart />
            </div>
          </div>
        </div>
        <div className="adminSales">
          <h3 className="w3-center ap-title">PERCENTAGE INCOME</h3>
          <div className="row">
            <div className="col-md-7 ap-box">
              <PieChart
                style={{ height: "40vh" }}
                data={[
                  { title: 'One', value: 99.9, color: '#C13C37' },
                  { title: 'Two', value: 0.1, color: '#E38627' },
                ]}
              />
            </div>
            <div className="col-md-5 ap-box">
              <h1 className="w3-center">100%</h1>
              <p className="w3-center">THIS YEAR</p>
              <h1 className="w3-center">0%</h1>
              <p className="w3-center">LAST YEAR</p>
            </div>
          </div>
        </div>
        <br />
      </div>
      <div className="col-md-5 ap-box">
        <div className="adminSales overflow1">
          <h2 className="w3-center ap-title">TRACK SALES</h2>
          {transactions.map((item, index) => (
            <table className="saleList w3-table" key={index}>
              <tbody>
                <tr>
                  <td>PRODUCT NAME:</td>
                  <td>{item.product ? item.product : item.productID.name}</td>
                </tr>
                <tr>
                  <td>TRANSFER ID:</td>
                  <td>{item.stripeTransferID}</td>
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
  partner: state.admin.currentPartner,
  partnerID: state.admin.currentPartner._id,
  transactions: state.partner.partnerTransactions
})

export default connect(mapStateToProps, { getPartnerTransactions })(MasterAdminPartner)