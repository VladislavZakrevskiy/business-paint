import { HasFunction } from "./Functions";
import { tokenIsValue } from "./SyntataxToken";

export function ValidateTokens(tokens) {
  const errors = [];
  const unclosedTokens = [];
  let previousToken = null;
  let functionLevel = 0;
  const nonWhitespaceTokens = tokens.filter(
    (token) => token.type !== "whitespace"
  );

  for (let i = 0; i < nonWhitespaceTokens.length; i++) {
    const token = nonWhitespaceTokens[i];

    const previousTokenType = previousToken ? previousToken.type : null;

    if (token.type === "operator") {
      if (!tokenIsValue(previousToken)) {
        errors.push({ token, error: `Unexpected operator '${token.value}'` });
      }
      if (i === nonWhitespaceTokens.length - 1) {
        errors.push({
          token,
          error: `Value expected after operator '${token.value}'`
        });
      }
    }

    if (token.type === "number") {
      if (!checkIfValueIsAllowed(previousToken)) {
        errors.push({
          token,
          error: "An operator is required before the number"
        });
      }
    }

    if (token.type === "function-name") {
      if (!checkIfValueIsAllowed(previousToken)) {
        errors.push({
          token,
          error: "An operator is required before the function"
        });
      }

      if (!HasFunction(token.value)) {
        errors.push({
          token,
          error: `'${token.value}' is not a valid function`
        });
      }
    }

    if (token.type === "start quote") {
      unclosedTokens.push({ text: '"', type: "reference", token });

      if (!checkIfValueIsAllowed(previousToken)) {
        errors.push({
          token,
          error: "An operator is required before the string"
        });
      }
    }

    if (token.type === "end quote") {
      if (
        unclosedTokens.length > 0 &&
        unclosedTokens[unclosedTokens.length - 1].text === '"'
      ) {
        unclosedTokens.pop();
      }
    }

    if (token.type === "comma") {
      if (!functionLevel > 0) {
        errors.push({ token, error: `Unexpected ','` });
      }
      if (!tokenIsValue(previousToken)) {
        errors.push({ token, error: `Unexpected ','` });
      }
    }

    if (token.type === "bracket") {
      if (token.value === "(") {
        unclosedTokens.push({
          text: "(",
          type: previousTokenType === "function-name" ? "function" : "group",
          token
        });

        if (previousTokenType === "function-name") {
          functionLevel += 1;
        }

        if (
          previousTokenType !== "function-name" &&
          !checkIfValueIsAllowed(previousToken)
        ) {
          errors.push({
            token,
            error: "An operator is required before the parenthesis"
          });
        }
      }

      if (token.value === ")") {
        if (
          unclosedTokens.length > 0 &&
          unclosedTokens[unclosedTokens.length - 1].text === "("
        ) {
          if (unclosedTokens[unclosedTokens.length - 1].type === "function") {
            functionLevel--;
          }

          unclosedTokens.pop();

          if (
            !tokenIsValue(previousToken) &&
            !(
              previousTokenType === "start-parenthesis" &&
              unclosedTokens[unclosedTokens.length - 1].type === "function"
            )
          ) {
            errors.push({ token, error: `Unexpected ')'` });
          }
        } else {
          errors.push({ token, error: `Unexpected ')'` });
        }
      }

      if (token.value === "[") {
        unclosedTokens.push({ text: "[", type: "reference", token });

        if (!checkIfValueIsAllowed(previousToken)) {
          errors.push({
            token,
            error: "An operator is required before the reference"
          });
        }
      }

      if (token.value === "]") {
        if (
          unclosedTokens.length > 0 &&
          unclosedTokens[unclosedTokens.length - 1].text === "["
        ) {
          if (previousTokenType !== "reference-name") {
            errors.push({
              token,
              error: "A reference name is required in the brackets"
            });
          }
          unclosedTokens.pop();
        } else {
          errors.push({ token, error: `Unexpected ']'` });
        }
      }
    }

    previousToken = token;
  } 

  for (const unclosedToken of unclosedTokens) {
    let reversedToken = unclosedToken.text;
    if (unclosedToken.text === "(") {
      reversedToken = ")";
    } else if (unclosedToken.text === "[") {
      reversedToken = "]";
    }
    errors.push({
      token: unclosedToken.token,
      error: `Missing closing '${reversedToken}'`
    });
  }

  return errors;
}

function checkIfValueIsAllowed(previousToken) {
  if (!previousToken) {
    return true;
  }

  if (
    previousToken.type === "operator" ||
    previousToken.type === "comma" ||
    (previousToken.type === "bracket" && previousToken.value === "(")
  ) {
    return true;
  }
  return false;
}
