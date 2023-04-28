export function CreateNodesFromTokens(tokens: any[]) {
    const nodes = [];
    const nonWhitespaceTokens = tokens.filter(
      (token) => token.type !== "whitespace"
    );
  
    for (let i = 0; i < nonWhitespaceTokens.length; i++) {
      const token = nonWhitespaceTokens[i];
  
      if (["start quote", "end quote"].indexOf(token.type) > -1) {
        continue;
      }
  
      if (["string", "number"].indexOf(token.type) > -1) {
        addNode(nodes, {
          type: token.type,
          value: token.value
        });
      }
  
      if (token.type === "operator") {
        const lastNode: any = nodes[nodes.length - 1];
        nodes.pop();
        nodes.push({
          type: "operator",
          value: token.value,
          innerNodes: [lastNode]
        });
      }
  
      if (token.type === "reference-name") {
        addNode(nodes, {
          type: "reference",
          value: token.value
        });
      }
  
      if (token.type === "function-name") {
        let innerTokens = [];
  
        i++;
  
        if (
          nonWhitespaceTokens[i] &&
          nonWhitespaceTokens[i].type === "bracket" &&
          nonWhitespaceTokens[i].value === "("
        ) {
          const innerTokenResult = getInnerTokens(nonWhitespaceTokens.slice(i));
          innerTokens = innerTokenResult.tokens;
          i += innerTokenResult.i;
        }
  
        addNode(nodes, {
          type: "function",
          value: token.value,
          innerNodes: CreateNodesFromTokens(innerTokens)
        });
      }
  
      if (token.type === "bracket" && token.value === "(") {
        const innerTokenResult = getInnerTokens(nonWhitespaceTokens.slice(i));
        i += innerTokenResult.i;
        const innerTokens = innerTokenResult.tokens;
  
        addNode(nodes, {
          type: "group",
          innerNodes: innerTokens ? CreateNodesFromTokens(innerTokens) : null
        });
      }
    }
    return nodes;
  }
  
  function addNode(nodes: any, node: any) {
    const lastNode = nodes[nodes.length - 1];
    if (
      lastNode &&
      lastNode.type === "operator" &&
      lastNode.innerNodes.length < 2
    ) {
      lastNode.innerNodes.push(node);
    } else {
      nodes.push(node);
    }
  }
  
  function getInnerTokens(tokens: any) {
    const innerTokens = [];
    const innerBrackets = [];
    let i;
    for (i = 0; i < tokens.length; i++) {
      if (tokens[i].type === "bracket") {
        if (
          tokens[i].value === ")" &&
          innerBrackets[innerBrackets.length - 1] === "("
        ) {
          innerBrackets.pop();
  
          if (innerBrackets.length === 0) {
            i++;
            break;
          }
        }
        if (tokens[i].value === "(") {
          innerBrackets.push(tokens[i].value);
  
          if (i === 0) {
            continue;
          }
        }
      }
  
      innerTokens.push(tokens[i]);
    }
  
    return { tokens: innerTokens, i: i - 1 };
  }
  