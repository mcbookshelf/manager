<script lang="ts">
    import { selectedModules } from "$lib/stores";
    import { createEventDispatcher } from "svelte";

    export let module: ModuleData;
    export let required: boolean = false;
    export let recommended: boolean = false;

    const dispatch = createEventDispatcher();

    let checked: boolean = false;
    function toggle(_event: Event) {
        if((<HTMLInputElement>_event.target).checked) {
            selectedModules.update(sm => sm.add(module));
        } else {
            selectedModules.update(sm => {sm.delete(module); return sm});
        }
    }
</script>

<label class="module rounded" for={module.name} class:required>
    <input
        type="checkbox"
        name={module.name}
        id={module.name}
        class="module-selector"
        on:change={toggle}
    />
    {#if required}
        <div class="required overlay highlight">Required</div>
    {:else if recommended}
        <div class="recommended overlay highlight">Recommended</div>
    {/if}
    <img
        class="module-img rounded"
        src={module.icon ?? "icons/default.png"}
        alt="{module.display_name} Image"
    />
    <div class="module-body">
        {#if module.documentation}
            <a
                href={module.documentation}
                target="_blank"
                rel="noopener noreferrer"
                class="module-doc highlight"
            >
            <svg xmlns="http://www.w3.org/2000/svg" height="1.3em" viewBox="0 -960 960 960" width="1.3em" fill="#e8eaed"><path d="M300-80q-58 0-99-41t-41-99v-520q0-58 41-99t99-41h500v600q-25 0-42.5 17.5T740-220q0 25 17.5 42.5T800-160v80H300Zm-60-267q14-7 29-10t31-3h20v-440h-20q-25 0-42.5 17.5T240-740v393Zm160-13h320v-440H400v440Zm-160 13v-453 453Zm60 187h373q-6-14-9.5-28.5T660-220q0-16 3-31t10-29H300q-26 0-43 17.5T240-220q0 26 17 43t43 17Z"/></svg>
                Doc
            </a>
        {/if}
        <span class="module-title">{module.display_name}</span>
        <!-- <span class="module-features">{module.features?.join(", ") ?? ""}</span> -->
        <span class="module-description">{module.description}</span>
    </div>
</label>

<style>
    .module {
        --border-width: 4px;
        position: relative;
        outline: var(--border-width) solid transparent;
        background-color: var(--background-color-lighter);
        margin: 1rem;
        display: flex;
        flex-direction: column;
        width: 300px;
        height: 400px;
        filter: drop-shadow(0 0.5rem 0.1rem var(--background-color-darker));
        transition:
            filter 0.5s,
            color 0.5s,
            background-color 0.5s;
    }

    .module:has(input:checked),
    .module.required {
        outline-color: var(--highlight-color);
    }

    .module-selector {
        position: absolute;
        top: 5%;
        right: 5%;
    }

    .module-img {
        width: 100%;
        height: 37%;
        object-fit: cover;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    .module-body {
        display: flex;
        flex-direction: column;
        position: relative;
        padding: 1rem;
    }

    .module-title {
        font-weight: bold;
    }
    .module-features {
        font-size: 0.8em;
        font-weight: lighter;
    }
    .module-doc {
        position: absolute;
        top: 0;
        right: 0;
        border-bottom-left-radius: 0.375rem;
        padding: 0.25rem 0.5rem;
        text-decoration: none;
        display: flex;
        align-items: center;
    }

    .overlay {
        position: absolute;
        top: calc(-1 * var(--border-width));
        left: calc(-1 * var(--border-width));
        padding: 0.25em;
        border-top-left-radius: 0.375rem;
    }
    .recommended {
        filter: grayscale(1);
    }

    @media screen and (max-width: 1480px) {
        .module {
            max-width: 30%;
            margin: 1.5%;
        }
        .module-body {
            padding: 5%;
        }
    }

    @media screen and (max-width: 820px) {
        .module {
            font-size: max(2vw, 0.9em);
            max-width: 45%;
            margin: 2.5%;
        }
    }

</style>
