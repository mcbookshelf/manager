<script lang="ts">
  import Close from "./Close.svelte";

  let show: boolean = $state(true);

  let {
    children,
    color = "",
    dismissable = false,
    onclick = undefined,
    ondismiss = undefined,
  } = $props();

  const dismiss = () => {
    ondismiss?.();
    show = false;
  };
</script>

{#if show}
  <span class={["badge", color]}>
    {#if onclick}
      <button {onclick}>{@render children()}</button>
    {:else}
      {@render children()}
    {/if}
    {#if dismissable}
      <Close onclick={dismiss}></Close>
    {/if}
  </span>
{/if}

<style>
  .badge {
    display: inline-block;
    background-color: var(--background-color-darker);
    border-radius: 0.25em;
    color: var(--text-color);
    font-size: 0.85em;
    font-weight: 600;
    line-height: 1.25;
    padding: 0.2em 0.5em;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
  }
  .badge:has(button) {
    padding: 0;
  }
  .badge button {
    color: inherit;
    height: 100%;
    display: block;
    font-size: inherit;
    text-decoration: none;
    background: none;
    padding: 0.2em 0.5em;
  }
  .badge button:hover {
    text-decoration: underline;
  }
  .badge.highlight {
    background-color: var(--highlight-color);
    color: var(--text-color-highlight);
  }
  .badge.red {
    background-color: #dc3545;
    color: #fff;
  }
  .badge.yellow {
    background-color: #ffc107;
    color: #212529;
  }
  .badge.green {
    background-color: #28a745;
    color: #fff;
  }
  .badge.indigo {
    background-color: #6610f2;
    color: #fff;
  }
  .badge.purple {
    background-color: #6f42c1;
    color: #fff;
  }
  .badge.pink {
    background-color: #e83e8c;
    color: #fff;
  }
  .badge.blue {
    background-color: #007bff;
    color: #fff;
  }
</style>
