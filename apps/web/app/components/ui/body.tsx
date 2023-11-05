"use client";

type BodyProps = React.ComponentPropsWithoutRef<"body">;

export default function Body(props: BodyProps): JSX.Element {
  return (
    <body {...props} style={props.style}>
      {props.children}
    </body>
  );
}
