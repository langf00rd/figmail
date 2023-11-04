"use client";

type HTMLProps = React.ComponentPropsWithoutRef<"html">;

export default function Html(props: HTMLProps): JSX.Element {
  return (
    <html {...props} dir={props.dir ?? "ltr"} lang={props.lang ?? "en"}>
      {props.children}
    </html>
  );
}
