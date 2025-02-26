<script lang="ts">
  import Contributors from "$lib/comp/Contributors.svelte";
  import ModuleManager from "$lib/comp/ModuleManager.svelte";
  import NavMenu from "$lib/comp/NavMenu.svelte";
  import Sponsors from "$lib/comp/Sponsors.svelte";
</script>

<header>
  <img src="favicon.png" alt="" role="presentation" />
  <h1>Bookshelf Manager</h1>
  <p>Highly accessible multi-purpose Minecraft library datapack</p>
  <NavMenu></NavMenu>
</header>
<aside>
  <Contributors></Contributors>
  <Sponsors></Sponsors>
</aside>
<ModuleManager></ModuleManager>
<footer>&copy;Gunivers {new Date().getFullYear()} - Mentions légales</footer>

<style>
  header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1rem 0 0.5rem;
  }
  header h1 {
    flex: 1 0;
    color: var(--text-color-logo);
    line-height: 1.2em;
  }
  header img {
    filter: drop-shadow(0.15rem 0.35rem 0.15rem #00000033);
    width: 100px;
  }
  header p {
    flex-basis: 100%;
    margin: 0.5rem;
    opacity: 0.8;
  }
  aside {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    padding: 0.5rem;
    gap: 2rem;
  }
  footer {
    display: flex;
    align-items: end;
  }
  @media screen and (max-width: 1024px) {
    aside {
      gap: 1.5rem;
    }
    header img {
      width: 64px;
    }
  }
  @media screen and (max-width: 820px) {
    header {
      position: sticky;
      background: var(--background-color-darker);
      border-bottom: 1px solid #99999955;
      margin: 0;
      top: 0;
      z-index: 1;
      gap: 0;
    }
    header h1 {
      line-height: 1;
      font-size: 1.3em;
      margin: .5rem 2rem .5rem 0;
    }
    header img {
      width: 2.75em;
      margin: .75rem 1rem;
    }
    header p {
      display: none;
    }
  }
</style>
