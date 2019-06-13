export interface MyChart {
  type: string;
  data: any[];
  options: MyOption;
}

export interface MyOption {
  datalessRegionColor: string;
  backgroundColor: string;
  colorAxis: MyColorAxis;
}

export interface MyColorAxis {
  colors: string[];
}
