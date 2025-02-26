<script lang="ts">
  let { type, size = "24" } = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  width={size}
  height={size}
>
  <use href={`#${type}`} />
</svg>
