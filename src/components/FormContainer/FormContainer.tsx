export default function FormContainer({
  children,
  handleSubmit,
  title,
}: {
  children: React.ReactNode;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 border-2 border-slate-600 rounded-lg p-4 xs:p-6"
    >
      <div className="flex flex-col gap-3">
        <h2 className="text-lg xs:text-2xl font-extrabold text-center mb-2">
          {title}
        </h2>
        {children}
      </div>
    </form>
  );
}
