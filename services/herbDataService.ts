import { initializeApp } from 'firebase/app';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    updateDoc,
    where
} from 'firebase/firestore';

// Firebase configuration - share the same config with authService
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase if not already initialized
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  // App already initialized
}

const db = getFirestore(app);

// Herb interface
export interface Herb {
  id?: string;
  name: string;
  scientificName: string;
  category: string;
  description: string;
  benefits: string[];
  preparation: string;
  dosage: string;
  precautions: string;
  history: string;
  imageUrl?: string;
}

// Get all herbs
export const getAllHerbs = async (): Promise<Herb[]> => {
  try {
    const herbsCollection = collection(db, 'herbs');
    const herbSnapshot = await getDocs(herbsCollection);
    return herbSnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() } as Herb;
    });
  } catch (error) {
    console.error('Error getting herbs:', error);
    return [];
  }
};

// Get herb by ID
export const getHerbById = async (id: string): Promise<Herb | null> => {
  try {
    const herbDoc = doc(db, 'herbs', id);
    const docSnap = await getDoc(herbDoc);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Herb;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting herb:', error);
    return null;
  }
};

// Get herbs by category
export const getHerbsByCategory = async (category: string): Promise<Herb[]> => {
  try {
    const herbsCollection = collection(db, 'herbs');
    const q = query(herbsCollection, where('category', '==', category));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() } as Herb;
    });
  } catch (error) {
    console.error('Error getting herbs by category:', error);
    return [];
  }
};

// Search herbs
export const searchHerbs = async (searchTerm: string): Promise<Herb[]> => {
  // In a real app, you might want to use Firestore's full-text search capabilities or a third-party service
  try {
    const herbs = await getAllHerbs();
    return herbs.filter(herb => 
      herb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      herb.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      herb.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  } catch (error) {
    console.error('Error searching herbs:', error);
    return [];
  }
};

// Add a new herb
export const addHerb = async (herb: Omit<Herb, 'id'>): Promise<string | null> => {
  try {
    const herbsCollection = collection(db, 'herbs');
    const docRef = await addDoc(herbsCollection, herb);
    return docRef.id;
  } catch (error) {
    console.error('Error adding herb:', error);
    return null;
  }
};

// Update an existing herb
export const updateHerb = async (id: string, herb: Partial<Herb>): Promise<boolean> => {
  try {
    const herbDoc = doc(db, 'herbs', id);
    await updateDoc(herbDoc, herb);
    return true;
  } catch (error) {
    console.error('Error updating herb:', error);
    return false;
  }
};

// Delete a herb
export const deleteHerb = async (id: string): Promise<boolean> => {
  try {
    const herbDoc = doc(db, 'herbs', id);
    await deleteDoc(herbDoc);
    return true;
  } catch (error) {
    console.error('Error deleting herb:', error);
    return false;
  }
}; 