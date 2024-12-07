import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

const FindPage = () => {
  return (
    <ClientOnly>
      <EmptyState
        title="Опи! Няма ме!"
        subtitle="Тази страница все още не съществува."
      />
    </ClientOnly>
  );
};

export default FindPage;
