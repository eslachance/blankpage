import type { SliceStateCreator } from './useStore';

export type AppCommon = Record<string, unknown>;
export type AppSlice = Record<string, unknown>;

const createAppSlice: SliceStateCreator<AppSlice, AppCommon> = (
  set,
  get,
  api,
): AppSlice => ({});

export default createAppSlice;
