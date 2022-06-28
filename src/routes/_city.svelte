<script lang="ts">
	import { fireDocumentStore } from '$lib';
	import { createEventDispatcher } from 'svelte';
	import type { ICity } from './index.svelte';
	import { db } from './_fire';
	const dispatch = createEventDispatcher();

	export let city;

	let edit = false;
	const store = fireDocumentStore<ICity>(db, 'cities/' + city._id, city);

	let input: HTMLInputElement;
</script>

{#if $store}
	<li>
		{#if !edit}
			{$store.name} <i>({$store._id})</i>
		{:else}
			<input bind:value={$store.name} bind:this={input} />
		{/if}
		<button on:click={() => (edit = !edit)}>✏️</button>
		<button
			on:click={() => {
				store.delete();
				dispatch('delete');
			}}
		>
			x
		</button>

		<button on:click={() => store.update((value) => ({ ...value, name: 'saas' }))}>sassify</button>
	</li>
{/if}
