import { writable } from "svelte/store";

export const datapacks = writable(new Array<DatapackData>);
export const selectedModules = writable(new Set<ModuleData>());
export const requiredModules = writable(new Set<string>());
export const recommendedModules = writable(new Set<string>());
