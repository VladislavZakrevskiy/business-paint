// @ts-nocheck
export function Lexer(formula, syntaxTokenizer) {
    let position = 0;
    const tokens = [];
  
    const isEnd = () => {
      return position >= formula.length;
    };
    const peek = () => {
      if (isEnd()) {
        return null;
      }
      return formula.substring(position, position + 1);
    };
    const match = (pattern, consume) => {
      const restOfFormula = formula.substring(position);
      const match = restOfFormula.match(pattern);
      if (!match || match.length > 1) {
        return null;
      }
      if (consume) {
        position += match[0].length;
      }
      return match[0] || null;
    };
    const next = () => {
      position += 1;
      return peek();
    };
    const getPreviousToken = () => {
      for (let i = tokens.length - 1; i >= 0; i--) {
        if (tokens[i].type !== "whitespace") {
          return tokens[i];
        }
      }
      return null;
    };
  
    while (!isEnd()) {
      const startingPosition = position;
      const tokenType = syntaxTokenizer({
        peek,
        match,
        next,
        isEnd,
        getPreviousToken
      });
  
      if (startingPosition === position) {
        throw new Error("Tokenizer did not move forward");
      }
  
      const token = {
        value: formula.substring(startingPosition, position),
        type: tokenType
      };
  
      tokens.push(token);
    }
  
    return tokens;
  }
  