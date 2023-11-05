import type { UIElement } from "../../../interface";
import { Draggable } from "../../components/draggable";
import Container from "../../components/ui/container";
import Table from "../../components/ui/table";
import { MAIN_STYLE } from "../../lib/constants";

export default function Main(props: {
  uiElements: UIElement[];
  onDuplicate: (element: UIElement) => void;
  onRemove: (element: UIElement) => void;
}): JSX.Element {
  return (
    <Container>
      <Table id="main">
        <main style={{ ...MAIN_STYLE }}>
          {props.uiElements.map((element) => (
            <Draggable
              element={element}
              id={element.id}
              key={element.id}
              onDuplicate={props.onDuplicate}
              onRemove={props.onRemove}
              styles={{
                left: `${element.position.x}px`,
                top: `${element.position.y}px`,
              }}
            >
              {element.content}
            </Draggable>
          ))}
        </main>
      </Table>
    </Container>
  );
}
