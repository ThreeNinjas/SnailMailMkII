import React from 'react'
import { Link } from 'react-router-dom'

import Card from '../../shared/components/UIElements/Card'

import './AlertItem.css'
import Avatar from '../../shared/components/UIElements/Avatar'

const AlertItem = props => {
    return (
        <li className="alert-item">
            <Card className="alert-item__content">
                <Link to={`/${props.id}/alerts`}>
                    <div className="alert-item__image">
                        <Avatar image={props.taxaPhoto} alt={props.taxaName} />
                    </div>
                    <div className="alert-item__info">
                        <h2>{props.taxaName}</h2>
                        <h3> {props.location} </h3>
                        <p>Last seen on {props.lastSeen}</p>
                    </div>
                </Link>
            </Card>
        </li>
    )
}

export default AlertItem