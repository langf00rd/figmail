import * as React from "react";

export default function Text(props: React.PropsWithChildren): JSX.Element {
   return (
      <p
         contentEditable
         style={{
            fontSize: "14px",
            lineHeight: "24px",
            margin: "16px 0",
         }}
      >
         {props.children}
      </p>
   );
}
