export default function Select({
  defaultValue,
  title,
  options,
  optionsTitles,
  onChange,
  name,
  id,
}: {
  defaultValue?: string | number;
  title: string;
  options: string[] | number[];
  optionsTitles?: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  id?: string;
}) {
  return (
    <select
      name={name || ""}
      id={id || ""}
      defaultValue={defaultValue}
      className="p-2 rounded-lg border-2 border-slate-500 bg-slate-400 dark:border-slate-600 dark:bg-slate-900 text-slate-900 dark:text-slate-300"
      onChange={onChange}
    >
      <option>{title}</option>
      {options.map((option, index) => (
        <option key={option} value={option}>
          {optionsTitles ? optionsTitles[index] : option}
        </option>
      ))}
    </select>
  );
}
