type HRProps = React.ComponentPropsWithoutRef<"hr">;

export default function Hr(props: HRProps): JSX.Element {
  return (
    <hr
      {...props}
      style={{
        width: "100%",
        border: "none",
        borderTop: "1px solid #eaeaea",
        ...props.style,
      }}
    />
  );
}
