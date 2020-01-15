import React, { useReducer, useEffect } from 'react'

import { validate } from'../../util/validators'
import './Input.css'

const inputReducer = (state, action) => {
    switch(action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            }

        case 'TOUCH':
            return {
                ...state,
                isTouched: true
            }

        default:
            return state
    }
}

const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '',
        isValid: props.initialValid || false,
        isTouched: false
    })

    const { id, onInput } = props
    const { value, isValid } = inputState

    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, value, isValid, onInput])

    const changeHandler = event => {
        dispatch({ 
            type: 'CHANGE', 
            val: event.target.value, 
            validators: props.validators
        })
    }

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        })
    }

    let element = ''
    if (props.element === 'input') {
         element = (
            <input 
            id={props.id} 
            type={props.type} 
            placeholder={props.placeholder} 
            onChange={changeHandler} 
            onBlur={touchHandler}
            value={inputState.value} 
        />
        )
    } else if (props.element === 'radio') {
        console.log(props.formValue)
        element = (
            <React.Fragment>
                <input type="radio" 
                    id={props.id}
                    name={props.id} 
                    value={props.values[0]}
                    checked={props.formValue === 'text' ? 'checked' : ''}
                    onChange={changeHandler} 
                    onBlur={touchHandler} /> Text<br />
                <input type="radio" 
                    id={props.id}
                    name={props.id} 
                    value={props.values[1]}
                    checked={props.formValue === 'email' ? 'checked' : ''}
                    onChange={changeHandler} 
                    onBlur={touchHandler} /> Email<br />
            </React.Fragment>
        )
    } else {
         element = (
            <textarea 
                id={props.id} 
                rows={props.rows || 3} 
                onChange={changeHandler} 
                onBlur={touchHandler}
                value={inputState.value} 
            />
            )
    }

    return (
        <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
            <label htmlFor={props.id}>
                {props.label}
            </label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    )
}

export default Input