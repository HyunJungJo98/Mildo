import { AreaSchemaTypes } from './../types/interfaces';
import Area from '../models/Area';

export default {
  findAll: async (): Promise<AreaSchemaTypes[] | null> => {
    let allAreas: AreaSchemaTypes[] | null = null;

    try {
      allAreas = await Area.find({});
    } catch (error) {
      console.log(error);
    }
    return allAreas;
  },
  saveMany: async (
    areaData: AreaSchemaTypes[]
  ): Promise<AreaSchemaTypes[] | null> => {
    let insertedAreaData: AreaSchemaTypes[] | null = null;

    try {
      insertedAreaData = await Area.insertMany(areaData);
    } catch (error) {
      throw error;
    }
    return insertedAreaData;
  }
};
