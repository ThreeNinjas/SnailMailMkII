import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'

import AlertsList from '../components/AlertsList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { AuthContext } from '../../shared/context/auth-context'

const Alerts = () => {
    const auth = useContext(AuthContext)
    const [loadedAlerts, setLoadedAlerts] = useState()
    const {isLoading, error, sendRequest, clearError} = useHttpClient()

    const userId = useParams().userId

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/alerts/${userId}`) //http://localhost:5000/alerts/5e7abdf76c1b7845b8eef0e0
                
                setLoadedAlerts(responseData)
            } catch (e) {
                
            }
        }
        fetchAlerts()
    }, [sendRequest])

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <div className="center">
                <LoadingSpinner />
            </div>}
            {!isLoading && loadedAlerts && <AlertsList items={loadedAlerts} />}
        </React.Fragment>
        )
}

export default Alerts