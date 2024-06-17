<script lang="ts">
    import {
        datapacks,
        recommendedModules,
        requiredModules,
        selectedModules,
    } from "$lib/stores";
    import Module from "./Module.svelte";

    export let releases: Release[] = [];
    export let selectedReleaseId: number = -1;

    $: selectedRelease = releases.find((v) => v.id === selectedReleaseId);
    $: moduleListener = loadModules(selectedRelease);

    async function loadModules(_selectedRelease: Release | undefined) {
        datapacks.set([]);
        selectedModules.update((m) => {
            m.clear();
            return m;
        });
        recommendedModules.update((m) => {
            m.clear();
            return m;
        });
        requiredModules.update((m) => {
            m.clear();
            return m;
        });
        if (!_selectedRelease) {
            return;
        }

        try {
            let result = await fetch(
                // `https://raw.githubusercontent.com/Gunivers/Bookshelf/${_selectedRelease.tag_name}/generated/manifest.json`,
                `/testData/manifest.json`,
            );
            if (!result.ok) {
                throw new Error(`${result.status} - ${result.statusText}`);
            }

            datapacks.set(await result.json());
            $datapacks.sort((a, b) => a.name.localeCompare(b.name));
        } catch (error) {
            console.error(error);
        }
    }

    selectedModules.subscribe(() => {
        let reqM = new Set<string>();
        let recM = new Set<string>();

        for (let dp of $datapacks) {
            if (!dp.modules) continue;
            for (let module of dp.modules) {
                if ($selectedModules.has(module)) {
                    if (module.dependencies) {
                        for (let dep of module.dependencies) {
                            reqM.add(dep);
                        }
                    }
                    if (module.weak_dependencies) {
                        for (let dep of module.weak_dependencies) {
                            recM.add(dep);
                        }
                    }
                }
            }
        }

        // doublecheck required modules for requirements
        let modulesToCheck = Array.from(reqM.values());
        while (modulesToCheck.length > 0) {
            let moduleToCheck = modulesToCheck.shift();
            for (let dp of $datapacks) {
                let module = dp.modules.find(
                    (module) => module.name === moduleToCheck,
                );
                if (!module) continue;
                if (module.dependencies) {
                    for (let dep of module.dependencies) {
                        if(reqM.has(dep)) continue;
                        reqM.add(dep);
                        modulesToCheck.push(dep);
                    }
                }
                if (module.weak_dependencies) {
                    for (let dep of module.weak_dependencies) {
                        recM.add(dep);
                    }
                }
            }
        }

        recommendedModules.set(recM);
        requiredModules.set(reqM);
    });
</script>

<div id="module-selector">
    {#await moduleListener}
        <p>Loading...</p>
    {:then}
        {#if $datapacks.length > 0}
            {#each $datapacks as datapack}
                <div class="datapack-wrapper">
                    <h2>{datapack.name}</h2>
                    <div class="module-wrapper">
                        {#if datapack.modules}
                            {#each datapack.modules as module}
                                <Module
                                    {module}
                                    required={$requiredModules.has(module.name)}
                                    recommended={$recommendedModules.has(
                                        module.name,
                                    )}
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
