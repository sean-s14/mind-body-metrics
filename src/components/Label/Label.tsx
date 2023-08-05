export default function Label({
  name,
  label,
}: {
  name: string;
  label: string;
}) {
  return (
    <label
      htmlFor={name}
      className="w-32 xs:w-40 text-right text-xs xs:text-base"
    >
      {label}:
    </label>
  );
}
