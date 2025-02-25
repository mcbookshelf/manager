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
        let url = import.meta.env.DEV ? "/testData/contributors.json" : "https://api.github.com/repos/Gunivers/Bookshelf/contributors";
        contributors = await (
            await fetch(url)
        ).json();
    }
</script>

<div id="main-menu">
    <a href="/" class="main-menu-image">
        <h1><img src="favicon.png" alt="" /><span>Bookshelf Manager</span></h1>
        <h3 class="light">
            Highly accessible multi-purpose Minecraft library datapack
        </h3>
    </a>
    <nav>
        <ul>
            <a target="_blank" href="https://docs.mcbookshelf.dev/en/latest/"><li><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-marked"><path d="M10 2v8l3-3 3 3V2"/><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/></svg>Documentation</li></a>
            <a target="_blank" href="https://github.com/mcbookshelf/Bookshelf"><li><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>Git Repository</li></a>
            <a target="_blank" href="https://github.com/mcbookshelf/Bookshelf/issues"><li><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bug"><path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2"/><path d="M3 21c0-2.1 1.7-3.9 3.8-4"/><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/><path d="M22 13h-4"/><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"/></svg>Report a bug</li></a>
            <a target="_blank" href="https://discord.gg/MkXytNjmBt"><li><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-headset"><path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"/><path d="M21 16v2a4 4 0 0 1-4 4h-5"/></svg>Discord</li></a>
            <a target="_blank" href="https://docs.mcbookshelf.dev/en/latest/contribute/index.html"><li><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-handshake"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"/><path d="m18 15-2-2"/><path d="m15 18-2-2"/></svg>Contribute</li></a>
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

    <aside class="ad">
        <h2>Sponsors</h2>
        Searching for a high performance hosting solution? Check out
        <a target="_blank" href="https://mtxserv.com/" title="mTxServ">
            <svg xmlns="http://www.w3.org/2000/svg" width="150px" height="43px" viewBox="0 0 150 43" enable-background="new 0 0 150 43">
                <image width="150" height="43" x="0" y="0" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAArCAQAAAAwXLnCAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZ
                cwAACxMAAAsTAQCanBgAAAAHdElNRQflBgQMEwzrPLa7AAAGsUlEQVRo3uWaX4xUVxnAf8PSggWF
                gYZaUUTWNq2tJnUCUWtCk059INo2TYaaqEETna2JMSZgZwNpDU2kuwS1iYE62wf1wdgsNbSxaRpm
                NWmfiNkNJgQr2N1Wi7ah6yygVIHCz4e5987cmTt/Vlkucb/vYe79zj3fPfd3vu+cc8+djHSRNfyd
                s90umh+yoEv5bv7MND9kadoNvSrETnqXWvYF9YgflPmunYt/5hmvFXeox12ZdmPT1s7Fh90fHA2q
                B12QdnOvXlgrvOhXorMn1IfTbm66ujBxIFvMffyee4EXIttW+nmck+RYxvc5lvZYm4okELzG31iT
                l2P2Zf4tsFddm3Yvp6FJS4dH2MjnOQ4ciNlP82POcC95smxLu5NTkRZ+/Z5zr7jeSy3x0xcsICY9
                lHYvp6Gtpl/6T68X8Zttqz3pOy5Ju+npw/q4lxzqWu1z6pbL0oCSnaQXD0VHnQyurzhk4crBetZT
                QVx10gVOedRM6rDyEaZGyc4VrPjSYQP3sZPprgPdJfawlwKj//OQuZ+J6LhAEbin57p5KgnWCWau
                zAD/nKdc3hPl9/imr7nosvZcqefUq2k9qqpWrDiu2sMgclnS8A51V89VB9RtKcLKR6hKDdaC664M
                rGejebAXXegxT7V5uVbNmbUU9PaoORGzDjmpVi0nPFQzrFILinVW1UpDaTe8WUtWrKqTls23eNe8
                WHJSzZuNfI43XBlG8HjddIu6e1akH1B/0BZWIQAVJkrOnNUmS7fIqgTYG8+rAeY6rGLbFuZaJoBy
                AqxyA7bRlmkiV4/guuO9/ssbZxmYE/7D69rAmrRqKejb2rQ+adVCzNINVmMkYSGGJteAoJK4YIh3
                TihDxmGVo5K8WGzpgnqnZEPHC5z2idnmsFvUTW1g2fAA4Q3rMVJrYjwVk8aseipmraqjLXEXyqRD
                Tf7CyC6ZjT10rglCIywiwGEMhrE2Wh+zPqbe3zOk9we/13ne77aB1Zj1ufB2keYTEih5gK+lXi0a
                q7E1VDaW6CGYsLRYf8hAh2Kx1QirbN584DuMtGqs47VYh3XXrGA957eCo9853AZWadaWZFhhKsZj
                tV6nOdWaI6JeJ5w/myeIeCsKsQgM61QlvutQ+4azqIcdhc+wi9VBnSVztgSsyRTDQB7Yz/6W0mH6
                GYjZixQhqAEwGnEIl7D5Jh8jsbP90aI2D+QiK/GvOxcA2M5gl28+q7ie9/IIAJkr8N1nJGj+WGLp
                DCNspr8BWA1Wtmf/zSv+EF6eOtixZlgAN/AwK1nf0fkdwAm+xDXAct4357BKwYMPdQAwxeYIV66L
                v6ku5aGfOqypeGSdBc4AX2MxsKmjszuBfSzlowAsmmNUeUrAAJBlqOOVE7GzMA43k2nS/i53nIhw
                luL4QlgXgEvAPYxxlAc6OtvEYV6hFuiyhMwcosoyCowwwjBQjI03FYoNsZZverQQXWkWCUnMAxSS
                YZ0Jfm9igqe5nVvbOlpLLviM8Q5wmqVzCqtMlhmGgWGmgvOa5MhTpso4FSqMU4lKajE1El03yRAF
                8uQpUY6QdpJ63Rr2EHwwVaxV+8W33e4aL7V5jUF8VL3N+9Vbxef9U8K+1uVaOhRiVxUSV+DNUn+h
                KSaWj7fUT3rKxhVc1MowstYAF4G/8gH+wkG+2maWW0iRQxxlMbVZ5BRZuv635L+ULGVgguHgvLZ0
                KAWpuC6xziADDfExkLC31W34D++VcBzCuiX4fY2NwBArGm7aKF9mNT8CbkJOASdYMWdpWEu5wRiK
                mcg+wGZGomF8hjEG6Y/Ahrj6GYw2GKcYY5jNPY1hdVhjDbNnEGK71ZvF76gbxENOJ2zPLnbKw2bs
                84jHRdymPW4X/h9oGFkXgWXA05xjD33sYCWPt/DeykfYiezkdn4OwCf4N6fnKLKuPgmo3R0NZDvU
                n7rYI+pnY2Q/5Flfd5G71AP2ieu94K/T7u8rp/XD5z3vg2LGRz3nac+rr8R22Z9RL1r1Xfe4UPyU
                b3tiPn3Irx8u8WV1pwvEG/26ez2iPhaVb1KP+ZQPuVrM+G3Pecz+tB8gHVh4rU+qB6PdKvykL3pb
                cPyUn47sa/yt+tJ8+3tbs+ELvumMRRcG533RflBf8JvxG57xoo9Flnmjrabl/kR91S2JX5xv8EX1
                D96ZdsOvDliId/uG+iszFtwg4iq/54fd5EmnfSiKu3mm7QqW+wt1n9O+63Zv9g31j+qrrkq7yelp
                psOL3RfZykmWsBGAI7zFIfbxVtorw/Qk0/UtuI8BFnGA19NuavryH2ddswKB0xn5AAAAJXRFWHRk
                YXRlOmNyZWF0ZQAyMDIxLTA2LTA0VDEyOjE5OjEyKzAzOjAw2xFbyAAAACV0RVh0ZGF0ZTptb2Rp
                ZnkAMjAyMS0wNi0wNFQxMjoxOToxMiswMzowMKpM43QAAAAASUVORK5CYII="></image>
            </svg>
        </a>
        <span>Thanks to them for hosting this project! ❤️</span>
    </aside>

    <footer>
        &copy;&nbsp;Gunivers {new Date().getFullYear()} - <a href="/mention-legale">Mentions légales</a>
    </footer>
</div>

<div id="main-menu-mobile">
    <div class="mobile-menu-wrapper">
        <input
            type="checkbox"
            name="mobile-nav-toggle"
            id="mobile-nav-toggle"
            hidden
            bind:checked={mobileVisible}
        />
        <a href="/" class="main-menu-image"><h1><img src="favicon.png" alt="" /><span>Bookshelf Manager</span></h1></a>
        <label for="mobile-nav-toggle" class="mobile-nav-toggle">
            <span class="a" />
            <span class="b" />
            <span class="c" />
        </label>
    </div>
    
    {#if mobileVisible}
        <nav class="mobile-nav">
            <ul>
                <a target="_blank" href="https://docs.mcbookshelf.dev/en/latest/"><li><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-marked"><path d="M10 2v8l3-3 3 3V2"/><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/></svg>Documentation</li></a>
                <a target="_blank" href="https://github.com/mcbookshelf/Bookshelf"><li><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>Git Repository</li></a>
                <a target="_blank" href="https://github.com/mcbookshelf/Bookshelf/issues"><li><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bug"><path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2"/><path d="M3 21c0-2.1 1.7-3.9 3.8-4"/><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/><path d="M22 13h-4"/><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"/></svg>Report a bug</li></a>
                <a target="_blank" href="https://discord.gg/MkXytNjmBt"><li><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-headset"><path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"/><path d="M21 16v2a4 4 0 0 1-4 4h-5"/></svg>Discord</li></a>
                <a target="_blank" href="https://docs.mcbookshelf.dev/en/latest/contribute/index.html"><li><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-handshake"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"/><path d="m18 15-2-2"/><path d="m15 18-2-2"/></svg>Contribute</li></a>
                <a href="/mention-legale">Mentions légales</a>
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
        padding: 1.5rem 2rem;
        width: 350px;
        flex-shrink: 0;
    }
    a.main-menu-image {
        text-decoration: none;
    }
    h1 {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        align-items: center;
        line-height: 1.2em;
        font-size: 1.5em;
        font-family: Unbounded;
        color: var(--title-color);
    }
    h1 img {
        width: 100px;
        filter: drop-shadow(0.15rem 0.35rem 0.15rem #00000033);
    }
    h1,
    h2,
    h3 {
        margin: 1rem 0;
    }
    h2 {
        font-size: 1.4em;
        font-weight: 300;
        font-family: Unbounded;
    }
    h3 {
        font-weight: 400;
        font-size: 1em;
        padding: 0 .5rem;
    }
    nav {
        padding: 1rem 0;
        border: 1px solid var(--divider-color);
        border-left: none;
        border-right: none;
        line-height: 2;
        background-color: var(--background-color-darker);
    }

    aside {
        padding: 0 .5rem;
        margin: 1rem 0;
    }

    nav ul {
        list-style-type: none;
        padding: 0 .5rem;
    }
    nav li {
        display: flex;
        align-items: center;
        gap: .5rem;
    }

    nav svg {
       height: 1em;
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
        margin: 0 0.2em;
    }

    .ad {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }
    .ad span {
        font-size: 0.8em;
    }


    .ad svg {
        margin: 1rem 0;
    }
    body:not(:has(#darkMode:checked)) .ad image {
        filter: invert(1);
    }

    /* burger menu */
    #main-menu-mobile {
        display: none;
        width: 100%;
        position: sticky;
        top: 0;
        background-color: var(--background-color-darker);
        z-index: 100;
    }

    .mobile-menu-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: .5rem;
        border-bottom: 1px solid #99999955;
    }
    .mobile-nav-toggle {
        cursor: pointer;
        padding: 1rem;
        z-index: 5;
    }
    .mobile-nav-toggle span {
        display: block;
        background-color: var(--text-color);
        width: 2em;
        height: 0.25em;
    }
    .a,
    .b {
        margin-bottom: 0.5em;
    }
    .mobile-nav {
        position: absolute;
        width: 100%;
    }
    .dark-mode-button {
        position: absolute;
        bottom: 0;
        right: 0;
    }
    @media screen and (max-width: 1480px) {
        #main-menu {
            width: 300px;
            padding: 1.5rem;
        }
        h1 img {
            height: 3em;
            width: auto;
        }
    }

    @media screen and (max-width: 1024px) {
        #main-menu {
            width: 270px;
            padding: 1.5rem .75rem;
        }
        h1 img {
            height: 3em;
        }
    }

    @media screen and (max-width: 820px) {
        #main-menu {
            display: none;
        }
        #main-menu-mobile {
            display: block;
        }
        nav {
            border: none;
            border-bottom: 1px solid #99999955;
            padding: 1rem;
        }
        h1 {
            font-size: 1.4em;
            letter-spacing: -0.02em;
            margin: 0rem 0.5rem;
            gap: 0.25rem;
        }
        h1 img {
            height: 2em;
            margin: 0 .5rem;
        }
    }
</style>
