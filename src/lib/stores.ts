import { writable } from "svelte/store";

export const modules = writable(new Array<ModuleData>);
export const selectedModules = writable(new Set<ModuleData>());
export const requiredModules = writable(new Set<string>());
export const recommendedModules = writable(new Set<string>());
