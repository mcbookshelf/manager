<script lang="ts">
  const promise = (async (): Promise<{
    avatar_url: string;
    html_url: string;
    login: string;
  }[]> => {
    const url = import.meta.env.DEV
      ? "/stubs/contributors.json"
      : "https://api.github.com/repos/mcbookshelf/bookshelf/contributors";

    return await (await fetch(url)).json();
  })();
</script>

<section>
  <h2>Contributors</h2>
  {#await promise}
    <p>loading...</p>
  {:then contributors}
    <ul>
      {#each contributors.slice(0, 10) as contributor}
        <li>
          <a href={contributor.html_url} title={contributor.login} target="_blank">
            <img src={contributor.avatar_url} alt={contributor.login} />
          </a>
        </li>
      {/each}
    </ul>
    {#if contributors.length > 10}
      <a href="https://github.com/mcbookshelf/bookshelf/graphs/contributors" target="_blank">
        +{contributors.length - 9} contributors
      </a>
    {/if}
  {:catch}
    <p>Something went wrong loading contributors</p>
  {/await}
</section>

<style>
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin: 0.2rem 0.2rem 0.5rem;
  }
  li {
    height: 2em;
    width: 2em;
  }
  li a {
    display: inline-grid;
    border-radius: 50%;
    overflow: hidden;
    transition: transform .1s;
  }
  li a:hover {
    transform: translateY(2px);
  }
</style>
