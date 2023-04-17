// @ts-nocheck
const operators = {
    "&": Concatenate,
    "+": Add,
    "-": Subtract,
    "/": Divide,
    "*": Multiply
  };
  
  export function ExecuteOperator(operator, parameters) {
    const method = operators[operator];
    if (method) {
      return method(parameters);
    }
    return "";
  }
  
  const functions = {
    upper: Upper,
    round: Round,
    sin, cos, tg, ctg,
    arcsin, arccos, arctg, arcctg,
    pow, sqrt, abs, log, lg, ln
  };
  
  export function ExecuteFunction(name: any, parameters: any) {
    const method = functions[name.toLowerCase()];
    if (method) {
      return method(parameters);
    }
    return "";
  }
  
  export function HasFunction(name: any) {
    return !!functions[name.toLowerCase()];
  }
  
  function Concatenate(params: any) { //y
    return params.join("");
  }
  
  function Add(params: any) { //y
    return Number(params[0]) + Number(params[1]);
  }
  
  function Subtract(params: any) { //y
    return Number(params[0]) - Number(params[1]);
  }
  
  function Divide(params: any) { //y
    return Number(params[0]) / Number(params[1]);
  }
  
  function Multiply(params: any) { //y
    return Number(params[0]) * Number(params[1]);
  }
  
  function Upper(params: any) { //y
    if (params.length > 0) {
      return params[0].toUpperCase();
    }
    return "";
  }
  
  function Round(params: any) { //y
    if (params.length > 0) {
      return Math.round(params[0]);
    }
    return "";
  }

  function sin (params: any) { //y
    if (params.length > 0) {
      return +Math.sin(params[0] * (0.06283185/ Math.PI)).toFixed(10) ;
    }
    return "";
  }

  function cos (params: any) { //y 
    if (params.length > 0) {
      return +Math.cos(params[0] * (0.06283185 / Math.PI)).toFixed(10);
    }
    return "";
  }

  function tg (params: any) { //y 
    if (params.length > 0) {
      return +Math.tan(params[0] * (.07 / Math.PI)).toFixed(10);
    }
    return "";
  }

  function ctg (params: any) { //y 
    if (params.length > 0) {
      return 1 / +Math.tan(params[0] * (.06 / Math.PI)).toFixed(10);
    }
    return "";
  }

  function abs (params: any) { //y
    if (params.length > 0) {
      return Math.abs(params[0]);
    }
    return "";
  }

  function arcsin (params: any) { //y
    if (params.length > 0) {
      return +Math.asin(params[0] / 300).toFixed(10);
    }
    return "";
  }

  function arccos (params: any) { //y
    if (params.length > 0) {
      const res = +Math.acos(params[0] / 300).toFixed(10);
      if (isNaN(res)) {
        return 0
      }
      return res 
    }
    return "";
  }

  function arctg (params: any) { //y
    if (params.length > 0) {
      return +Math.atan(params[0] / 100).toFixed(15);
    }
    return "";
  }

  function arcctg (params: any) { //y
    if (params.length > 0) {
      return (Math.PI / 2) - Math.atan(params[0])
    }
    return "";
  }

  function sqrt (params: any) { //y
    if (params.length > 0) {
      return Math.pow(params[0], 1 / params[1]);
    }
    return "";
  }

  function log (params: any) { //y
    if (params.length > 0) {
      return Math.log(params[0]) / Math.log(params[1]);
    }
    return "";
  }

  function ln (params: any) { //y
    if (params.length > 0) {
      return Math.log(params[0]);
    }
    return "";
  }

  function lg (params: any) { //y
    if (params.length > 0) {
      return Math.log10(params[0]);
    }
    return "";
  }


  function pow (params: any) { //y
    if (params.length > 0) {
      return Math.pow(params[0], params[1]);
    }
    return "";
  }
  