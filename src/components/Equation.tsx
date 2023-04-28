import React, { useEffect, useState } from "react";
import { FormulaEditor } from "./FormulaEditor";
import { EvaluateTokens, GetReferencesFromTokens } from "../tools/Charts/Parser/Evaluator";
import "../styles/equlation.scss";
import { useAppSelector } from "../store/hooks";
import { Button } from "react-bootstrap";

function Equation() {
  const [formula, setFormula] = useState(``);
  const [errors, setErrors] = useState([]);
  const [tokens, setTokens] = useState([]);
  const {canvas} = useAppSelector(state => state.canvasSlice)
  const {equation ,isEquationVisible} = useAppSelector(state => state.toolSlice)
  const [inputValues, setInputValue] = useState({x: 0})

  const references = GetReferencesFromTokens(tokens);
  const result = EvaluateTokens(tokens, inputValues);

  const onChange = async (e: React.SetStateAction<string>) => {
    setFormula(e)
    equation?.clearDot()
    if(errors.length === 0) {
      for(let i = -600; i < 600; i ++) {
        await setInputValue({x: i})
      }
    }
  }

  useEffect(() => {
    if(canvas && errors.length === 0) {
      equation?.setDotXY( +inputValues['x'], +result )
    }
  }, [inputValues])

  const set = () => {
    equation?.draw()
  }

  return (
    <div style={{display: isEquationVisible ? 'flex' : 'none'}} className="formula-example">
      <div  >
        <h3>Editor</h3>
        <FormulaEditor
          value={formula}
          onChange={onChange}
          onErrorsChanged={setErrors}
          onTokensChanged={setTokens}
        />
        {errors.map((error: any, i) => (
          <div key={i} className="error">
            {error.error}
          </div>
        ))}
      </div>
      <Button onClick={set}>Set</Button>
    </div>     
  );
}

export default Equation
