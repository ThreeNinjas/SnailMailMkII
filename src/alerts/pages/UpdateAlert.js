import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from '../../shared/hooks/form-hook'

import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'

import { useHttpClient } from '../../shared/hooks/http-hook'
import { AuthContext } from '../../shared/context/auth-context'

import { VALIDATOR_REQUIRE } from '../../shared/util/validators'

import './AlertForm.css'

const UpdateAlert = props => {
    const auth = useContext(AuthContext)
    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const [loadedAlert, setLoadedAlert] = useState()
    const alertId = props.alertId
    const history = useHistory()

    const [formState, inputHandler, setFormData] = useForm({
        label: {
            value: '',
            isValid: false
        },
        emailOrText: {
            value: '',
            isValid: false
        }
    }, false)

    useEffect(() => {
        const fetchAlert = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/alert/${alertId}`)
                setLoadedAlert(responseData)
                setFormData({
                    label: {
                        value: responseData.label,
                        isValid: true
                    },
                    emailOrText: {
                        value: responseData.emailOrText,
                        isValid: true
                    }
                })
            } catch (e) {
                console.log('some DOGS ALLOWED')
            }
        }
        fetchAlert()
    }, [sendRequest, alertId, setFormData])

    const alertUpdateSubmitHandler = async event => {
        event.preventDefault()
        try {
            await sendRequest(`http://localhost:5000/alerts/${alertId}`, 'PATCH', JSON.stringify({
            label: formState.inputs.label.value,
            'emailOrText': formState.inputs.emailOrText.value
        }), {
            'Content-Type': 'application/json'
        })
        history.push('/'+auth.userId+'/alerts')
        } catch (e) {
            
        }
    }

    if (isLoading) {
        return (
            <div className="center">
                <LoadingSpinner />
            </div>
        )
    }

    if (!loadedAlert && !error) {
        return (
            <div className="center">
            <Card>
                <h2>Could not find alert...</h2>
            </Card>
            </div>
        )
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && loadedAlert &&<form className="place-form" onSubmit={alertUpdateSubmitHandler}>
            <Input 
                type="text"
                label="Label"
                id="label" 
                element="input" 
                validators={[VALIDATOR_REQUIRE()]} 
                errorText="Please enter a label."
                onInput={inputHandler}
                initialValue={loadedAlert.label}
                initialValid={true}
            />
            <Input 
                type="radio"
                label="How do you want to be notified?"
                id="emailOrText" 
                element="radio" 
                formValue={formState.inputs.emailOrText.value}
                values={["text", "email"]}
                validators={[VALIDATOR_REQUIRE()]}
                errorText="You must choose text or email."
                onInput={inputHandler}
                initialValue={loadedAlert.emailOrText}
                initialValid={true}
            />
                <Button type="submit" disabled={!formState.isValid}>UPDATE ALERT</Button>
            </form>}
        </React.Fragment>
    )
}

export default UpdateAlert