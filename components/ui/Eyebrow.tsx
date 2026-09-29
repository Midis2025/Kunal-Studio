/** Small editorial section marker: a hairline and a label. */
export default function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`label flex items-center gap-3 ${className}`} data-reveal="fade">
      <span aria-hidden className="h-px w-8 bg-current opacity-40" />
      <span>{children}</span>
    </p>
  );
}
