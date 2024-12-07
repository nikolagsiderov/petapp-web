"use client";

import { usePathname, useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Няма резултати",
  subtitle = "Не са намерени резултати отговарящи на вашите критерии",
  showReset,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subtitle={subtitle} center />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Премахни всички филтри"
            onClick={() => router.push(pathname ? pathname : "/")}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
