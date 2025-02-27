"use client";

import { usePathname, useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";
import { useTranslation } from "react-i18next";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  subtitle,
  showReset,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading
        title={title ?? t("No_results")}
        subtitle={subtitle ?? t("No_results_found_based_on_your_criteria")}
        center
      />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label={t("Clear_filters")}
            onClick={() => router.push(pathname ? pathname : "/")}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
