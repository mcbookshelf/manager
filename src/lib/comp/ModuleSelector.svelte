<script lang="ts">
    import {
        modules,
        recommendedModules,
        requiredModules,
        selectedModules,
    } from "$lib/stores";
    import Module from "./Module.svelte";

    export let versions: Version[] = [];
    export let selectedVersionId: string = "";

    $: selectedRelease = versions.find((v) => v.version === selectedVersionId);
    $: moduleListener = loadModules(selectedRelease);

    async function loadModules(_selectedRelease: Version | undefined) {
        modules.set([]);
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
            let url = import.meta.env.DEV
                ? `/testData/manifest.json`
                : `https://api.mcbookshelf.dev/version/${_selectedRelease.version}`;
            let result = await fetch(url);
            if (!result.ok) {
                throw new Error(`${result.status} - ${result.statusText}`);
            }

            modules.set((await result.json()).modules);
            $modules.sort((a, b) => a.name.localeCompare(b.name));
        } catch (error) {
            console.error(error);
        }
    }

    selectedModules.subscribe(() => {
        let reqM = new Set<string>();
        let recM = new Set<string>();

        for (let module of $modules) {
            if (!module) continue;
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

        // doublecheck required modules for requirements
        let modulesToCheck = Array.from(reqM.values());
        while (modulesToCheck.length > 0) {
            let moduleToCheck = modulesToCheck.shift()!;
            let module = $modules.find((module) => module.id === moduleToCheck);
            if (!module) continue;
            if (module.dependencies) {
                for (let dep of module.dependencies) {
                    if (reqM.has(dep)) continue;
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

        recommendedModules.set(recM);
        requiredModules.set(reqM);
    });
</script>

<div id="module-selector">
    {#await moduleListener}
        <p>Loading...</p>
    {:then}
        {#if $modules.length > 0}
            <div class="module-wrapper">
                {#each $modules as module}
                    {#if module}
                        <Module
                            {module}
                            required={$requiredModules.has(module.id)}
                            recommended={$recommendedModules.has(module.id)}
                        ></Module>
                    {:else}
                        <p>No Modules in this Datapack</p>
                    {/if}
                {/each}
            </div>
        {:else}
            <p>This version doesn't seem to have selectable parts yet.</p>
            {#if selectedRelease}
                <p>
                    <a
                        href="https://github.com/mcbookshelf/Bookshelf/tree/v{selectedRelease.version}"
                        target="_blank"
                        rel="noopener noreferrer"
                        >You can browse the selected release from GitHub here.</a
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
