type Payload = {
  entities: {
    [key: string]: {
      [key: number]: any,
    },
  },
  result: {
    [key: string]: number[],
  },
};

type SelectedPayload = {
  entities: {
    [key: number]: any,
  },
  result: number[],
};

type StoredPayload = {
  byId: {
    [key: number]: any,
  },
  ids: number[],
};

export type SelectModel = (modelName: string) =>
  (payload: Payload) =>
    SelectedPayload;

export type ReducerCreator = (modelName: string) =>
  (store: StoredPayload, payload: Payload) =>
    StoredPayload;
