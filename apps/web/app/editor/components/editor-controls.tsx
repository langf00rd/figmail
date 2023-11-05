import axios from "axios";
import { Copy, Send } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useAtom } from "jotai";
import { generateMarkup } from "../../lib/utils/generate-markup";
import { isGeneratingMarkupAtom } from "../../atoms";

export default function EditorControls(): JSX.Element {
  const [receipient, setReceipient] = useState("");
  const [_, setIsGeneratingMarkup] = useAtom(isGeneratingMarkupAtom);
  return (
    <ul className="flex items-center justify-between gap-10">
      <li>
        <button
          className={styles.button}
          onClick={() => {
            void (async () => {
              await generateMarkup({ copyHTML: true });
            })();
          }}
          type="button"
        >
          <Copy size={17} />
          <p>copy html</p>
        </button>
      </li>
      <li>
        <button
          className={styles.button}
          onClick={() => {
            if (!receipient) {
              toast.error("enter a receipient");
              return;
            }
            setIsGeneratingMarkup(true);
            setTimeout(() => {
              void (async () => {
                await axios
                  .post("/editor/api", {
                    html: await generateMarkup(),
                    receipient,
                  })
                  .then(() => {
                    toast.success("email sent!");
                    setIsGeneratingMarkup(false);
                  })
                  .catch((error: Error) => {
                    toast.error(error.toString());
                    setIsGeneratingMarkup(false);
                  });
              })();
            }, 2000);
          }}
          type="button"
        >
          <Send size={17} />
          <p>send test mail</p>
        </button>
      </li>
      <li>
        <input
          className="border p-2 outline-none"
          onChange={(e) => {
            setReceipient(e.target.value);
          }}
          placeholder="john@acme.com"
          value={receipient}
        />
      </li>
    </ul>
  );
}

const styles = {
  button: "flex space-x-2 items-center justify-center",
};
