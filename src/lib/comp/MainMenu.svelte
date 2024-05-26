<script lang="ts">
    import DarkModeSwitch from "./DarkModeSwitch.svelte";
    let contributorWaiter = loadContributors();
    let contributors: {
        login: string;
        avatar_url: string;
        html_url: string;
    }[] = [];
    let mobileVisible: boolean = false;

    async function loadContributors(): Promise<void> {
        contributors = await (
            await fetch(
                // "https://api.github.com/repos/Gunivers/Bookshelf/contributors",
                "/testData/contributors.json",
            )
        ).json();
    }
</script>

<div id="main-menu">
    <div>
        <h1><img src="favicon.png" alt="" /><span>Bookshelf Manager</span></h1>
        <h3 class="light">
            Highly accessible multi-purpose Minecraft library datapack
        </h3>
    </div>
    <nav>
        <ul>
            <a href="# "><li>About</li></a>
            <a href="# "><li>Tools</li></a>
            <a href="# "><li>Documentation</li></a>
            <a href="# "><li>Git Repository</li></a>
            <a href="# "><li>Report a bug</li></a>
            <a href="# "><li>Join us!</li></a>
            <a href="# "><li>Help us</li></a>
        </ul>
    </nav>

    <aside>
        <h2>Contributors</h2>
        {#await contributorWaiter}
            <p class="contributor-text">loading...</p>
        {:then}
            <div>
                {#each contributors as contributor, i}
                    {#if i < 10}
                        <a
                            href={contributor.html_url}
                            title={contributor.login}
                            target="_blank"
                            class="contributor"
                        >
                            <img
                                src={contributor.avatar_url}
                                alt={contributor.login}
                                class="contributor"
                            />
                        </a>
                    {/if}
                {/each}
                {#if contributors.length > 10}
                    <br />
                    <a
                        href="https://github.com/Gunivers/Bookshelf/graphs/contributors"
                        >+{contributors.length - 9} contributors</a
                    >
                {/if}
            </div>
        {:catch}
            <p class="contributor-text">
                Something went wrong loading contributors
            </p>
        {/await}
    </aside>

    <aside class="ad">Advertisement</aside>

    <footer>
        &copy;Gunivers {new Date().getFullYear()} - Mentions légales
    </footer>
</div>

<div id="main-menu-mobile">
    <input
        type="checkbox"
        name="mobile-nav-toggle"
        id="mobile-nav-toggle"
        hidden
        bind:checked={mobileVisible}
    />
    <h1><img src="favicon.png" alt="" /><span>Bookshelf Manager</span></h1>
    <label for="mobile-nav-toggle" class="mobile-nav-toggle">
        <span class="a" />
        <span class="b" />
        <span class="c" />
    </label>
    {#if mobileVisible}
        <nav class="mobile-nav">
            <ul>
                <a href="# "><li>About</li></a>
                <a href="# "><li>Tools</li></a>
                <a href="# "><li>Documentation</li></a>
                <a href="# "><li>Git Repository</li></a>
                <a href="# "><li>Report a bug</li></a>
                <a href="# "><li>Join us!</li></a>
                <a href="# "><li>Help us</li></a>
            </ul>
            <div class="dark-mode-button">
                <DarkModeSwitch></DarkModeSwitch>
            </div>
        </nav>
    {/if}
</div>

<style>
    #main-menu {
        display: flex;
        flex-direction: column;
        /* grid-area: menu; */
        /* justify-content: space-between; */
        min-height: 100vh;
        position: sticky;
        padding: 1rem;
        width: 20%;
    }
    h1 {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    h1,
    h2,
    h3 {
        margin: 1rem 0;
    }
    nav {
        padding: 1rem 0;
        border: 1px solid var(--divider-color);
        border-left: none;
        border-right: none;
        line-height: 2;
        background-color: var(--background-color-darker);
    }

    nav ul {
        list-style-type: none;
    }

    nav a {
        text-decoration: none;
    }
    nav a:hover {
        text-decoration: underline;
    }

    img.contributor {
        border-radius: 50%;
        width: 2em;
        height: 2em;
    }
    a.contributor {
        display: inline-block;
        margin-left: -0.2em;
    }

    .ad {
        flex-grow: 1;
        display: flex;
        align-items: center;
    }

    /* burger menu */
    #main-menu-mobile {
        display: none;
        width: 100%;
        position: sticky;
        top: 0;
        background-color: var(--background-color-darker);
        z-index: 100;
        height: 3em;
    }
    .mobile-nav-toggle {
        cursor: pointer;
        display: inline-block;
        position: absolute;
        top: 0.5em;
        right: 0.5em;
        z-index: 5;
    }
    .mobile-nav-toggle span {
        display: block;
        background-color: var(--text-color);
        width: 2em;
        height: 0.25em;
        transition:
            transform 0.2s,
            opacity 0.2s;
    }
    .a,
    .b {
        margin-bottom: 0.5em;
    }
    .mobile-nav {
        position: relative;
    }
    .dark-mode-button {
        position: absolute;
        bottom: 0;
        right: 0;
    }
    @media screen and (max-width: 1480px) {
        #main-menu {
            width: 300px;
        }
        h1 {
            font-size: 2vw;
        }

        h1 img {
            height: 3em;
            margin-right: 1em;
        }
        h2 {
            font-size: 1.5vw;
        }
        h3 {
            font-size: 1.2vw;
        }
    }

    @media screen and (max-width: 820px) {
        #main-menu {
            display: none;
        }
        #main-menu-mobile {
            display: block;
        }
        h1 {
            font-size: 1em;
            margin: 0.5em;
        }
        h1 img {
            height: 2em;
            margin: 0 1rem;
        }
    }
</style>
