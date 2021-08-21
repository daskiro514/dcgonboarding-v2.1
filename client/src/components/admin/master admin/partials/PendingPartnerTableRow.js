import React from 'react'
import Moment from 'react-moment';
import { connect } from 'react-redux'
import { showPartnerDetail, deletePendingPartner, approvePendingPartner, updateConnectedAccount } from '../../../../actions/admin'

const PendingPartnerTableRow = ({ pendingPartner, index, showPartnerDetail, deletePendingPartner, approvePendingPartner, updateConnectedAccount }) => {
  const [formData, setFormData] = React.useState({
    _id: pendingPartner._id,
    username: pendingPartner.username,
    password: "",
  });

  const { username, password } = formData;

  const onChange = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  React.useEffect(() => {
    setFormData({
      _id: pendingPartner._id,
      username: pendingPartner.username,
      password: pendingPartner.passwordForUpdate,
    })
  }, [pendingPartner]);

  return (
    <div className="pending_user_tr in_data">
      <p style={{ width: "5%", paddingLeft: "10px" }}>{index + 1}</p>
      <p style={{ width: "13.57%" }}>{pendingPartner.name}</p>
      <p style={{ width: "13.57%", wordBreak: "break-word" }}>{pendingPartner.email}</p>
      <p style={{ width: "13.57%" }}><input type="text" name="username" value={username} onChange={onChange} /></p>
      <p style={{ width: "13.57%" }}><input type="text" name="password" value={password} onChange={onChange} minLength="6" /></p>
      <p style={{ width: "13.57%" }}><Moment format="MM/DD/YYYY">{pendingPartner.date}</Moment></p>
      <p style={{ width: "25%" }}>{pendingPartner.connectedAccountStatus === 'enabled' ? <span>Connected Account is <span className="w3-text-indigo">ENABLED</span>. You can approve this partner.</span> : pendingPartner.mailSent ? <span>Connected Account is <span className="w3-text-red">RESTRICTED</span></span> : <span>Update link <span className="w3-text-red">SENT</span> to Client</span>}</p>
      <p style={{ width: "20%" }}>
        {pendingPartner.connectedAccountStatus === 'enabled' ? <button onClick={() => approvePendingPartner(formData)}><span className="glyphicon glyphicon-check"></span></button> : <button onClick={() => updateConnectedAccount(pendingPartner._id)}><span className="glyphicon glyphicon-refresh"></span></button>}
        <button onClick={() => showPartnerDetail('block', pendingPartner)}><span className="glyphicon glyphicon-eye-open"></span></button>
        <button onClick={() => deletePendingPartner(pendingPartner._id)}><span className="glyphicon glyphicon-trash"></span></button>
      </p>
    </div>
  )
};

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { showPartnerDetail, deletePendingPartner, approvePendingPartner, updateConnectedAccount })(PendingPartnerTableRow);
