const textClassName =
  "text-sm xs:text-lg font-semibold text-center text-slate-200";
const buttonClassName =
  "h-6 xs:h-8 w-28 xs:w-40 rounded bg-slate-500 hover:bg-slate-600 dark:bg-slate-600 dark:hover:bg-slate-500 transition-colors";

export default function Button({
  children,
  onClick,
  type = "submit",
  margin = "mx-auto mt-4",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "submit" | "button" | "reset" | undefined;
  margin?: string;
}) {
  const className = [buttonClassName, textClassName, margin].join(" ");

  return (
    <button className={className} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
