import type { UIElement } from "../../interface";
import Hr from "../components/hr";
import Img from "../components/img";
import Text from "../components/text";

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
  {
    id: "3",
    content: (
      <Img
        alt="image"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Vercel_logo_black.svg/1024px-Vercel_logo_black.svg.png"
      />
    ),
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    id: "2",
    content: <Hr />,
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    id: "1",
    content: (
      <Text>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Text>
    ),
    position: {
      x: 0,
      y: 0,
    },
  },
];
