import create from 'zustand';
import type {
  SetState,
  GetState,
  State,
  StateCreator,
  StoreApi,
} from 'zustand';

import produce, { Draft } from 'immer';

// Copy/paste these 2 lines for every slice you create.
import createAppSlice from './createAppSlice';
import type { AppSlice, AppCommon } from './createAppSlice';

import createApiSlice from './createApiSlice';
import type { ApiSlice, ApiCommon } from './createApiSlice';

export type SliceStateCreator<
  S extends State,
  // eslint-disable-next-line @typescript-eslint/ban-types
  C extends State = {},
  T extends S = S & C,
  CustomSetState = SetState<T>,
> = (set: CustomSetState, get: GetState<T>, api: StoreApi<T>) => S;

// Add the Slice type here for every slice you create.
export interface Store extends AppSlice, ApiSlice {}

const immer =
  <T extends State>(config: StateCreator<T>): StateCreator<T> =>
  (set, get, api) =>
    config(
      (partial, replace) => {
        const nextState =
          typeof partial === 'function'
            ? produce(partial as (state: Draft<T>) => T)
            : (partial as T);
        return set(nextState, replace);
      },
      get,
      api,
    );

const useStore = create<Store>(
  immer((set, get, api) => ({
    // Copy/paste these 5 lines for every slice you create.
    ...createAppSlice(
      set as unknown as SetState<AppSlice & AppCommon>,
      get as unknown as GetState<AppSlice & AppCommon>,
      api as unknown as StoreApi<AppSlice & AppCommon>,
    ),
    ...createApiSlice(
      set as unknown as SetState<ApiSlice & ApiCommon>,
      get as unknown as GetState<ApiSlice & ApiCommon>,
      api as unknown as StoreApi<ApiSlice & ApiCommon>,
    ),
  })),
);

export default useStore;

declare global {
  interface Window {
    __store: () => Store;
  }
}

if (typeof window !== 'undefined') {
  // Call `__store()` from the console!
  window.__store = useStore.getState;
}
