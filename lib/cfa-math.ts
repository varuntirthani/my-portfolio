export type NotePart =
  | { type: "text"; content: string }
  | { type: "label"; content: string }
  | { type: "math"; content: string };

const SUBSCRIPT_MAP: Record<string, string> = {
  "₀": "0",
  "₁": "1",
  "₂": "2",
  "₃": "3",
  "₄": "4",
  "₅": "5",
  "₆": "6",
  "₇": "7",
  "₈": "8",
  "₉": "9",
  "ₚ": "p",
  "ₖ": "k",
  "ₗ": "l",
  "ₘ": "m",
  "ₙ": "n",
  "ᵢ": "i",
  "ₐ": "a",
  "ₑ": "e",
  "ᵦ": "beta",
};

const SUPERSCRIPT_MAP: Record<string, string> = {
  "²": "2",
  "³": "3",
  "⁺": "+",
  "⁻": "-",
};

const MATH_HINT =
  /[=×÷±^]|!\s|\/|\(1\s*\+|P\(|E\(|Var\(|Cov\(|[Σσμβπδ]|~|→|≈|[₀-₉ₚₖₗₘₙᵢ]/;

export function looksLikeMath(text: string): boolean {
  const trimmed = text.trim();
  if (trimmed.length < 3) return false;
  if (!MATH_HINT.test(trimmed)) return false;
  return /=|~|\/|×|Σ|σ|μ|β|\^|!/.test(trimmed);
}

export function plainToLatex(input: string): string {
  let s = input.trim();

  s = s.replace(/[₀-₉ₚₖₗₘₙᵢₐₑᵦ]/g, (char) => {
    const mapped = SUBSCRIPT_MAP[char];
    return mapped ? `_{${mapped}}` : char;
  });

  s = s.replace(/[²³⁺⁻]/g, (char) => {
    const mapped = SUPERSCRIPT_MAP[char];
    return mapped ? `^{${mapped}}` : char;
  });

  s = s
    .replace(/×/g, "\\times ")
    .replace(/÷/g, "\\div ")
    .replace(/±/g, "\\pm ")
    .replace(/Σ/g, "\\sum ")
    .replace(/σ/g, "\\sigma ")
    .replace(/μ/g, "\\mu ")
    .replace(/β/g, "\\beta ")
    .replace(/π/g, "\\pi ")
    .replace(/δ/g, "\\delta ")
    .replace(/≈/g, "\\approx ")
    .replace(/→/g, "\\rightarrow ")
    .replace(/−/g, "-");

  s = s.replace(/\^(\([^)]+\)|[\w.]+)/g, "^{$1}");
  s = s.replace(/e\^\(([^)]+)\)([A-Za-z])/g, "e^{($1)$2}");
  s = s.replace(/f_\{([^,]+),([^}]+)\}/g, "f_{$1,$2}");

  return s;
}

function pushSegment(parts: NotePart[], segment: string) {
  const trimmed = segment.trim();
  if (!trimmed) return;

  const forMatch = trimmed.match(/^(.+?)(\s+for\s+.+)$/i);
  if (forMatch && looksLikeMath(forMatch[1])) {
    parts.push({ type: "math", content: forMatch[1].trim() });
    parts.push({ type: "text", content: forMatch[2] });
    return;
  }

  const parenMatch = trimmed.match(/^(.+?)\s+(\(.+\))$/);
  if (parenMatch && looksLikeMath(parenMatch[1])) {
    parts.push({ type: "math", content: parenMatch[1].trim() });
    parts.push({ type: "text", content: ` ${parenMatch[2]}` });
    return;
  }

  if (looksLikeMath(trimmed)) {
    parts.push({ type: "math", content: trimmed });
    return;
  }

  parts.push({ type: "text", content: trimmed });
}

export function parseNote(text: string): NotePart[] {
  const parts: NotePart[] = [];

  let main = text;
  let suffix = "";

  const dashIndex = main.indexOf(" — ");
  if (dashIndex !== -1) {
    suffix = main.slice(dashIndex);
    main = main.slice(0, dashIndex);
  }

  const colonMatch = main.match(/^([^:=]+):\s*(.+)$/);
  if (colonMatch && !colonMatch[1].includes("=") && looksLikeMath(colonMatch[2])) {
    parts.push({ type: "label", content: `${colonMatch[1]}: ` });
    main = colonMatch[2];
  }

  const segments = main.split(/\s*;\s*/);
  segments.forEach((segment, index) => {
    pushSegment(parts, segment);
    if (index < segments.length - 1) {
      parts.push({ type: "text", content: "; " });
    }
  });

  if (suffix) {
    parts.push({ type: "text", content: suffix });
  }

  if (parts.length === 0) {
    parts.push({ type: "text", content: text });
  }

  return parts;
}
