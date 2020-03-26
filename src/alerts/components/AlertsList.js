import React from 'react'

import './AlertsList.css'
import AlertItem from './AlertItem'

const AlertsList = props => {
    if (props.items.lenth === 0) {
        return (
            <div className="center">
                <h2>No alerts found.</h2>
            </div>
        )
    }

    return (
        <ul className="alerts-list">
            {props.items.map(alert => (
                <AlertItem
                    key={alert._id}
                    id={alert.__id}
                    ownerId={alert.owner}
                    /* type={alert.textOrEmail} */
                    label={alert.label}
                    /* taxaName={alert.taxa.name} */
                    taxaPhoto={alert.lastObservation ? alert.lastObservation.photo : ''}
                    /* location={alert.location} */
                    lastSeen={alert.lastObservation ? alert.lastObservation.observed_on : ''}
                />
            ))}
        </ul>
    )
}

export default AlertsList