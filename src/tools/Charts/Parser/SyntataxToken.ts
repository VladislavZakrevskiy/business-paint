export function SyntaxTokenizer(stream: any) {
    const peek = stream.peek();
    const previousToken = stream.getPreviousToken();
    const previousTokenType = previousToken ? previousToken.type : null;
  
    if (peek === '"') {
      stream.next();
      if (previousTokenType === "string" || previousTokenType === "start quote") {
        return "end quote";
      }
      return "start quote";
    }
  
    if (
      peek !== '"' &&
      previousTokenType === "start quote" &&
      previousToken.value === '"'
    ) {
      if (stream.match(/^[^"]+(?=")/, true)) {
        return "string";
      } else {
        stream.match(/^[^"]+/, true);
        return "string";
      }
    }
  
    if (stream.match(/^[-]?\d*\.?\d+/, false)) {
      if (
        peek === "-" &&
        previousTokenType !== "operator" &&
        tokenIsValue(previousToken)
      ) {
        stream.next();
        return "operator";
      }
      stream.match(/^[-]?\d*\.?\d+/, true);
      return "number";
    }
  
    if (["&", "*", "-", "+", "/"].indexOf(peek) > -1) {
      stream.next();
      return "operator";
    }
  
    if (
      previousTokenType === "bracket" &&
      previousToken.value === "[" &&
      stream.match(/^[^[\]]+(?=\])/, true)
    ) {
      return "reference-name";
    }
  
    if (stream.match(/^[a-zA-Z_]\w*(?=\()/, true)) {
      return "function-name";
    }
  
    if ([")", "]", "(", "["].indexOf(peek) > -1) {
      stream.next();
      return "bracket";
    }
  
    if (peek === ",") {
      stream.next();
      return "comma";
    }
  
    if (stream.match(/^ +/, true)) {
      return "whitespace";
    }
  
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
  