<script context="module" lang="ts">
	export interface ICity {
		name: string;
	}
</script>

<script lang="ts">
	import { fireCollectionStore, fireDocumentStore } from '$lib';
	import { where } from 'firebase/firestore';
	import City from './_city.svelte';
	import { db } from './_fire';

	const collectionStore = fireCollectionStore<ICity>(db, 'cities', [
		where('name', '!=', 'Bielefeld')
	]);

	const documentStore = fireDocumentStore<ICity>(db, 'cities/CsgKkHquQzIyXoFZ7mkm');
</script>

<h1>svelteFireStore</h1>

<h2>fireCollectionStore</h2>

{#if $collectionStore}
	<ul>
		{#each $collectionStore.sort((a, b) => a.name
				.toLowerCase()
				.localeCompare(b.name.toLowerCase())) as city (city._id)}
			<City {city} on:delete={collectionStore.refresh} />
		{/each}
	</ul>
{:else}
	<p>...</p>
{/if}

<button on:click={collectionStore.refresh}>refresh</button>

<button
	on:click={async () => {
		const query = await fetch('https://random-data-api.com/api/address/random_address');
		const data = await query.json();
		collectionStore.insert({
			name: data.city
		});
	}}
>
	Insert
</button>

<h2>fireDocumentStore</h2>

{#if $documentStore}
	<div>{$documentStore.name} <i>({$documentStore._id})</i></div>
{:else}
	<p>...</p>
{/if}

<style>
	:global(*) {
		background-color: black;
		color: white;
		font: inherit;
		font-family: 'Inter', 'Helvetica Neue', sans-serif;
	}
</style>
