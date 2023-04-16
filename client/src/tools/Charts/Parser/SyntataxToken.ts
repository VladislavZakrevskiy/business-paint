export function SyntaxTokenizer(stream: any) {
    const peek = stream.peek();
    const previousToken = stream.getPreviousToken();
    const previousTokenType = previousToken ? previousToken.type : null;
  
    // handle double quotes
    if (peek === '"') {
      stream.next();
      if (previousTokenType === "string" || previousTokenType === "start quote") {
        return "end quote";
      }
      return "start quote";
    }
  
    // handle strings inside of quotes
    if (
      peek !== '"' &&
      previousTokenType === "start quote" &&
      previousToken.value === '"'
    ) {
      if (stream.match(/^[^"]+(?=")/, true)) {
        return "string";
      } else {
        // didn't find end quote so select all the way to the end
        stream.match(/^[^"]+/, true);
        return "string";
      }
    }
  
    // handle numbers
    if (stream.match(/^[-]?\d*\.?\d+/, false)) {
      if (
        peek === "-" &&
        previousTokenType !== "operator" &&
        tokenIsValue(previousToken)
      ) {
        // if this number is starting with a minus and there is no previous operator, then we need to be treating this as an operator instead
        stream.next();
        return "operator";
      }
      stream.match(/^[-]?\d*\.?\d+/, true);
      return "number";
    }
  
    // handle operators
    if (["&", "*", "-", "+", "/"].indexOf(peek) > -1) {
      stream.next();
      return "operator";
    }
  
    // handle references
    if (
      previousTokenType === "bracket" &&
      previousToken.value === "[" &&
      stream.match(/^[^[\]]+(?=\])/, true)
    ) {
      return "reference-name";
    }
  
    // handle functions
    if (stream.match(/^[a-zA-Z_]\w*(?=\()/, true)) {
      return "function-name";
    }
  
    // handle brackets
    if ([")", "]", "(", "["].indexOf(peek) > -1) {
      stream.next();
      return "bracket";
    }
  
    // handle comma
    if (peek === ",") {
      stream.next();
      return "comma";
    }
  
    // handle whitespace
    if (stream.match(/^ +/, true)) {
      return "whitespace";
    }
  
    // mark anything else as an error
    stream.next();
    return "error";
  }
  
  export function tokenIsValue(token: any) {
    if (!token) {
      return false;
    }
    if (token.type === "number" || token.type === "end quote") {
      return true;
    }
    if (
      token.type === "bracket" &&
      (token.value === ")" || token.value === "]")
    ) {
      return true;
    }
    return false;
  }
  