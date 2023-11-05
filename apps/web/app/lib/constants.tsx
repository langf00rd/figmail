import type { UIElement } from "../../interface";
import Container from "../components/ui/container";
import Text from "../components/ui/text";

export const DOCTYPE =
   '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';

export const MAIN_STYLE = {
   fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

export const BODY_STYLE = {
   maxWidth: "500px",
   margin: "0 auto",
   fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

export const DRAGGABLE_STYLE = {
   // backgroundColor: "#fff",
   // border: "2px solid blue",
   height: "100%",
   width: "100%",
   padding: "10px",
};

export const PREVIEW_MAX_LENGTH = 150;

export const UI_ELEMENTS: UIElement[] = [
   //  {
   //     id: "3",
   //     content: (
   //        <Img
   //           alt="image"
   //           src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Vercel_logo_black.svg/1024px-Vercel_logo_black.svg.png"
   //        />
   //     ),
   //     position: {
   //        x: 0,
   //        y: 0,
   //     },
   //  },
   // {
   //   id: "2",
   //   content: <Hr />,
   //   position: {
   //     x: 0,
   //     y: 0,
   //   },
   // },
   {
      id: "5",
      content: (
         <Container
            style={{
               background: "#FAFAFA",
            }}
         />
      ),
      customizeableStyles: ["BG"],
      position: {
         x: 0,
         y: 0,
      },
   },
   {
      id: "1",
      customizeableStyles: ["BG", "COLOR"],
      content: (
         <Text>
            It was popularised in t5he 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop publishing
            software like Aldus PageMaker including versions of Lorem Ipsum.
         </Text>
      ),
      position: {
         x: 0,
         y: 0,
      },
   },
];
