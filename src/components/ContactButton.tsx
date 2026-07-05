import type { CSSProperties } from 'react';

interface ContactButtonProps {
  className?: string;
  onClick?: () => void;
}

const style: CSSProperties = {
  background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
  boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
  outline: '2px solid white',
  outlineOffset: '-3px',
};

export default function ContactButton({ className = '', onClick }: ContactButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={style}
      className={`rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base transition-opacity duration-200 hover:opacity-80 ${className}`}
    >
      Contact Me
    </button>
  );
}
