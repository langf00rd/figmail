import * as React from "react";

type ContainerProps = React.ComponentPropsWithoutRef<"table">;

export default function Container(props: ContainerProps): JSX.Element {
  return (
    <table
      align="center"
      width="100%"
      {...props}
      border={0}
      cellPadding="0"
      cellSpacing="0"
      role="presentation"
      style={{ maxWidth: "37.5em", ...props.style }}
    >
      <tbody>
        <tr style={{ width: "100%" }}>
          <td>{props.children}</td>
        </tr>
      </tbody>
    </table>
  );
}
