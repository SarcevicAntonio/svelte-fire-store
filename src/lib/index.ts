import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	QueryConstraint,
	setDoc,
	type DocumentData,
	type Firestore
} from 'firebase/firestore';
import { get, writable } from 'svelte/store';

export const fireDocumentStore = <T extends DocumentData>(
	db: Firestore,
	path: string,
	initial = null
) => {
	const { subscribe, set } = writable<(T & { _id: string }) | null>(initial);

	const docRef = doc(db, path);

	const refresh = async () => {
		const snap = await getDoc(docRef);
		set({ ...snap.data(), _id: snap.id } as T & { _id: string });
	};

	if (!initial) refresh();

	const delStoreDoc = async () => {
		await deleteDoc(docRef);
		set(null);
	};

	const setStore = async (newValue: T & { _id?: string }) => {
		let newDoc;
		if (newValue._id) {
			let _id;
			({ _id, ...newDoc } = newValue);
		} else {
			newDoc = newValue;
		}
		set({ ...newValue, _id: docRef.id });
		await setDoc(docRef, newDoc);
	};

	const updateStore = async (fn: (value: T & { _id: string }) => T & { _id: string }) =>
		setStore(fn(get({ subscribe }) as T & { _id: string }));

	return { subscribe, set: setStore, update: updateStore, delete: delStoreDoc, refresh };
};

export const fireCollectionStore = <T extends DocumentData>(
	db: Firestore,
	path: string,
	queryConstraints: QueryConstraint[] = []
) => {
	const { subscribe, set, update } = writable<(T & { _id: string })[] | null>(null);

	const colRef = collection(db, path);

	const refresh = async () => {
		const q = query(colRef, ...queryConstraints);
		const querySnapshot = await getDocs(q);
		const data: DocumentData[] = [];
		querySnapshot.forEach((snap) => {
			data.push({ ...snap.data(), _id: snap.id });
		});
		set(data as (T & { _id: string })[]);
	};

	refresh();

	const insert = async (newDocument: DocumentData) => {
		const docRef = await addDoc(colRef, newDocument);
		const snap = await getDoc(docRef);
		update(
			(rest) =>
				[...(rest as DocumentData[]), { ...snap.data(), _id: snap.id }] as (T & { _id: string })[]
		);
	};

	return { subscribe, refresh, insert };
};
