// https://api.mcbookshelf.dev/versions
interface Version {
  version: string;
  minecraft_versions: string[];
}

// https://api.mcbookshelf.dev/version/{version}
interface Module {
  id: string,
  name: string,
  slug: string,
  icon?: string,
  banner?: string,
  readme?: string,
  documentation: string,
  description: string,
  kind: ModuleKind,
  tags: string[],
  weak_dependencies?: string[],
  dependencies?: string[],
}

type ModuleKind = "data_pack" | "resource_pack";
