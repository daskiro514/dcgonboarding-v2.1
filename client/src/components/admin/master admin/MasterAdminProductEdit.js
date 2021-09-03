import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { updateProduct } from '../../../actions/admin'
import Spinner from '../../layout/Spinner'

const MasterAdminProductEdit = ({ product, updateProduct, inProgress, productID }) => {
  let history = useHistory()

  const [type, setType] = React.useState('')
  const [name, setName] = React.useState("")
  const [price, setPrice] = React.useState(0)
  const [description, setDescription] = React.useState("")
  const [recurringInterval, setRecurringInterval] = React.useState("")

  React.useEffect(() => {
    setType(product.type)
    setName(product.name)
    setDescription(product.description)
    setPrice(product.price / 100)
    setRecurringInterval(product.recurringInterval)
  }, [product])

  const onSubmit = e => {
    if (name && (price > 0.1)) {
      updateProduct({ productID, name, price, description, recurringInterval, type }, history)
    } else {
      alert("Please fill the inputs below.")
    }
  }

  return (
    <div className="col-md-10 bg-panel">
      <div className="bg-panelMain row">
        <div className="col-md-6">
          <div className="adminSales">
            <div className="row">
              <div className="col-md-12 ap-box editpage">
                <h2>EDIT A PRODUCT</h2>
                {inProgress
                  ?
                  <Spinner />
                  :
                  <form className="form" onSubmit={onSubmit}>
                    <div className="row">
                      <br />
                      <div className="col-md-4">
                        <label>PRODUCT TYPE:</label>
                      </div>
                      <div className="col-md-8 form-group">
                        <input
                          value={type}
                          onChange={e => setType(e.target.value)}
                          className="form-control"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <label>PRODUCT NAME:</label>
                      </div>
                      <div className="col-md-8 form-group">
                        <input
                          value={name}
                          onChange={e => setName(e.target.value)}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <label>DESCRIPTION: </label>
                      </div>
                      <div className="col-md-8 form-group">
                        <textarea
                          value={description}
                          rows={3}
                          onChange={e => setDescription(e.target.value)}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <label>PRODUCT PRICE($):</label>
                      </div>
                      <div className="col-md-8 form-group">
                        <input
                          value={price}
                          onChange={e => setPrice(e.target.value)}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    {product.recurringInterval
                      ?
                      <div className="row">
                        <div className="col-md-4">
                          <label>RECURRING INTERVAL:</label>
                        </div>
                        <div className="col-md-8 form-group">
                          <select
                            value={recurringInterval}
                            onChange={e => setRecurringInterval(e.target.value)}
                            className="form-control"
                            required
                          >
                            <option value="day">DAY</option>
                            <option value="week">WEEK</option>
                            <option value="month">MONTH</option>
                            <option value="year">YEAR</option>
                          </select>
                        </div>
                      </div>
                      :
                      null
                    }
                    <div className="w3-right">
                      <button type="submit" className="w3-button w3-grey w3-round">SUBMIT</button>
                    </div>
                  </form>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  productID: state.admin.productForEdit._id,
  product: state.admin.productForEdit,
  inProgress: state.admin.productIsUpdating
})

export default connect(mapStateToProps, { updateProduct })(MasterAdminProductEdit)