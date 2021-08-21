import React from 'react'
import { connect } from 'react-redux'
import Spaces from '../../../layout/Spaces'
import { onetimeProductCreateInprogress, addOneTimeProductToStripe } from '../../../../actions/partner'

const CreateOneTimeProduct = ({ productOwner, createOneTimeProductInProgress, onetimeProductCreateInprogress, addOneTimeProductToStripe }) => {
  const [name, setName] = React.useState("Test One Time Product")
  const [price, setPrice] = React.useState(100)
  const [description, setDescription] = React.useState("Test One Time Product Description")

  const onSubmit = e => {
    e.preventDefault()
    addOneTimeProductToStripe({name, price, description, productOwner})
  }

  if (createOneTimeProductInProgress) {
    return (
      <form className="form" onSubmit={onSubmit}>
        <div className="row">
          <br />
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
        <div className="w3-right">
          <button type="submit" className="w3-button w3-grey w3-round">SUBMIT</button>
          <Spaces spaceLength={2} />
          <button onClick={() => onetimeProductCreateInprogress(false)} className="w3-button w3-grey w3-round">
            CANCEL
          </button>
        </div>
      </form>
    )
  } else {
    return (
      <button onClick={() => onetimeProductCreateInprogress(true)} className="w3-button w3-grey w3-right w3-round">
        CREATE A PRODUCT
      </button>
    )
  }
}

const mapStateToProps = state => ({
  productOwner: state.auth.user._id,
  createOneTimeProductInProgress: state.partner.createOneTimeProductInProgress
})

export default connect(mapStateToProps, { onetimeProductCreateInprogress, addOneTimeProductToStripe })(CreateOneTimeProduct)