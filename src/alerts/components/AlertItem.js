import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom'

import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button'
import Modal from '../../shared/components/UIElements/Modal'
import UpdateAlert from '../pages/UpdateAlert'
import {AuthContext} from '../../shared/context/auth-context'

import './AlertItem.css'
import Avatar from '../../shared/components/UIElements/Avatar'

const AlertItem = props => {
    const auth = useContext(AuthContext)
    const [showEdit, setShowEdit] = useState(false)

    const openEditHandler = () => { setShowEdit(true) }
    const closeEditHandler = () => { setShowEdit(false) }

    const [showDelete, setshowDelete] = useState(false)

    const openDeleteHandler = () => { setshowDelete(true) }
    const closeDeleteHandler = () => { setshowDelete(false) }
    
    return (
        <React.Fragment>
            <Modal 
            show={showEdit} 
            onCancel={closeEditHandler} 
            header="Update Alert" 
            contentClass="alert-item__modal-content" 
            footerClass="alert-item__modal-actions"
            footer={<Button onClick={closeEditHandler}>Close</Button>}
            >
                <div className="map-containter">
                    <UpdateAlert alertId={props.id} />
                </div>
            </Modal>
            <li className="alert-item">
                <Card className="alert-item__content">
                    <Link to={`/${props.id}/alerts`}>
                        <div className="alert-item__image">
                            {props.taxaPhoto != '' &&<Avatar image={props.taxaPhoto} alt={props.taxaName} />}
                        </div>
                        <div className="alert-item__info">
                            <h2>{props.label}</h2>
                            <h3> {props.location} </h3>
                            {props.lastSeen != '' && <p>Last seen on {props.lastSeen}</p>}
                            {props.lastSeen === '' && <p>No observations yet</p>}
                            {auth.isLoggedIn && 
                            <Button onClick={openEditHandler}>Edit</Button>}
                            {auth.isLoggedIn &&
                            <Button onClick={openDeleteHandler}>Delete</Button>}
                        </div>
                    </Link>
                </Card>
            </li>
        </React.Fragment>
    )
}

export default AlertItem