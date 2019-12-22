import React from 'react'
import { useParams } from 'react-router-dom'

import AlertsList from '../components/AlertsList'

const DUMMY_ALERTS = [
    {
        id: 1,
        textOrEmail: 'text',
        taxa: {
            id: 12345,
            name: 'Euglandina rosea',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Euglandina_rosea.jpg'
        },
        location: 'Jefferson Parish, LA',
        lastSeen: 'Sep. 21, 2019',
        ownerId: 'u1'
    },
    {
        id: 2,
        textOrEmail: 'email',
        taxa: {
            id: 67890,
            name: 'Tursiops truncatus',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Tursiops_truncatus_01-cropped.jpg'
        },
        location: 'Grand Isle, LA',
        lastSeen: 'Sep. 21, 2019',
        ownerId: 'u2'
    },
    {
        id: 2,
        textOrEmail: 'email',
        taxa: {
            id: 67890,
            name: 'Oxalis gigantea',
            photo: 'https://worldofsucculents.com/wp-content/uploads/2016/08/Oxalis-gigantea3.jpg'
        },
        location: 'Chile',
        lastSeen: 'Sep. 21, 2019',
        ownerId: 'u2'
    }
]

const Alerts = () => {
    const userId = useParams().userId
    const loadedAlerts = DUMMY_ALERTS.filter(alert => alert.ownerId === userId)
    
    return (
        <AlertsList items={loadedAlerts} />
        )
}

export default Alerts