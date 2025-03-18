<script lang="ts">
  import { modules, recommendedModules, requiredModules, selectedModules } from "$lib/stores.js";
  import Badge from "$lib/ui/Badge.svelte";
  import Icon from "$lib/ui/Icon.svelte";

  let { module }: { module: Module } = $props();

  let timeout: Map<string, number> = new Map();

  const highlight = (id: string) => {
    const input = document.getElementById(id);
    const module = input?.parentElement;

    clearTimeout(timeout.get(id))
    module?.classList.add("highlighted");
    timeout.set(id, setTimeout(() => module?.classList.remove("highlighted"), 1500));
    input?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
</script>

<label
  for={module.id}
  class="rounded"
  class:required={$requiredModules.has(module.id)}
  class:recommended={$recommendedModules.has(module.id)}
>
  <input type="checkbox" name={module.name} id={module.id} bind:checked={
    () => $selectedModules.has(module.id),
    (state) => selectedModules.update((modules) => {
      state ? modules.add(module.id) : modules.delete(module.id);
      return modules;
    })
  }/>
  <img src={module.banner ?? "banner.png"} alt="" role="presentation" />
  <section class="content">
    <a class="doc highlight" target="_blank" href={module.documentation} aria-label="{module.name} Documentation">
      <Icon type="book" size="1em"></Icon>Doc
    </a>
    <ul class="tags" aria-label="Module Tags">
      {#each module.tags as tag}
        <li><Badge>#{tag}</Badge></li>
      {/each}
    </ul>
    <h3>{module.name}</h3>
    <p>{module.description}</p>
    {#if module.dependencies?.length || module.weak_dependencies?.length}
      <div class="deps">
        Related:
        {#each module.dependencies ?? [] as dep}
          <Badge color="highlight" onclick={() => highlight(dep)}>{$modules.get(dep)?.name}</Badge>
        {/each}
        {#each module.weak_dependencies ?? [] as dep}
          <Badge onclick={() => highlight(dep)}>{$modules.get(dep)?.name}</Badge>
        {/each}
      </div>
    {/if}
  </section>
</label>

<style>
  label {
    display: flex;
    cursor: pointer;
    background: var(--background-color-lighter);
    filter: drop-shadow(0.15rem 0.35rem 0.1rem var(--background-color-darker));
    flex-direction: column;
    height: 100%;
    min-height: 24rem;
    outline: 4px solid transparent;
    overflow: hidden;
    position: relative;
    user-select: none;
    transition: transform .1s;
  }
  label:hover {
    transform: scale(1.025);
  }
  label:active:not(:has(.doc:hover)):not(:has(:global(button:hover))) {
    transform: scale(0.975);
  }
  label::before {
    content: "";
    display: block;
    position: absolute;
    background: #fff;
    border-radius: 50%;
    border: 2px solid #00000033;
    text-align: center;
    color: #eee;
    height: 25px;
    width: 25px;
    top: 10px;
    right: 10px;
  }
  label:not(:has(input:checked)).recommended {
    outline-color: #aaaaaa44;
  }
  label:has(input:checked), label.required {
    outline-color: var(--highlight-color);
  }
  label:has(input:checked)::before {
    content: "✓";
    background: var(--highlight-color);
    border-color: var(--highlight-color);
  }
  label::after {
    position: absolute;
    top: 0;
    left: 0;
    color: var(--text-color-highlight);
    padding: .1rem .5rem .2rem .2rem;
  }
  label:not(:has(input:checked)).recommended::after {
    content: "Recommended";
    background: #aaa;
  }
  label:not(:has(input:checked)).required::after {
    content: "Required";
    background: var(--highlight-color);
  }
  :global(label.highlighted) {
    filter: brightness(.9);
    outline-color: var(--highlight-secondary-color) !important;
  }
  input {
    height: 0;
    visibility: hidden;
    margin: -1.5rem 0 1.5rem;
  }
  img {
    object-fit: cover;
    width: 100%;
    -webkit-user-drag: none;
  }
  .content  {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 1rem;
    flex: 1 0;
  }
  .doc {
    display: flex;
    position: absolute;
    align-items: center;
    border-bottom-left-radius: 0.375rem;
    padding: 0.25rem 0.5rem;
    gap: .25em;
    top: 0;
    right: 0;
    transition: background .1s;
  }
  .deps {
    font-size: .825em;
    font-weight: 700;
    margin-top: 1.5rem;
  }
  .deps, .tags {
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    gap: .25rem;
  }
  p {
    flex-grow: 1;
    font-size: 0.94em;
    line-height: 1.4;
  }
  @media screen and (max-width: 1480px) {
    label {
      min-height: 350px;
    }
  }
  @media screen and (max-width: 1024px) {
    label {
      min-height: 300px;
    }
  }
  @media screen and (max-width: 820px) {
    input {
      margin: -5rem 0 5rem;
    }
  }
</style>
