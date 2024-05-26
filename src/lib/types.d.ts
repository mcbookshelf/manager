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
    datapack: string,
    path: string,
    modules: ModuleData[],
}

interface ModuleData {
    name: string,
    display_name: string,
    description: string,
    documentation: string,
    icon?: string,
    path: string,
    weak_dependencies?: string[],
    dependencies?: string[],
    features?: string[],
}