import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import 'react-notifications/lib/notifications.css'

const Alert1 = ({ alerts }) => {
  const createNotification = (alert) => {
    switch (alert.alertType) {
      case 'info':
        NotificationManager.info('Info message', alert.msg)
        break
      case 'success':
        NotificationManager.success('Success message', alert.msg)
        break
      case 'warning':
        NotificationManager.warning('Warning message', alert.msg)
        break
      case 'danger':
        NotificationManager.warning('Warning message', alert.msg)
        break
      case 'error':
        NotificationManager.error('Error message', alert.msg)
        break
    }
  }

  React.useEffect(() => {
    alerts.forEach(alert => {
      createNotification(alert)
    });
  }, [alerts, createNotification])

  return (
    <div>
      <NotificationContainer />
    </div>
  )
}

Alert1.propTypes = {
  alerts: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  alerts: state.alert
})

export default connect(mapStateToProps)(Alert1)