# svelte-fire-store

Experimental Firestore Svelte Stores with Typescript Support.

Source code for stores can be found at [/src/lib/index.ts](/src/lib/index.ts).

Currently has two kinds of stores for collections and single documents.

## Collection Store Example

```svelte
<script>
	const collectionStore = fireCollectionStore<ICity>(db, 'cities', [where('name', '!=', 'Bielefeld')]);
</script>

{#if $collectionStore}
	<ul>
		{#each $collectionStore as city (city._id)}
			<City {city} on:delete={collectionStore.refresh} />
		{/each}
	</ul>
{:else}
	<p>...</p>
{/if}

<button on:click={collectionStore.refresh}>Refresh</button>

<button
	on:click={async () => {
		collectionStore.insert({
			name: getRandomCityName();
		});
	}}
>
	Insert
</button>

```

## Document Store Example

```svelte
<script>
	 const docStore = fireDocumentStore<ICity>(db, 'cities/' + city._id, initialCityData);
</script>

<input bind:value={$docStore.name} />

<button on:click={docStore.refresh}>Refresh</button>

<button
	on:click={() => {
      docStore.delete();
      dispatch('delete');
    }}
>
	Delete
</button>
```

## Features

- read
  - subscribe (collection and document)
  - refresh (collection and document)
- write
  - insert (only collection)
  - set & update (only document)
  - delete (only document)
- queryConstraints (only collection)
- skip read with initial data (only document)

Planned:

- set, update & delete for entries of collection
- realtime
- loading / stale data indicator
