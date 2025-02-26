"use client";

import useTowns from "@/app/hooks/useTowns";
import { useTranslation } from "react-i18next";
import Select from "react-select";

export type TownSelectValue = {
  localName: string;
  localRegion: string;
  name: string;
  region: string;
  label: string;
};

interface TownSelectProps {
  value?: TownSelectValue;
  onChange: (value: TownSelectValue) => void;
}

const TownSelect: React.FC<TownSelectProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
  const { getAll } = useTowns();

  return (
    <div>
      <Select
        placeholder={t("Select_location")}
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as TownSelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-1">
            <div className="text-black">{option.label},</div>
            <span className="text-neutral-500 ml-1">{option.localRegion}</span>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "#fff",
            primary25: "#fecdd3",
          },
        })}
        noOptionsMessage={() => "Няма резултати"}
      />
    </div>
  );
};

export default TownSelect;
