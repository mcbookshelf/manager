<script lang="ts">
  let { onclick } = $props();
</script>

<button type="button" aria-label="Close" {onclick}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
  >
</button>

<style>
  button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    line-height: 1;
    opacity: 0.5;
    padding: 0;
    transform: scale(1.25) translateY(-0.075em);
    vertical-align: middle;
  }
  button:hover {
    opacity: 0.75;
  }
  button svg {
    height: 0.8em;
    width: 0.8em;
    vertical-align: middle;
  }
</style>
