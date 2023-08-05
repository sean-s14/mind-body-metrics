import General from "@/components/Category/General/General";

const inputContainerClassName = "flex items-center gap-2 max-w-fit";

export default function DailyActivityLog() {
  return (
    <section className="flex flex-col items-center justify-center min-w-full">
      <General inputContainerClassName={inputContainerClassName} />
    </section>
  );
}
