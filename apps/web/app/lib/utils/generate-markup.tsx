import * as ReactDomServer from "react-dom/server";
import { toast } from "sonner";
import Body from "../../components/ui/body";
import Head from "../../components/ui/head";
import Html from "../../components/ui/html";
import { Preview } from "../../components/ui/preview";
import type { GenerateMarkupProps } from "../../../interface";
import { BODY_STYLE, DOCTYPE } from "../constants";
/**
 * generates html markup
 * @returns html markup as `Promise<string>`
 */
export async function generateMarkup(
  props?: GenerateMarkupProps,
): Promise<string> {
  const main = document.getElementById("main");
  if (!main) return "";
  const htmlMarkup = (
    <Html>
      <Head />
      <Preview>Test preview here</Preview>
      <Body style={BODY_STYLE}>
        <div dangerouslySetInnerHTML={{ __html: main.innerHTML }} />
      </Body>
    </Html>
  );
  const htmlMarkupString = ReactDomServer.renderToStaticMarkup(htmlMarkup);
  const doc = `${DOCTYPE}${htmlMarkupString}`;
  if (props?.copyHTML) {
    await navigator.clipboard.writeText(doc);
    toast.success("html copied to clipboard");
  }
  return doc;
}
