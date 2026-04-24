import { ReactNode, Children, isValidElement } from "react";

interface SplitTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}

/**
 * Splits text into word spans that rise into place. Preserves inline
 * elements like <em> and <br /> in the original tree.
 */
export function SplitText({ children, className, delay = 0, stagger = 0.06 }: SplitTextProps) {
  let wordIndex = 0;

  const wrapWord = (word: string, key: string) => {
    const idx = wordIndex++;
    return (
      <span key={key} className="split-word">
        <span
          className="split-word-inner"
          style={{ animationDelay: `${delay + idx * stagger}s` }}
        >
          {word}
        </span>
      </span>
    );
  };

  const renderNode = (node: ReactNode, keyPrefix: string): ReactNode => {
    if (typeof node === "string") {
      const parts = node.split(/(\s+)/);
      return parts.map((p, i) => {
        if (/^\s+$/.test(p)) return p;
        if (!p) return null;
        return wrapWord(p, `${keyPrefix}-${i}`);
      });
    }
    if (Array.isArray(node)) {
      return node.map((n, i) => renderNode(n, `${keyPrefix}-${i}`));
    }
    if (isValidElement(node)) {
      const el = node as React.ReactElement<{ children?: ReactNode }>;
      if (el.type === "br") return el;
      const childContent = el.props.children;
      // Recursively render children with same word counter
      return (
        <span key={`${keyPrefix}-el`} className="inline">
          {childContent !== undefined ? (
            // Wrap in a clone preserving the element type & props
            <el.type {...el.props}>{renderNode(childContent, `${keyPrefix}-c`)}</el.type>
          ) : (
            el
          )}
        </span>
      );
    }
    return node;
  };

  return <span className={className}>{renderNode(children, "w")}</span>;
}
