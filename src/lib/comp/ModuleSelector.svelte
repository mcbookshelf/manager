<script lang="ts">
    import Module from "./Module.svelte";

    export let releases: Release[] = [];
    export let selectedReleaseId: number = -1;

    let datapackData: DatapackData[] = [];
    $: selectedRelease = releases.find((v) => v.id === selectedReleaseId);
    $: moduleListener = loadModules(selectedRelease);

    async function loadModules(_selectedRelease: Release | undefined) {
        datapackData = [];
        selectedModules.clear();
        recommendedModules.clear();
        requiredModules.clear();
        if (!_selectedRelease) {
            return;
        }

        try {
            let result = await fetch(
                // `https://raw.githubusercontent.com/Gunivers/Bookshelf/master/${_selectedRelease.tag_name}/manifest.json`,
                `/testData/datapacks.json`,
            );
            if (!result.ok) {
                throw new Error(`${result.status} - ${result.statusText}`);
            }

            datapackData = await result.json();
            datapackData.sort((a, b) => a.datapack.localeCompare(b.datapack));
        } catch (error) {
            console.error(error);
        }
    }

    let selectedModules: Set<string> = new Set();
    let requiredModules: Set<string> = new Set();
    let recommendedModules: Set<string> = new Set();

    function selectOrDeselectModule(_event: CustomEvent) {
        let module: ModuleData = _event.detail.module;
        let selected: boolean = _event.detail.selected;

        if (selected) {
            selectedModules.add(module.name);
        } else {
            selectedModules.delete(module.name);
        }
        updateRequiredModules();
    }

    function updateRequiredModules() {
        requiredModules.clear();
        recommendedModules.clear();

        for (let dp of datapackData) {
            if (!dp.modules) continue;
            for (let module of dp.modules) {
                if (selectedModules.has(module.name)) {
                    if (module.dependencies) {
                        for (let dep of module.dependencies) {
                            requiredModules.add(dep);
                        }
                    }
                    if (module.weak_dependencies) {
                        for (let dep of module.weak_dependencies) {
                            recommendedModules.add(dep);
                        }
                    }
                }
            }
        }

        requiredModules = requiredModules;
        recommendedModules = recommendedModules;
    }
</script>

<div id="module-selector">
    {#await moduleListener}
        <p>Loading...</p>
    {:then}
        {#if datapackData.length > 0}
            {#each datapackData as datapack}
                <div class="datapack-wrapper">
                    <h2>{datapack.datapack}</h2>
                    <div class="module-wrapper">
                        {#if datapack.modules}
                            {#each datapack.modules as module}
                                <Module
                                    {module}
                                    on:toggle={selectOrDeselectModule}
                                    required={requiredModules.has(module.name)}
                                    recommended={recommendedModules.has(module.name)}
                                ></Module>
                            {/each}
                        {:else}
                            <p>No Modules in this Datapack</p>
                        {/if}
                    </div>
                </div>
            {/each}
        {:else}
            <p>This version doesn't seem to have selectable parts yet.</p>
            {#if selectedRelease}
                <p>
                    <a
                        href={selectedRelease.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        >You can download the selected release from GitHub here.</a
                    >
                </p>
            {/if}
        {/if}
    {:catch}
        <p>Something went wrong when trying to fetch modules.</p>
    {/await}
</div>

<style>
    #module-selector {
        display: flex;
        flex-direction: column;
    }

    .module-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>
