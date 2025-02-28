import { get, writable } from "svelte/store";

export const modules = writable(new Map<string, Module>());
export const versions = writable(new Map<string, Version>());

export const selectedModules = writable(new Set<string>());
export const requiredModules = writable(new Set<string>());
export const recommendedModules = writable(new Set<string>());
export const selectedVersion = writable("");

modules.subscribe(() => {
  selectedModules.set(new Set<string>());
})

selectedModules.subscribe((selected) => {
  const map = get(modules);
  const required = new Set<string>();
  const recommended = new Set<string>();

  selected.forEach(module => {
    map.get(module)?.weak_dependencies?.forEach(dep => recommended.add(dep));
    map.get(module)?.dependencies?.forEach(dep => required.add(dep));
  });

  let dependencies = Array.from(required.values());
  while (dependencies.length > 0) {
    const module = map.get(dependencies.shift()!);
    module?.weak_dependencies?.forEach((dep) => recommended.add(dep));
    module?.dependencies?.forEach((dep) => {
      if (!required.has(dep)) {
        dependencies.push(dep);
        required.add(dep);
      }
    });
  }

  recommendedModules.set(recommended);
  requiredModules.set(required);
});
