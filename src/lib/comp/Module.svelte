<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let module: ModuleData;
    export let required: boolean = false;
    export let recommended: boolean = false;

    const dispatch = createEventDispatcher();

    let checked: boolean = false;
    function toggle(_event: Event) {
        dispatch("toggle", {
            module,
            selected: (<HTMLInputElement>_event.target).checked,
        });
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
        class="module-img"
        src={module.icon ?? "default.png"}
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
                Doc
            </a>
        {/if}
        <span class="module-title">{module.display_name}</span>
        <span class="module-features">{module.features?.join(", ") ?? ""}</span>
        <span class="module-description">{module.description}</span>
    </div>
</label>

<style>
    .module {
        --border-width: 4px;
        position: relative;
        border: var(--border-width) solid transparent;
        background-color: var(--background-color-lighter);
        margin: 1rem;
        width: 300px;
        height: 200px;
        filter: drop-shadow(0 0.5rem 0.1rem var(--background-color-darker));
        transition:
            filter 0.5s,
            color 0.5s,
            background-color 0.5s;
    }

    .module:has(input:checked),
    .module.required {
        border-color: var(--highlight-color);
    }

    .module-selector {
        position: absolute;
        top: 5%;
        right: 5%;
    }

    .module-img {
        width: 100%;
        height: 40%;
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
        right: calc(-1 * var(--border-width));
        border-bottom-left-radius: 0.375rem;
        padding: 0.25rem 1rem;
        text-decoration: none;
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
