import { towns } from "pawpal-fe-common";

const useTowns = () => {
  const getAll = () =>
    towns.data.map((town) => {
      return {
        localName: town.localName,
        localRegion: town.localRegion,
        name: town.name,
        region: town.region,
        label: town.localName,
      };
    });

  const getByValue = (name: string) => {
    return towns.data.find((item) => item.name === name);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useTowns;
