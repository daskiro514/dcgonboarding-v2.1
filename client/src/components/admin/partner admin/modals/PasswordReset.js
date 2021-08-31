import React from 'react'
import { connect } from 'react-redux'
import { resetPassword } from '../../../../actions/admin'

const PasswordReset = ({ showPasswordResetModal, partnerForReset, showPartnerForReset, resetPassword }) => {
  const [userID, setUserID] = React.useState(partnerForReset ? partnerForReset._id : '')
  const [password, setPassword] = React.useState(partnerForReset ? partnerForReset.passwordForUpdate : '')

  const onSubmit = e => {
    e.preventDefault()
    resetPassword({ userID, password })
    showPasswordResetModal('none')
  }

  React.useEffect(() => {
    setUserID(partnerForReset ? partnerForReset._id : '')
    setPassword(partnerForReset ? partnerForReset.passwordForUpdate : '')
  }, [partnerForReset])

  return (
    <div className="w3-modal" style={{ display: showPartnerForReset }}>
      <div className="w3-modal-content w3-animate-top w3-card-3" style={{ color: 'black' }}>
        <header className="w3-container">
          <span onClick={() => showPasswordResetModal('none')}
            className="w3-button w3-display-topright">&times;</span>
          <h2>RESET PARTNER PASSWORD</h2>
        </header>
        <div className="w3-container">
          <form className="form" onSubmit={onSubmit} style={{ width: '70%', margin: 'auto' }}>
            <br />
            You can reset Partner password Here.
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="PASSWORD"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                minLength="6"
                required
              />
            </div>
            <div className="form-group">
              <input type="submit" className="form-control" value="SUBMIT" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { resetPassword })(PasswordReset)