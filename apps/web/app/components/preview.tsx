import * as React from "react";
import { PREVIEW_MAX_LENGTH } from "../lib/constants";

export interface PreviewProps extends React.ComponentPropsWithoutRef<"div"> {
  children: string | string[];
}

export function Preview(props: PreviewProps): JSX.Element {
  let text = Array.isArray(props.children)
    ? props.children.join("")
    : props.children;
  text = text.substring(0, PREVIEW_MAX_LENGTH);
  return (
    <div
      style={{
        display: "none",
        overflow: "hidden",
        lineHeight: "1px",
        opacity: 0,
        maxHeight: 0,
        maxWidth: 0,
      }}
      {...props}
    >
      {text}
      {renderWhiteSpace(text)}
    </div>
  );
}

export function renderWhiteSpace(text: string): JSX.Element | null {
  if (text.length >= PREVIEW_MAX_LENGTH) {
    return null;
  }
  const whiteSpaceCodes = "\xa0\u200C\u200B\u200D\u200E\u200F\uFEFF";
  return <div>{whiteSpaceCodes.repeat(PREVIEW_MAX_LENGTH - text.length)}</div>;
}
