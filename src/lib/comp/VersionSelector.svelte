<script lang="ts">
    import { onMount } from "svelte";
    import ModuleSelector from "./ModuleSelector.svelte";
    let releases: Release[] = [];
    let promise = loadReleases();
    let selectedReleaseId: number;

    async function loadReleases(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                releases = await (
                    await fetch(
                        // "https://api.github.com/repos/Gunivers/Bookshelf/releases",
                        "/testData/releases.json"
                    )
                ).json();
                if (releases.length <= 0) return;
                selectedReleaseId = releases[0].id;
                releases.unshift({id: -1, assets: [], html_url: "", name: "Latest Unstable", tag_name: "master"})
                resolve();
            } catch (error) {
                reject();
            }
        });
    }
</script>

<div id="controlbar" class="rounded">
    <div id="controlbar-inner">
        <select name="release" id="release" bind:value={selectedReleaseId}>
            {#await promise}
                <option value="-1">Loading...</option>
            {:then}
                {#each releases as release, i}
                    <option value={release.id} selected={selectedReleaseId === release.id}>{release.name}</option>
                {/each}
            {:catch}
                <option value="0"
                    >Something went wrong. Please try again later.</option
                >
            {/await}
        </select>
        <input type="text" name="search" id="search" placeholder="search..."/>
        <div></div>
    </div>
    <button class="dl highlight">Download</button>
</div>
<div id="modules" class="rounded">
    {#await promise}
        <div class="loading full">Loading...</div>
    {:then}
        {#if selectedReleaseId}
            <ModuleSelector {releases} {selectedReleaseId}></ModuleSelector>
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
