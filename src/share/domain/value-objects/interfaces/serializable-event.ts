/**
 * Serialized event payload.
 * Iterates over all the properties of the event payload and serialized them.
 * If a property has a ToJSON method, it will infer the return type of that
 * @template T Event data type
 */
export type SerializedEventPayload<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends { toJSON(): infer U }
        ? U
        : SerializedEventPayload<T[K]>;
    }
  : T;

/**
 * Serializable event that can be stored in the event store
 * @template T Event data type
 */
export interface SerializableEvent<T = any> {
  streamId: string;
  type: string;
  position: number;
  data: SerializedEventPayload<T>;
}
