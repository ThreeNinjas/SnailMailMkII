import React, { useEffect, useState } from 'react'
import { useForm } from '../../shared/hooks/form-hook'

import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card'

import { VALIDATOR_REQUIRE } from '../../shared/util/validators'

import './AlertForm.css'

const DUMMY_ALERTS = [
    {
        id: '1',
        label: 'Rosy Wolfsnails in Jefferson Parish',
        emailOrText: 'email',
        taxa: {
            id: '12345',
            name: 'Euglandina rosea2',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Euglandina_rosea.jpg'
        },
        location: {
            id: '67890',
            name: 'Jefferson Parish, LA'
        },
        lastSeen: 'Sep. 21, 2019',
        ownerId: 'u1'
    },
    {
        id: '2',
        textOrEmail: 'email',
        taxa: {
            id: '67890',
            name: 'Tursiops truncatus',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Tursiops_truncatus_01-cropped.jpg'
        },
        location: {
            id: '5678',
            name: 'Grand Isle, LA'
        },
        lastSeen: 'Sep. 21, 2019',
        ownerId: 'u2'
    },
    {
        id: '3',
        textOrEmail: 'email',
        taxa: {
            id: '67890',
            name: 'Oxalis gigantea',
            photo: 'https://worldofsucculents.com/wp-content/uploads/2016/08/Oxalis-gigantea3.jpg'
        },
        location: {
            id: '9012',
            name: 'Chile'
        },
        lastSeen: 'Sep. 21, 2019',
        ownerId: 'u2'
    }
]

const UpdateAlert = props => {
    const [isLoading, setIsLoading] = useState(true)
    const alertId = props.alertId

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

    const Alert = DUMMY_ALERTS.find(a => a.id === alertId)

    useEffect(() => {
        if (Alert) {
            console.log(Alert.emailOrText)
            setFormData({
                label: {
                    value: Alert.label,
                    isValid: true
                },
                emailOrText: {
                    value: Alert.emailOrText,
                    isValid: true
                }
            })
        }
        
        setIsLoading(false)
    }, [setFormData, Alert])

    const alertUpdateSubmitHandler = event => {
        event.preventDefault()
        console.log(formState.inputs)
    }

    if (!Alert) {
        return (
            <div className="center">
            <Card>
                <h2>Could not find alert.</h2>
            </Card>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="center">
                <h2>Loading...</h2>
            </div>
        )
    }

    return (
        <form className="place-form" onSubmit={alertUpdateSubmitHandler}>
        <Input 
            type="text"
            label="Label"
            id="label" 
            element="input" 
            validators={[VALIDATOR_REQUIRE()]} 
            errorText="Please enter a label."
            onInput={inputHandler}
            initialValue={formState.inputs.label.value}
            initialValid={formState.inputs.label.isValid}
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
            initialValue={formState.inputs.emailOrText.value}
            initialValid={formState.inputs.emailOrText.isValid}
        />
            <Button type="submit" disabled={!formState.isValid}>UPDATE ALERT</Button>
        </form>
        
    )
}

export default UpdateAlert