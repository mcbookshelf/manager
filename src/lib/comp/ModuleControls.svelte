<script lang="ts">
  import { selectedModules, selectedVersion, versions } from "$lib/stores.js";
  import Icon from "$lib/ui/Icon.svelte";
  import Modal from "$lib/ui/Modal.svelte";

  let isVersionModalOpen = $state(false);
  let showFilteredVersions = $state(true);

  let version = $derived.by(() => {
    let version = $versions.get($selectedVersion);
    if (version) {
      return {
        id: version.version,
        name: `${version.version} (MC ${createVersionRange(version.minecraft_versions)})`,
      };
    }
  });


  let filteredVersions = $derived.by(() => {
    let versionEntries  = [...$versions.values()].map((version) => ({
      id: version.version,
      name: `${version.version} (MC ${createVersionRange(version.minecraft_versions)})`,
      parts: version.version.split('.').map(Number),
    })).sort((a, b) =>
      b.parts[0] - a.parts[0] ||
      b.parts[1] - a.parts[1] ||
      b.parts[2] - a.parts[2]
    );

    if (!showFilteredVersions) return versionEntries;

    let seen = new Map();
    return versionEntries.filter(({ parts }) => {
      let key = `${parts[0]}.${parts[1]}`;
      if (!seen.has(key)) {
        seen.set(key, true);
        return true;
      }
      return false;
    });
  });

  const createVersionRange = (range: string[] | undefined) => {
    if (!range) return "";
    return range.length > 1 ? `${range[0]}-${range.at(-1)}` : range[0];
  };

  const download = async () => {
    const modules = Array.from($selectedModules).join(",");
    window.open(`https://api.mcbookshelf.dev/download?version=${version?.id}&modules=${modules}`);
  };
</script>

<nav aria-label="Modules Controls">
  <div class="controls">
    <button class="version-selector rounded" onclick={() => (isVersionModalOpen = true)}>
      Version: <small>{version?.name ?? "Loading..."}</small>
      <Icon type="pencil" size="1.1em"></Icon>
    </button>
    <Modal bind:show={isVersionModalOpen}>
      <div class="versions-filter">
        Show only recommended versions
        <label class="switch">
          <input type="checkbox" bind:checked={showFilteredVersions} />
          <span></span>
        </label>
      </div>
      <ul class="versions">
        {#each filteredVersions as version}
          <li class:selected={version.id == $selectedVersion}>
            <label>
              {version.name}
              <input
                type="radio"
                name="version"
                checked={version.id == $selectedVersion}
                onchange={() => {
                  selectedVersion.set(version.id);
                  isVersionModalOpen = false;
                }}
              >
              <span class="checkmark"></span>
            </label>
          </li>
        {/each}
      </ul>
    </Modal>
  </div>
  <button class="dl highlight" onclick={download} disabled={$selectedModules.size < 1}>
    <Icon type="download"></Icon>
    <span>
      Download
      <small>All in one datapack</small>
    </span>
  </button>
</nav>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    background: var(--background-color-lighter);
    filter: drop-shadow(0.1rem 0.1rem 0.2rem #00000022);
    z-index: 1;
  }
  .controls {
    padding: .5rem .75rem;
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  .dl {
    height: 100%;
    padding: .75rem 2.5rem .75rem 1.25rem;
    gap: 1rem;
    display: flex;
    font-size: 1em;
    text-align: left;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-family: Unbounded;
  }
  .dl small {
    display: block;
    font-size: .75em;
    font-family: "Nunito", Verdana, Geneva, Tahoma, sans-serif;
  }
  .dl :global(svg) {
    transition: transform 0.1s;
  }
  .dl:not(:disabled):hover :global(svg) {
    transform: translateY(2px);
  }
  .dl:not(:disabled):active :global(svg) {
    transform: translateY(3px);
  }
  .dl:disabled {
    background-color: #92979c82;
    cursor: not-allowed;
  }
  .controls :global(dialog) {
    width: 30rem;
  }
  .switch {
    position: relative;
    display: inline-block;
    min-width: 3em;
    height: 1.5em;
    overflow: hidden;
    border-radius: .5em;
  }
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .switch span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #88888866;
    transition: .4s;
  }
  .switch span::before {
    position: absolute;
    content: "";
    height: 1em;
    width: 1em;
    left: .25em;
    bottom: .25em;
    border-radius: 50%;
    background-color: #eee;
    transition: .4s;
  }
  .switch input:checked + span {
    background-color: var(--highlight-color);
  }
  .switch input:checked + span:before {
    transform: translateX(1.5em);
  }
  .version-selector {
    display: inline-flex;
    align-items: baseline;
    gap: .25rem;
    color: inherit;
    line-height: 1.25;
    text-align: left;
    background: none;
    padding: .5rem 1rem;
    font-size: 1em;
    cursor: pointer;
    background: #8b909b22;
    border: 1px solid #8b909b22;
  }
  .version-selector small {
    opacity: .75;
    text-decoration: dotted underline;
    text-wrap-mode: nowrap;
  }
  .version-selector :global(svg) {
    margin-left: .25rem;
    transform: translateY(.15em);
  }
  .versions-filter {
    z-index: 1;
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: #68747f22;
    justify-content: space-between;
    box-shadow: 0 0 3px 1px #bbb;
  }
  :global(.dark-mode) .versions-filter {
    box-shadow: 0 0 3px 1px #00000044;
  }
  .versions {
    flex: 1;
    overflow-y: auto;
  }
  .versions li {
    display: flex;
    border-bottom: 1px solid #7c869244;
  }
  .versions li:last-child {
    border-bottom: none;
  }
  .versions label {
    display: flex;
    color: inherit;
    cursor: pointer;
    width: 100%;
    padding: 1rem;
    font-size: 1em;
    background: none;
    text-align: left;
    align-items: center;
    justify-content: space-between;
  }
  .versions input {
    display: none;
  }
  .versions .checkmark {
    border-radius: 100%;
    width: 1.25em;
    height: 1.25em;
    padding: .2em;
    opacity: .25;
    border: 2px solid var(--text-color-lighter);
  }
  .versions label:hover {
    background: #00000009;
  }
  .versions input:checked + .checkmark {
    opacity: 1;
    border-color: var(--highlight-color);
  }
  .versions input:checked + .checkmark::after {
    display: block;
    content: "";
    width: 100%;
    height: 100%;
    background: var(--highlight-color);
    border-radius: 100%;
  }

  @media screen and (max-width: 820px) {
    nav {
      position: sticky;
      flex-direction: column;
      filter: drop-shadow(0.1rem -0.1rem 0.2rem #00000022);
      bottom: 0;
      width: 100%;
    }
    .controls {
      margin: auto;
    }
  }
</style>
