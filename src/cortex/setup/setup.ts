import { createTypedHooks, Core, BaseService } from "@azot-dev/cortex";
import { services } from "../services/_services";
import type { Dependencies } from "../dependencies/_dependencies";

export type ServiceName = keyof typeof services

export type Services = {
  [K in keyof typeof services]: InstanceType<typeof services[K]>
}

type ExtractState<T> = T extends { state: infer S } ? S : unknown;
type StripBaseKeys<T> = Omit<T, keyof BaseService<unknown, unknown, unknown> | 'state' | 'dependencies' | 'getService'>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MethodsOnly<T> = { [K in keyof T as T[K] extends (...args: any[]) => any ? K : never]: T[K] };
type PublicServiceAPI<T> = MethodsOnly<StripBaseKeys<T>> & ExtractState<T>;

export const hooks = createTypedHooks<Services>();
export const useService = hooks.useService as <K extends ServiceName>(serviceName: K) => PublicServiceAPI<Services[K]>;

export const createCore = (dependencies: Partial<Dependencies> = {}) => {
  return new Core<typeof services, Dependencies>(dependencies, services)
}