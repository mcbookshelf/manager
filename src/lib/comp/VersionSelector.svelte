<script lang="ts">
    import { onMount } from "svelte";
    import ModuleSelector from "./ModuleSelector.svelte";
    import { requiredModules, selectedModules } from "$lib/stores";
    let versions: Version[] = [];
    let promise = loadReleases();
    let selectedVersionId: string;

    function filterVersions(versions: Version[]): Version[] {
        const filteredVersions: Version[] = [];
        const filterLevel = 1; //0: MAJOR, 1: MINOR, 2: PATCH, 3: ...

        for (let version of versions) {
            let versionNumber = getVersionNumberArray(version);
            let needsToBeIncluded: boolean = true;
            for (let n = 0; n < filteredVersions.length; n++) {
                let includedVersion = filteredVersions[n];
                let includedVersionNumber =
                    getVersionNumberArray(includedVersion);

                let difference: number[] = [];
                for (
                    let i: number = 0;
                    i < versionNumber.length ||
                    i < includedVersionNumber.length;
                    i++
                ) {
                    difference[i] =
                        (versionNumber[i] ?? 0) - (includedVersionNumber[i] ?? 0);
                }

                let isSameLevel: boolean = true;
                for (let i: number = 0; i <= filterLevel; i++) {
                    if (difference[i] !== 0) isSameLevel = false;
                }
                if (isSameLevel) {
                    needsToBeIncluded = false;
                    for (
                        let i: number = filterLevel + 1;
                        i < difference.length;
                        i++
                    ) {
                        if (difference[i] > 0) {
                            filteredVersions.splice(n, 1, version);
                            break;
                        } else if (difference[i] < 0) {
                            break;
                        }
                    }
                }
            }
            if (needsToBeIncluded) {
                filteredVersions.push(version);
            }
        }

        if(!selectedVersionId && filteredVersions.length > 0) selectedVersionId = filteredVersions[0].version;
        return filteredVersions;
    }

    function getVersionNumberArray(version: Version): number[] {
        if (!version.version_as_numbers)
            version.version_as_numbers = version.version
                .split(".")
                .map((n) => parseInt(n));
        return version.version_as_numbers;
    }

    async function loadReleases(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                let url = import.meta.env.DEV
                    ? "/testData/releases.json"
                    : "https://api.mcbookshelf.dev/versions";
                versions = await (await fetch(url)).json();
                if (versions.length <= 0) return;
                selectedVersionId = versions[0].version;
                resolve();
            } catch (error) {
                reject();
            }
        });
    }

    $: filteredVersions = filterVersions(versions);

    function download() {
        const modulesToDownload = new Set<string>();
        $selectedModules.forEach(m => modulesToDownload.add(m.id));
        $requiredModules.forEach(m => modulesToDownload.add(m));

        const downloadLink = `https://api.mcbookshelf.dev/download?version=${selectedVersionId}&modules=${Array.from(modulesToDownload).join(",")}`;
        
        window.open(downloadLink);
    }

    function versionString(v: Version): string {
        if (v.minecraft_versions.length == 0) return "No MC version found.";
        if (v.minecraft_versions.length == 1) return v.minecraft_versions[0];

        return `${v.minecraft_versions[0]}-${v.minecraft_versions[v.minecraft_versions.length - 1]}`;
    }

    let onlyRecommended: boolean = true;
</script>

<div id="controlbar" class="rounded">
    <div id="controlbar-inner">
        <select name="release" id="release" bind:value={selectedVersionId}>
            {#await promise}
                <option value="-1">Loading...</option>
            {:then}
                {#each onlyRecommended ? filteredVersions : versions as version, i}
                    <option
                        value={version.version}
                        selected={selectedVersionId === version.version}
                        >{version.version} ({versionString(version)})</option
                    >
                {/each}
            {:catch}
                <option value="0"
                    >Something went wrong. Please try again later.</option
                >
            {/await}
        </select>
        <label for="show-all">
            <input type="checkbox" name="show-all" id="show-all" bind:checked={onlyRecommended}>
            Show only recommended versions
        </label>
        <!-- <input type="text" name="search" id="search" placeholder="search..." /> -->
    </div>
    <button
        class="dl highlight"
        disabled={$selectedModules.size === 0}
        on:click={download}
    >
        Download</button
    >
</div>
<div id="modules" class="rounded">
    {#await promise}
        <div class="loading full">Loading...</div>
    {:then}
        {#if selectedVersionId}
            <ModuleSelector {versions} {selectedVersionId}></ModuleSelector>
        {:else}
            <p>Please select a release.</p>
        {/if}
    {:catch}
        <p>
            Something went wrong. Please check your internet connection and try
            again later.
        </p>
    {/await}
</div>

<style>
    #controlbar {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color: var(--background-color);
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-bottom: 1px solid var(--divider-color);
    }
    #controlbar-inner {
        padding: 1rem;
    }
    button.dl {
        height: 4em;
        width: 10vw;
        border-radius: 0;
        border-top-right-radius: 0.375rem;
    }

    #modules {
        padding: 1rem;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        background-color: var(--background-color);
    }

    @media screen and (max-width: 820px) {
        #controlbar {
            position: fixed;
            bottom: 0;
            flex-direction: column;
            z-index: 99;
            width: 100%;
            border-top: 1px solid var(--background-color-darker);
        }

        #release {
            width: 100%;
        }

        #search {
            display: none;
        }

        button.dl {
            width: 100%;
            border-radius: 0;
        }

        #modules {
            margin-bottom: 100px;
        }
    }
</style>
