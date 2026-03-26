<script>
    import { goto } from "$app/navigation";
    export let data;
</script>

<h2>📁 Folders</h2>
<ul>
    {#each data.folders as folder}
        <li>
            <button on:click={() => goto(`/demos/${folder}`)}>
                📂 ${folder}
            </button>
        </li>
    {/each}
</ul>
