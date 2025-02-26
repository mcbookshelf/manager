<script>
  let { show = $bindable(), children } = $props();

  let dialog = $state();

  $effect(() => {
    show ? dialog.showModal() : dialog.close();
  });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
  class="rounded"
  bind:this={dialog}
  onclose={() => (show = false)}
  onclick={(e) => {
    if (e.target === dialog) dialog.close();
  }}
>
  {@render children?.()}
</dialog>

<style>
  dialog {
    color: var(--text-color);
    background: var(--background-color);
    max-width: calc(100vw - 2rem);
    max-height: 80vh;
    border: none;
    padding: 0;
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.5);
  }
  dialog[open] {
    display: flex;
    flex-direction: column;
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }
  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
