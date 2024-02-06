import React from 'react'
import { ACTIONS } from '../App'

export const ClearButton = ({dispatch, clear}) => {
  return (
    <button
    onClick={()=> dispatch({type: ACTIONS.CLEAR})}
    >
        {clear}
    </button>
  )
}
