# svelte-fire-store

Experimental Firestore Svelte Stores with Typescript Support.

Source code for stores can be found at [/src/lib/index.ts](/src/lib/index.ts).

Currently has two kinds of stores for collections and single documents.

Features:

- read
  - subscribe (collection and document)
  - refresh (collection and document)
- write
  - set & update (only document)
  - insert (only collection)
  - delete (only document)

Planned:

- set, update & delete for entries of collection
- realtime
- loading / stale data indicator
