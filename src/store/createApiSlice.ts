import type { SliceStateCreator } from './useStore';

export type ApiCommon = Record<string, unknown>;
export type ApiSlice = Record<string, unknown>;

const createApiSlice: SliceStateCreator<ApiSlice, ApiCommon> = (
  set,
  get,
  api,
): ApiSlice => ({});

export default createApiSlice;
