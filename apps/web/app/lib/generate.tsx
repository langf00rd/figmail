import * as ReactDomServer from "react-dom/server";
import { toast } from "sonner";
import Body from "../components/body";
import Head from "../components/head";
import Html from "../components/html";
import { Preview } from "../components/preview";
import Section from "../components/section";
import { BODY_STYLE, DOCTYPE } from "./constants";

export async function generate(): Promise<void> {
   const main = document.getElementById("main");
   if (!main) return;
   const htmlMarkup = (
      <Html>
         <Head />
         <Preview>Test preview here</Preview>
         <Body style={BODY_STYLE}>
            <Section>
               <div dangerouslySetInnerHTML={{ __html: main.innerHTML }} />
            </Section>
         </Body>
      </Html>
   );
   const htmlMarkupString = ReactDomServer.renderToStaticMarkup(htmlMarkup);
   const doc = `${DOCTYPE}${htmlMarkupString}`;
   await navigator.clipboard.writeText(doc);
   toast.success("html copied to clipboard");
}
