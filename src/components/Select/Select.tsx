export default function Select({
  value,
  title,
  options,
  optionsTitles,
  onChange,
  name,
  id,
  className,
}: {
  value?: string | number;
  title: string;
  options: string[] | number[];
  optionsTitles?: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  id?: string;
  className?: string;
}) {
  const defaultClassName = "p-2 rounded-lg border-2";

  return (
    <select
      name={name || ""}
      id={id || ""}
      value={value}
      className={[
        "border-slate-500 bg-slate-400 dark:border-slate-600 dark:bg-slate-900 text-slate-900 dark:text-slate-300",
        className || defaultClassName,
      ].join(" ")}
      onChange={onChange}
    >
      <option value="">{title}</option>
      {options.map((option, index) => (
        <option key={option} value={option}>
          {optionsTitles ? optionsTitles[index] : option}
        </option>
      ))}
    </select>
  );
}
