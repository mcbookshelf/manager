<script lang="ts">
    import DarkModeSwitch from "./DarkModeSwitch.svelte";
    import VersionSelector from "./VersionSelector.svelte";
</script>

<div id="content">
    <div class="hide-when-small">
        <DarkModeSwitch></DarkModeSwitch>
    </div>
    <VersionSelector></VersionSelector>
</div>

<style>
    #content {
        flex-grow: 1;
        margin: 0 5vw;
    }
    @media screen and (max-width: 1480px){
        #content {
            margin: 0 1vw;
        }

    }
    @media screen and (max-width: 820px){
        .hide-when-small {
            display: none;
        }
        #content {
            margin: 0;
        }
    }
</style>