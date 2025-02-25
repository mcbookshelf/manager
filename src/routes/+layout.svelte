<script lang="ts">
    import MainMenu from "$lib/comp/MainMenu.svelte";
    import DarkModeSwitch from "$lib/comp/DarkModeSwitch.svelte";
</script>

<input type="checkbox" name="darkMode" id="darkMode" hidden>
<main>
    <MainMenu></MainMenu>
    <div id="content">
        <div class="hide-when-small">
            <DarkModeSwitch></DarkModeSwitch>
        </div>
        <slot />
    </div>
</main>

<style>
    main {
        display: flex;
        /* grid-template-areas: 
        "menu dark"   
        "menu content"; */
        /* grid-template-columns: 20% 1fr;
        grid-template-rows: auto 1fr; */
        flex-direction: row;
    }
    @media screen and (max-width: 820px){
        main {
            flex-direction: column;
        }
    }

    #content {
        flex-grow: 1;
        margin: 0 2.5rem 1.5rem;
        display: flex;
        flex-direction: column;
    }
    @media screen and (max-width: 1480px) {
        #content {
            margin: 0 1.5rem 1.5rem;
        }
    }
    @media screen and (max-width: 1024px) {
        #content {
            margin: 0 1rem 1rem;
        }
    }
    @media screen and (max-width: 820px) {
        .hide-when-small {
            display: none;
        }
        #content {
            margin: 0;
        }
    }
</style>