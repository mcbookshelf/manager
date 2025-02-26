import { modules, versions } from "./stores.js";


export const fetchVersions = async () => {
  const url = `https://api.mcbookshelf.dev/versions`;
  const res = await fetch(import.meta.env.DEV ? `/stubs/versions.json` : url);
  const data: Version[] = await res.json();

  versions.set(new Map(data.map(version => [version.version, version])));
  return data;
};


export const fetchModules = async (version: string) => {
  const url = `https://api.mcbookshelf.dev/version/${version}`;
  const res = await fetch(import.meta.env.DEV ? `/stubs/manifest.json` : url);
  const data: { modules: Module[] } = await res.json();

  data.modules = data.modules.sort((a, b) => a.name.localeCompare(b.name));
  modules.set(new Map(data.modules.map(module => [module.id, module])))
  return data.modules;
};
