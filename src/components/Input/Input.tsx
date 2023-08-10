const inputStyles =
  "rounded p-0.5 px-2 border border-slate-800 dark:border-slate-500 bg-slate-400 dark:bg-slate-900 text-slate-800 dark:text-slate-500 w-32 xs:w-36 text-sm xs:text-base";

export default function Input({
  className,
  type,
  name,
  value,
  onChange,
  required,
}: {
  className?: string;
  type: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  const props = () => {
    if (type === "number") {
      return {
        min: 0,
      };
    }
  };

  return (
    <input
      className={[inputStyles, className].join(" ")}
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      required={required}
      {...props()}
    />
  );
}
