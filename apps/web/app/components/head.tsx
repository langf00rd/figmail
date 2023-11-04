type HeadProps = React.ComponentPropsWithoutRef<"head">;
export default function Head(props: HeadProps): JSX.Element {
  return (
    <head {...props}>
      <meta content="text/html; charset=UTF-8" httpEquiv="Content-Type" />
      {props.children}
    </head>
  );
}
