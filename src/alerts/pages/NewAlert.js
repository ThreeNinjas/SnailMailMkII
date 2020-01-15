import React from 'react'

import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import { useForm } from '../../shared/hooks/form-hook'

import { VALIDATOR_REQUIRE } from '../../shared/util/validators'

const NewAlert = () => {
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

    const alertSubmitHandler = event => {
        event.preventDefault()
        console.log(formState.inputs)
    }

    return (
        <form className="place-form" onSubmit={alertSubmitHandler}>
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
            <Button type="submit" disabled={!formState.isValid}>ADD PLACE</Button>
        </form>
    )
}

export default NewAlert