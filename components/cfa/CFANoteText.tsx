"use client";

import { useMemo } from "react";
import katex from "katex";
import { parseNote, plainToLatex } from "@/lib/cfa-math";

type CFANoteTextProps = {
  text: string;
  className?: string;
  mathClassName?: string;
};

function MathBlock({
  latex,
  className,
}: {
  latex: string;
  className?: string;
}) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(plainToLatex(latex), {
        throwOnError: false,
        displayMode: false,
        trust: false,
      });
    } catch {
      return latex;
    }
  }, [latex]);

  return (
    <span
      className={`inline-block rounded-md border border-[#3b82f6]/20 bg-[#3b82f6]/[0.08] px-2 py-0.5 align-middle text-[#e5e7eb] ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function CFANoteText({
  text,
  className,
  mathClassName,
}: CFANoteTextProps) {
  const parts = useMemo(() => parseNote(text), [text]);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.type === "math") {
          return (
            <MathBlock
              key={`${index}-${part.content.slice(0, 24)}`}
              latex={part.content}
              className={mathClassName}
            />
          );
        }

        if (part.type === "label") {
          return (
            <span
              key={`${index}-label`}
              className="font-medium text-[#f0f0f5]"
            >
              {part.content}
            </span>
          );
        }

        return <span key={`${index}-text`}>{part.content}</span>;
      })}
    </span>
  );
}
