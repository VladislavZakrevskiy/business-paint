// @ts-nocheck
import { ExecuteFunction, ExecuteOperator } from "./Functions";
import { CreateNodesFromTokens } from "./NodeGenerator";

export function EvaluateTokens(tokens, input) {
  const nodes = CreateNodesFromTokens(tokens);
  let result = "";
  for (const node of nodes) {
    result += EvaluateNode(node, input);
  }
  return result;
}

function EvaluateNode(node, input) {
  if (!node) {
    return "";
  }
  if (node.type === "operator") {
    const parameters = node.innerNodes.map((x) => EvaluateNode(x, input));
    return ExecuteOperator(node.value, parameters);
  } else if (node.type === "function") {
    const parameters = node.innerNodes.map((x) => EvaluateNode(x, input));
    return ExecuteFunction(node.value, parameters);
  } else if (node.type === "reference") {
    return input[node.value] || "";
  } else if (node.type === "string") {
    return node.value;
  } else if (node.type === "number") {
    return node.value;
  }
  return "";
}

export function GetReferencesFromTokens(tokens) {
  return tokens
    .filter((x) => x.type === "reference-name")
    .map((x) => x.value)
    .filter((v, i, a) => a.indexOf(v) === i); // remove duplicates
}
