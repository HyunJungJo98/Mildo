import { atomsWithQuery } from 'jotai-tanstack-query';

import {
  SortAllAreasTypes,
  CoordinatesPopulationTypes
} from '../types/interfaces';
import apis from '../apis/apis';

interface GetAllAreaResponseTypes {
  ok: boolean;
  data: CoordinatesPopulationTypes;
}

// eslint-disable-next-line
export const [allAreasInfoAtom] = atomsWithQuery<SortAllAreasTypes[]>(_ => ({
  queryKey: ['areas'],
  queryFn: async () => {
    // const { data: allAreas }: GetAllAreaResponseTypes = await apis.getAllArea();
    const allAreas = {
      ok: true,
      data: {
        populationMax: 10000,
        populationMin: 100,
        populationLevel: '혼잡',
        populationTime: '2023-02-23',
        latitude: 37.403019,
        longitude: 126.718889
      }
    };
    const sortAllAreas: SortAllAreasTypes[] = Object.entries(allAreas).sort(
      (prev, next) => next[1].latitude - prev[1].latitude
    );

    return sortAllAreas;
  }
}));
