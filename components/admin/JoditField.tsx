"use client";

import dynamic from "next/dynamic";
import { useRef, useMemo } from "react";

// Jodit cannot run on the server — load it only on the client
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface JoditFieldProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function JoditField({ value, onChange, placeholder }: JoditFieldProps) {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder ?? "Write content here…",
      height: 420,
      toolbarAdaptive: false,
      toolbarSticky: true,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      defaultActionOnPaste: "insert_clear_html" as const,
      buttons: [
        "bold", "italic", "underline", "strikethrough", "|",
        "ul", "ol", "|",
        "outdent", "indent", "|",
        "font", "fontsize", "brush", "paragraph", "|",
        "image", "link", "table", "|",
        "align", "|",
        "undo", "redo", "|",
        "hr", "eraser", "copyformat", "|",
        "fullsize", "source",
      ],
      style: {
        font: "14px/1.7 'Segoe UI', sans-serif",
      },
      theme: "default",
      colors: {
        greyscale: ["#000000", "#434343", "#666666", "#999999", "#b7b7b7", "#cccccc", "#d9d9d9", "#efefef", "#f3f3f3", "#ffffff"],
        palette: ["#c00000", "#ff0000", "#ff9900", "#ffff00", "#00ff00", "#00ffff", "#4a86e8", "#0000ff", "#9900ff", "#ff00ff"],
        full: [
          "#e6b8a2", "#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#c9daf8", "#cfe2f3", "#d9d2e9", "#ead1dc",
          "#dd7e6b", "#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#a4c2f4", "#9fc5e8", "#b4a7d6", "#d5a6bd",
          "#cc4125", "#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6d9eeb", "#6fa8dc", "#8e7cc3", "#c27ba0",
          "#a61c00", "#cc0000", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3c78d8", "#3d85c6", "#674ea7", "#a64d79",
          "#85200c", "#990000", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#1155cc", "#0b5394", "#351c75", "#741b47",
          "#5b0f00", "#660000", "#783f04", "#7f6000", "#274e13", "#0c343d", "#1c4587", "#073763", "#20124d", "#4c1130",
        ],
      },
    }),
    [placeholder]
  );

  return (
    <div style={{ border: "1.5px solid #e0e0f0", borderRadius: 8, overflow: "hidden" }}>
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        onBlur={(newContent) => onChange(newContent)}
      />
    </div>
  );
}
