import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

import { VALIDATOR_REQUIRE } from '../../shared/util/validators'

import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { AuthContext } from '../../shared/context/auth-context'

const NewAlert = () => {
    const auth = useContext(AuthContext)
    const {isLoading, error, sendRequest, setError, clearError} = useHttpClient()
    const history = useHistory()

    const [formState, inputHandler] = useForm({
            url: {
                value: '',
                isValid: false
            },
            label: {
                value: '',
                isValid: false
            },
            emailOrText: {
                value: '',
                isValid: false
            }
        },
        false
    )

    const alertSubmitHandler = async event => {
        console.log('auth.userId?')
        console.log(auth.userId)
        console.log('auth.userToken?')
        console.log(auth.userToken)
        event.preventDefault()
        console.log(formState.inputs.emailOrText.value)
        try {
            const responseData = await sendRequest('http://localhost:5000/alerts/', 'POST', JSON.stringify({
            url: formState.inputs.url.value,
            label: formState.inputs.label.value,
            emailOrText: formState.inputs.emailOrText.value,
            _id: auth.userId,
            token: auth.userToken
        }),
            { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth.userToken
            }
        )
        if (responseData.message) {
            console.log(responseData)
            return setError(responseData.message)
        }
        history.push('/'+auth.userId+'/alerts')
        } catch (e) {
            console.log('boo')
            //setError(responseData.message)
        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <form className="place-form" onSubmit={alertSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                <Input 
                    type="text" 
                    label="iNaturalist URL" 
                    id="url" 
                    element="input" 
                    validators={[VALIDATOR_REQUIRE()]} 
                    errorText="Please enter a valid taxa ID."
                    onInput={inputHandler}
                />
                <Input 
                    type="text"
                    label="Label"
                    id="label" 
                    element="input" 
                    validators={[VALIDATOR_REQUIRE()]} 
                    errorText="Please enter a valid place ID."
                    onInput={inputHandler}
                />
                <Input 
                    type="radio"
                    label="How do you want to be notified?"
                    id="emailOrText" 
                    element="radio" 
                    values={["text", "email"]}
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="You must choose text or email."
                    onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>ADD ALERT</Button>
            </form>
        </React.Fragment>
    )
}

export default NewAlert