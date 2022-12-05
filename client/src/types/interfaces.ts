export interface MarkerObjectTypes {
  _nmarker_id?: string;
  setIcon: (
    icon:
      | string
      | naver.maps.ImageIcon
      | naver.maps.SymbolIcon
      | naver.maps.HtmlIcon
  ) => void;
}

export interface CoordinatesPopulationTypes {
  populationMax: number;
  populationMin: number;
  populationLevel: string;
  populationTime: Date;
  latitude: number;
  longitude: number;
}

export type SortAllAreasTypes = [string, CoordinatesPopulationTypes];

export interface SecondLevelTimeInfoCacheTypes {
  [date: string]: {
    populationLevel: string;
    populationMax: number;
    populationMin: number;
  };
}

export interface SecondLevelInfoCacheTypes {
  [areaName: string]: SecondLevelTimeInfoCacheTypes;
}

export interface BtnStyleProps {
  bgColor: string;
  borderColor: string;
  disable: boolean;
}

export interface FilterListBtnProps extends BtnStyleProps {
  contents: string;
}
