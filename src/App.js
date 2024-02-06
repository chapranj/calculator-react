import logo from './logo.svg';
import './App.css';
import { useReducer } from 'react';
import { DigitButton } from './components/DigitButton';
import { Operation } from './components/Operation';
import { ClearButton } from './components/ClearButton';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        
        return {
          ...state,
          currentOperand: action.payload.digit,
          overwrite:false
        }
      }


      if (action.payload.digit === "0" && state.currentOperand === "0") return state
      if (action.payload.digit === "." && state.currentOperand.includes(".")) return state

      return {
        ...state, currentOperand: `${state.currentOperand || ""}${action.payload.digit}`
      }

    case ACTIONS.CLEAR:
      return {}

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: action.payload.operand,
          previousOperand: state.currentOperand,
          currentOperand: null
        }

      }
      // if(state.previousOperand !== null && state.currentOperand !== null && state.operation !==null ){


      if(state.currentOperand == null && state.previousOperand !== null && state.operation !== null){
        return{
          ...state,
          operation: action.payload.operand
        }
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: action.payload.operand,
        currentOperand: null

      }

    case ACTIONS.EVALUATE:

      if (state.currentOperand !== null && state.previousOperand == null && state.operation == null) {
        return {
          ...state,
          currentOperand: state.currentOperand
        }
      }

      if(state.currentOperand == null && state.previousOperand !== null && state.operation !== null){
        return {
          ...state,
          currentOperand: state.previousOperand,
          previousOperand: null,
          operation: null
        }
      }


      return {
        ...state,
        overwrite: true,
        currentOperand: evaluate(state),
        previousOperand: null,
        operation: null
      }

    case ACTIONS.DELETE_DIGIT:

    if(state.currentOperand == null){
      return state;
    }

      return {
        ...state,
        currentOperand: Math.floor(state.currentOperand/10)
      }


  }
}


function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) {
    return ""
  }
  let computation = ""
  switch (operation) {
    case '+':
      computation = prev + current;
      break
    case '-':
      computation = prev - current;
      break
    case '*':
      computation = prev * current;
      break

    case '/':
      computation = prev / current;
      break

  }
  return computation.toString()
}

function App() {



  const [{ currentOperand, previousOperand, operation }, disp] = useReducer(reducer, {});



  return (
    <div className='calculator-grid'>
      <div className='output' >
        <div className='previous-operand' >{previousOperand}{operation}</div>
        <div className='current-operand' >{currentOperand}</div>
      </div>

      {/* <ClearButton className='span-two' clear="AC" dispatch={disp} >AC</ClearButton> */}
      <button className='span-two' onClick={() => disp({ type: ACTIONS.CLEAR })} >AC</button>
      <button onClick={() => disp({ type: ACTIONS.DELETE_DIGIT })} >DEL</button>
      <Operation dispatch={disp} operand="/"></Operation>
      <DigitButton digit="1" dispatch={disp}></DigitButton>
      <DigitButton digit="2" dispatch={disp}></DigitButton>
      <DigitButton digit="3" dispatch={disp}></DigitButton>
      <Operation dispatch={disp} operand="*"></Operation>
      <DigitButton digit="4" dispatch={disp}></DigitButton>
      <DigitButton digit="5" dispatch={disp}></DigitButton>
      <DigitButton digit="6" dispatch={disp}></DigitButton>
      <Operation dispatch={disp} operand="+"></Operation>
      <DigitButton digit="7" dispatch={disp}></DigitButton>
      <DigitButton digit="8" dispatch={disp}></DigitButton>
      <DigitButton digit="9" dispatch={disp}></DigitButton>

      <Operation dispatch={disp} operand="-"></Operation>
      <DigitButton digit="." dispatch={disp}></DigitButton>
      <DigitButton digit="0" dispatch={disp}></DigitButton>
      <button className='span-two' onClick={() => disp({ type: ACTIONS.EVALUATE })} >=</button>


    </div>
  );
}

export default App;
