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
  "ₜ": "t",
  "ⱼ": "j",
  "ₓ": "x",
  "₊": "+",
  "₋": "-",
  "ᵦ": "beta",
};

const SUPERSCRIPT_MAP: Record<string, string> = {
  "²": "2",
  "³": "3",
  "⁺": "+",
  "⁻": "-",
};

const MATH_HINT =
  /[=×÷±^]|!\s|\(1\s*\+|P\(|E\(|Var\(|Cov\(|[Σσμβπδ√]|~|≈|[₀-₉ₚₖₗₘₙᵢₐₑₜⱼₓ₊₋]|\\(?:frac|left|mid|sqrt|sum|text)/;

export function looksLikeMath(text: string): boolean {
  const trimmed = text.trim();
  if (trimmed.length < 3) return false;
  if (!MATH_HINT.test(trimmed)) return false;

  const hasExplicitLatex = /\\(?:frac|left|mid|sqrt|sum|text)/.test(trimmed);
  const proseWords = trimmed.match(/[A-Za-z]{3,}/g) ?? [];

  if (!hasExplicitLatex && proseWords.length >= 2) return false;

  return /=|~|×|Σ|σ|μ|β|√|\^|!|\\/.test(trimmed);
}

export function plainToLatex(input: string): string {
  let s = input.trim();

  s = s.replace(/[₀-₉ₚₖₗₘₙᵢₐₑₜⱼₓ₊₋ᵦ]+/g, (sequence) => {
    const mapped = [...sequence]
      .map((char) => SUBSCRIPT_MAP[char] ?? char)
      .join("");
    return `_{${mapped}}`;
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
    .replace(/√\s*([A-Za-z0-9]+)/g, "\\sqrt{$1}")
    .replace(/%/g, "\\%")
    .replace(/≈/g, "\\approx ")
    .replace(/→/g, "\\rightarrow ")
    .replace(/−/g, "-");

  s = s.replace(/_(?!\{)([A-Za-z0-9]+)/g, "_{$1}");
  s = s.replace(/e\^\(([^)]+)\)([A-Za-z])/g, "e^{($1)$2}");
  s = s.replace(/\^(\([^)]+\)|[\w.]+)/g, "^{$1}");
  s = s.replace(/\^\*/g, "^{*}");
  s = s.replace(/f_\{([^,]+),([^}]+)\}/g, "f_{$1,$2}");

  return s;
}

function pushSegment(parts: NotePart[], segment: string) {
  const trimmed = segment.trim();
  if (!trimmed) return;

  const colonMatch = trimmed.match(/^([^:=]+):\s*(.+)$/);
  if (colonMatch && !colonMatch[1].includes("=")) {
    parts.push({ type: "label", content: `${colonMatch[1]}: ` });
    if (looksLikeMath(colonMatch[2])) {
      pushSegment(parts, colonMatch[2]);
    } else {
      parts.push({ type: "text", content: colonMatch[2] });
    }
    return;
  }

  const qualifierMatch = trimmed.match(/^(.+?)(\s+(?:for|where)\s+.+)$/i);
  if (qualifierMatch && looksLikeMath(qualifierMatch[1])) {
    parts.push({ type: "math", content: qualifierMatch[1].trim() });
    parts.push({ type: "text", content: qualifierMatch[2] });
    return;
  }

  const parenMatch = trimmed.match(
    /^(.+?)\s+(\([A-Za-z][A-Za-z ,'-]+\))$/,
  );
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

// Notes containing `$...$` opt out of heuristic detection: only delimited spans render as math.
function parseDelimitedNote(text: string): NotePart[] {
  const parts: NotePart[] = [];

  text.split("$").forEach((segment, index) => {
    if (!segment) return;

    if (index % 2 === 1) {
      parts.push({ type: "math", content: segment.trim() });
      return;
    }

    const label = index === 0 ? segment.match(/^([^:]+:\s+)$/) : null;
    parts.push(
      label
        ? { type: "label", content: label[1] }
        : { type: "text", content: segment },
    );
  });

  return parts;
}

export function parseNote(text: string): NotePart[] {
  if (text.includes("$")) return parseDelimitedNote(text);

  const parts: NotePart[] = [];

  let main = text;
  let suffix = "";

  const dashIndex = main.indexOf(" — ");
  if (dashIndex !== -1) {
    suffix = main.slice(dashIndex);
    main = main.slice(0, dashIndex);
  }

  const segments = main.split(/((?<!\.)[.;]\s+)/);
  segments.forEach((segment) => {
    if (/^[.;]\s+$/.test(segment)) {
      parts.push({ type: "text", content: segment });
      return;
    }

    pushSegment(parts, segment);
  });

  if (suffix) {
    parts.push({ type: "text", content: suffix });
  }

  if (parts.length === 0) {
    parts.push({ type: "text", content: text });
  }

  return parts;
}
