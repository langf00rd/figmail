type SectionProps = React.ComponentPropsWithoutRef<"section">;

export default function Sectino(props: SectionProps): JSX.Element {
  return (
    <table
      align="center"
      width="100%"
      {...props}
      border={0}
      cellPadding="0"
      cellSpacing="0"
      role="presentation"
      style={props.style}
    >
      <tbody>
        <tr>
          <td>{props.children}</td>
        </tr>
      </tbody>
    </table>
  );
}
