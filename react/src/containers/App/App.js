import './App.styl'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import { resetErrorMessage } from '../../actions'
import Alert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';

class App extends React.Component {
  handleDismissClick () {
    return (e) => {
      e.preventDefault()
      this.props.resetErrorMessage()
    }
  }

  renderErrorMessage () {
    const { errorMessage } = this.props
    if (!errorMessage) return null

    return (
      <p className='error'>
        {errorMessage}
        <span className='close' onClick={this.handleDismissClick()}>
          &#x2718;
        </span>
      </p>
    )
  }

  render () {
    const { children } = this.props
    return (
      <div>
        <Alert stack={{limit: 3}}  timeout={3000}/>
        <Header />
        {this.renderErrorMessage()}
        <main>
          {children}
        </main>
      </div>
    )
  }
}

App.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.any,
  resetErrorMessage: PropTypes.func,
  // Injected by React Router
  children: PropTypes.node
}

function mapStateToProps (state) {
  return {
    errorMessage: state.errorMessage
  }
}

export default connect(mapStateToProps, {
  resetErrorMessage: resetErrorMessage
})(App)
