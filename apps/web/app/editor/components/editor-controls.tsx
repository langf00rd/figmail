import axios from "axios";
import { Copy, Send } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { generateMarkup } from "../../lib/utils/generate-markup";

export default function EditorControls(): JSX.Element {
   const [receipient, setReceipient] = useState("");
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
                  void (async () => {
                     if (!receipient) {
                        toast.error("enter a receipient");
                        return;
                     }
                     axios
                        .post("/editor/api", {
                           html: await generateMarkup(),
                           receipient,
                        })
                        .then(() => {
                           toast.success("email sent!");
                        })
                        .catch((error: Error) => {
                           toast.error(error.toString());
                        });
                  })();
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
