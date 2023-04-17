import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Lexer } from "../tools/Charts/Parser/Lexer";
import { SyntaxTokenizer } from "../tools/Charts/Parser/SyntataxToken";
import { ValidateTokens } from "../tools/Charts/Parser/Validator";
import "../styles/equlation.scss";
import { Form } from "react-bootstrap";

export function FormulaEditor(props: any) {
  const { value, onChange, onErrorsChanged, onTokensChanged } = props;
  const inputRef = useRef();
  const formattedRef = useRef();
  const [textareaHeight, setTextareaHeight] = useState(30);
  const [tokens, setTokens] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const t: any = Lexer(value, SyntaxTokenizer);
    const e: any = ValidateTokens(t);
    setTokens(t);
    setErrors(e);
    if (onTokensChanged) {
      onTokensChanged(t);
    }
    if (onErrorsChanged) {
      onErrorsChanged(e);
    }
  }, [value, onTokensChanged, onErrorsChanged]);

  useLayoutEffect(() => {
    const inputRefCurrent = inputRef.current;
    const onInputScroll = () => {
      formattedRef.current.scrollTop = inputRef.current.scrollTop;
      formattedRef.current.scrollLeft = inputRef.current.scrollLeft;
    };

    inputRefCurrent.addEventListener("scroll", onInputScroll);
    return () => {
      inputRefCurrent.removeEventListener("scroll", onInputScroll);
    };
  }, [inputRef]);

  useLayoutEffect(() => {
    const updateInputHeight = () => {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(
        inputRef.current.scrollHeight + 2,
        200
      )}px`;
      setTextareaHeight(inputRef.current.scrollHeight + 2); // add 1px for top and bottom borders
    };

    updateInputHeight();
  }, [value]);

  const textareaOnChange = (e) => {
    let v = e.target.value;
    if (v) {
      // disable multiline
      v = v.replace(/(?:\r\n|\r|\n)/g, "");
    }
    onChange(v);
  };

  return (
    <div className="formula-editor">
      <Form.Control
        value={value}
        onChange={textareaOnChange}
        className="formula-editor-textarea"
        ref={inputRef}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        height={textareaHeight}
        rows={1}
      />
      <div className="formula-editor-formatted" ref={formattedRef}>
        {formatText(tokens, errors)}
      </div>
    </div>
  );
}

function formatText(tokens: any, errors: any) {
  let formattedText = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const classNames = [token.type];

    const errorsForToken = errors.filter((x: any) => x.token === token);
    if (errorsForToken.length > 0) {
      classNames.push("error");
    }

    formattedText.push(
      <span key={i} className={classNames.join(" ")}>
        {token.value}
      </span>
    );
  }

  return formattedText;
}
