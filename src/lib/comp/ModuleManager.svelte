<script lang="ts">
  import { modules, versions, selectedVersion } from "$lib/stores.js";
  import { fetchModules, fetchVersions } from "$lib/utils.js";

  import ModuleTile from "./ModuleTile.svelte";
  import ModuleControls from "./ModuleControls.svelte";

  const promise = $derived.by(async () => {
    if ($versions.size < 1) {
      const versions = await fetchVersions();
      selectedVersion.set(versions[0].version!);
    }
    return fetchModules($selectedVersion);
  });
</script>

<main class="rounded">
  <ModuleControls></ModuleControls>
  <section aria-label="Available Modules">
    {#await promise}
      <p>Loading...</p>
    {:then}
      <ul>
        {#each $modules.values() as module}
          <li><ModuleTile {module}></ModuleTile></li>
        {/each}
      </ul>
    {:catch}
      <p>Something went wrong when trying to fetch modules.</p>
    {/await}
  </section>
</main>

<style>
  main {
    display: flex;
    background: var(--background-color);
    flex-direction: column;
    margin-top: 2.75rem;
    overflow: hidden;
  }
  section {
    flex-grow: 1;
    overflow: auto;
    position: relative;
  }
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.75rem;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 1.75rem;
    position: absolute;
  }
  ul::after {
    content: "";
    display: block;
    grid-column: 1 / -1;
    height: 1px;
  }
  @media screen and (max-width: 1480px) {
    ul {
      gap: 1.5rem;
      margin: 1.5rem;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
  }
  @media screen and (max-width: 1024px) {
    ul {
      gap: 1.25rem;
      margin: 1.25rem;
      grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
    }
  }
  @media screen and (max-width: 820px) {
    main {
      margin-top: 0;
      border-radius: 0;
    }
    ul {
      position: relative;
    }
  }
</style>
