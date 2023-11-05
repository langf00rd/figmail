type HRProps = React.ComponentPropsWithoutRef<"hr">;
export default function Hr(props: HRProps): JSX.Element {
  return (
    <hr
      {...props}
      style={{
        width: "100%",
        background: "#eaeaea",
        height: "1px",
        border: "none",
        ...props.style,
      }}
    />
  );
}
