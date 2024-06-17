// https://api.github.com/repos/Gunivers/Bookshelf/releases
interface Release {
    name: string,
    id: number,
    tag_name: string,
    html_url: string,
    assets: Asset[],
}

interface Asset {
    /** the actual download url */
    browser_download_url: string,
    download_count: number,
}

interface DatapackData {
    name: string,
    description: string,
    pack_format: number,
    modules: ModuleData[],
}

interface ModuleData {
    name: string,
    display_name: string,
    description: string,
    documentation: string,
    icon?: string,
    module_path: string,
    weak_dependencies?: string[],
    dependencies?: string[],
    features?: any[],
}