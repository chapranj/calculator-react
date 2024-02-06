import React from 'react'
import { ACTIONS } from '../App'

export const Operation = ({dispatch, operand}) => {
  return (
    <button 
    onClick={()=> dispatch({type:ACTIONS.CHOOSE_OPERATION, payload:{operand}})}
    >{operand}</button>
  )
}
