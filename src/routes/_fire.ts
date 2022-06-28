import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIRE_APIKEY,
	authDomain: import.meta.env.VITE_FIRE_AUTHDOMAIN,
	databaseURL: import.meta.env.VITE_FIRE_DATABASEURL,
	projectId: import.meta.env.VITE_FIRE_PROJECTID,
	storageBucket: import.meta.env.VITE_FIRE_STORAGEBUCKET,
	messagingSenderId: import.meta.env.VITE_FIRE_MESSAGINGSENDERID,
	appId: import.meta.env.VITE_FIRE_APPID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
