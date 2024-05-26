<script lang="ts">
    import MainMenu from "$lib/comp/MainMenu.svelte";
    import Content from "$lib/comp/Content.svelte";
</script>

<input type="checkbox" name="darkMode" id="darkMode" hidden>
<main>
    <MainMenu></MainMenu>
    <Content></Content>
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
</style>