<script lang="ts">
  import Icon from "$lib/ui/Icon.svelte";

  let isDarkMode = $state(false);

  const setTheme = (darkMode: boolean) => {
    isDarkMode = darkMode;
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("dark-mode", String(darkMode));
  };

  $effect(() => {
    const prefers = localStorage.getItem("dark-mode");
    setTheme(
      prefers
        ? prefers === "true"
        : window.matchMedia("(prefers-color-scheme: dark)").matches,
    );
  });
</script>

<input type="checkbox" id="mobile-nav-toggle" hidden>
<label for="mobile-nav-toggle"></label>
<nav aria-label="Bookshelf Links">
  <ul>
    <li><a target="_blank" href="https://docs.mcbookshelf.dev/en/latest" rel="noopener noreferrer"><Icon type="book-marked" size="1em"></Icon>Documentation</a></li>
    <li><a target="_blank" href="https://github.com/mcbookshelf/bookshelf" rel="noopener noreferrer"><Icon type="github" size="1em"></Icon>Git Repository</a></li>
    <li><a target="_blank" href="https://github.com/mcbookshelf/bookshelf/issues" rel="noopener noreferrer"><Icon type="bug" size="1em"></Icon>Report a bug</a></li>
    <li><a target="_blank" href="https://discord.gg/MkXytNjmBt" rel="noopener noreferrer"><Icon type="headset" size="1em"></Icon>Discord</a></li>
    <li><a target="_blank" href="https://docs.mcbookshelf.dev/en/latest/contribute" rel="noopener noreferrer"><Icon type="heart-handshake" size="1em"></Icon>Contribute</a></li>
  </ul>
  <button aria-label="Toggle Theme" onclick={() => setTheme(!isDarkMode)} tabindex="-1">
    {#if isDarkMode}
      <Icon type="light" size="2em"></Icon>
    {:else}
      <Icon type="dark" size="2em"></Icon>
    {/if}
  </button>
</nav>

<style>
  nav {
    padding: 1rem 0.75rem;
    border: 1px solid var(--divider-color);
    border-left: none;
    border-right: none;
    flex-basis: 100%;
    line-height: 2;
  }
  a {
    display: flex;
    align-items: center;
    gap: .75rem;
  }
  button {
    display: flex;
    position: absolute;
    background: var(--text-color);
    border-radius: 50%;
    color: var(--background-color);
    top: 1rem;
    right: 3.5rem;
    padding: 0.25em;
  }
  label {
    display: none;
    font-size: 2em;
    margin: 0 .5rem;
  }
  @media screen and (max-width: 1024px) {
    nav {
      padding: .75rem;
    }
  }
  @media screen and (max-width: 820px) {
    nav {
      display: none;
      border-bottom: none;
      z-index: 1000;
      padding: 1rem 1.5rem;
    }
    button {
      top: auto;
      bottom: 1rem;
      right: 1rem;
    }
    label {
      display: block;
      cursor: pointer;
      width: 1.5em;
      text-align: center;
    }
    label::after {
      content: "☰";
    }
    #mobile-nav-toggle:checked ~ label::after {
      content: "⨯";
    }
    #mobile-nav-toggle:checked ~ nav {
      display: block;
    }
  }
</style>
