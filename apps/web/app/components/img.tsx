import * as React from "react";

type ImageProps = React.ComponentPropsWithoutRef<"img">;

export function Img(props: ImageProps): JSX.Element {
   return (
      <table style={{ maxWidth: "640px", ...props.style }} width="100%">
         <tbody>
            <tr>
               <td>
                  <picture>
                     <img {...props} alt={props.alt} src={props.src} width="100%" />
                  </picture>
               </td>
            </tr>
         </tbody>
      </table>
   );
}
