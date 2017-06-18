import React from 'react'
import { connect } from 'react-redux'
import './Alert.css'

class Alert extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        
        let { hidden } = this.props

        setTimeout(() => {
            this.$ref.classList.add('showAlert')
        }, 0)

        setTimeout(() => {
            hidden()
        }, 2000)
    }    

    render() {
        let { msg } = this.props
        return (
            <p className="alert" ref = {(ref) => { this.$ref = ref}}>{msg}</p>
        )
    }
}

const AlertRedux = connect(
    () => {},
    (dispatch) => {
        return {
            hidden() {
                dispatch({
                    type: 'ALERT_HIDDEN'
                })
            }
        }
    }
)(Alert)

export default AlertRedux