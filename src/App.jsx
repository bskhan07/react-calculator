import React, { useReducer } from 'react'
import "./style.css"
const App = () => {

  const ACTIONS = {
    ADD_DIGITS: "ADD_DIGITS",
    ALL_CLEAR: "ALL_CLEAR",
    DELETE_DIGIT: "DELETE_DIGIT",
    ADD_OPERATOR: "ADD_OPERATOR",
    CALCULATION: "CALCULATION"
  }

  const reducer = (state, { type, payload }) => {

    const calculation = ({ calValue, displayValue, operator }) => {
      let cal = parseFloat(calValue)
      let dis = parseFloat(displayValue)

      switch (operator) {
        case "+":
          return cal + dis
        case "-":
          return cal - dis
        case "×":
          return cal * dis
        case "÷":
          return cal / dis

      }
    }

    switch (type) {
      case ACTIONS.ADD_DIGITS:
        if (payload === "0" && state.displayValue === "0") return state
        if (payload === "." && !state.calValue) return state
        if (payload === "." && state.displayValue.includes(".")) return state
        return {
          ...state,
          displayValue: `${state.displayValue || ""}${payload}`

        }
      case ACTIONS.ADD_OPERATOR:
        if (state.displayValue === "0" && state.calValue && state.operator) {
          return {
            ...state,
            operator: payload
          }
        }
        if (state.calValue && state.operator === payload) {
          return {
            operator: payload,
            calValue: calculation(state),
            displayValue: "0",
          }
        }
        if (!state.calValue && state.displayValue) {
          return {
            operator: payload,
            calValue: state.displayValue,
            displayValue: "0",
          }
        }
        if (state.operator && state.operator !== payload) {
          return {
            ...state,
            operator: payload,
            displayValue: "0"
          }
        }


        return state

      case ACTIONS.CALCULATION:
        return {
          calValue: calculation(state),
          operator: state.operator,
          displayValue: ""
        }

      case ACTIONS.ALL_CLEAR:
        return {}

      case ACTIONS.DELETE_DIGIT:
        if (state.displayValue) {
          return {
            ...state,
            displayValue: state.displayValue == "0" ? "0" : state.displayValue.length == 1 ? "0" : state.displayValue.slice(0, -1)
          }
        }
        if (!state.displayValue) {
          return {
            displayValue: "0"
          }
        }
        return state
    }
  }

  const [{ displayValue = "0", calValue, operator }, dispatch] = useReducer(reducer, {})
  return (
    <div className='container'>
      <div className="calculator">
        <div className="screen">
          <div className="prevalue">
            <p>{calValue} {operator} </p>
          </div>
          <div className="calvalue">
            <p>{displayValue}</p>
          </div>
        </div>
        <div className="buttons">
          <div className="ac">
            <button onClick={() => dispatch({ type: ACTIONS.ALL_CLEAR })} >AC</button>
            <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
          </div>
          <div>
            <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGITS, payload: "7" })} >7</button>
            <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGITS, payload: "8" })}> 8</button>
            <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGITS, payload: "9" })}>  9</button>
            <button onClick={() => dispatch({ type: ACTIONS.ADD_OPERATOR, payload: "÷" })} >÷</button>
          </div>
          <div>
            <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGITS, payload: "4" })}>4</button>
            <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGITS, payload: "5" })}>5</button>
            <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGITS, payload: "6" })}>6</button>
            <button onClick={() => dispatch({ type: ACTIONS.ADD_OPERATOR, payload: "×" })} >×</button>
          </div>
          <div>
            <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGITS, payload: "1" })} >  1</button>
            <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGITS, payload: "2" })}>2</button>
            <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGITS, payload: "3" })}>3</button>
            <button onClick={() => dispatch({ type: ACTIONS.ADD_OPERATOR, payload: "-" })} >-</button>
          </div>
          <div>
            <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGITS, payload: "." })} >.</button>
            <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGITS, payload: "0" })}>0</button>
            <button onClick={() => dispatch({ type: ACTIONS.CALCULATION })}>=</button>
            <button onClick={() => dispatch({ type: ACTIONS.ADD_OPERATOR, payload: "+" })}>+</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App