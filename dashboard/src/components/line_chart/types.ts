export type XAxis = Date | null;
export type YAxis = string | null;

export type LineState = {
  data: TimestampsValuesPair;
  xNorm: XAxis[];
  yNorm: YAxis[];
  xAbnormal: XAxis[];
  yAbnormal: YAxis[];
};

export interface TimestampsValuesPair {
  timestamps: Array<number>;
  values: Array<any>;
}
