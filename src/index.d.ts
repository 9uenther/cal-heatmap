import type { OptionsType } from './options/Options';
import type DateHelper from './helpers/DateHelper';

export type DomainType = 'year' | 'month' | 'week' | 'x_day' | 'day' | 'hour';

export type Template = {
  (dateHelper: DateHelper, options: OptionsType): TemplateResult;
};

export type SubDomain = {
  t: number;
  x: number;
  y: number;
  v?: number | null;
};

export type Dimensions = {
  width: number;
  height: number;
};

export type TemplateResult = {
  name: string;
  rowsCount: (ts: number) => number;
  columnsCount: (ts: number) => number;
  mapping: (startTimestamp: number, endTimestamp: number) => SubDomain[];
  extractUnit: (ts: number) => number;
};

export interface IPlugin {
  name: string;
  calendar: CalHeatmap;
  options: pluginOptions;

  setup: (options?: PluginOptions) => void;
  paint: () => Promise<unknown>;
  destroy: () => Promise<unknown>;
}
export interface IPluginContructor {
  new (calendar: CalHeatmap): IPlugin;
}

export interface PluginOptions {}
export type PluginDefinition = [IPluginContructor, PluginOptions?];
