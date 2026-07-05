import { useRef, type CSSProperties } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * AnimatedText — reveals a paragraph character by character as it scrolls
 * through the viewport. Each character fades from 0.2 -> 1 opacity, timed to
 * its position within the string.
 */
export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const characters = text.split('');

  return (
    <p ref={ref} className={className} style={style}>
      <span className="sr-only">{text}</span>
      {characters.map((char, i) => {
        const start = i / characters.length;
        const end = start + 1 / characters.length;
        return (
          <Character key={i} char={char} progress={scrollYProgress} range={[start, end]} />
        );
      })}
    </p>
  );
}

function Character({
  char,
  progress,
  range,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const display = char === ' ' ? '\u00A0' : char;

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      {/* invisible placeholder reserves layout space so the animated
          character below doesn't collapse the line */}
      <span style={{ opacity: 0 }} aria-hidden="true">
        {display}
      </span>
      <motion.span
        style={{ opacity, position: 'absolute', left: 0, top: 0 }}
        aria-hidden="true"
      >
        {display}
      </motion.span>
    </span>
  );
}
