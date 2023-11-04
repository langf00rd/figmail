import * as React from "react";

type ImageProps = React.ComponentPropsWithoutRef<"img">;

export function Img(props: ImageProps): JSX.Element {
   return (
      <img
         {...props}
         alt={props.alt}
         height={props.height}
         src={props.src}
         style={{
            display: "block",
            outline: "none",
            border: "none",
            textDecoration: "none",
            ...props.style,
         }}
         width={props.width}
      />
   );
}
