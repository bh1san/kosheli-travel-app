
// src/services/firestore.ts
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc, setDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import type { Activity, Promotion, TeamMember } from '@/types';

// Generic function to fetch a collection
export async function getData<T>(collectionName: string): Promise<T[]> {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
  } catch (error) {
    console.error(`Error fetching ${collectionName}:`, error);
    return [];
  }
}

// Generic function to save a collection (used for initial seeding)
export async function saveData<T extends { id: string }>(collectionName: string, data: T[]) {
  try {
    const batch = writeBatch(db);
    data.forEach((item) => {
      const docRef = doc(db, collectionName, item.id);
      batch.set(docRef, item);
    });
    await batch.commit();
  } catch (error) {
    console.error(`Error saving ${collectionName}:`, error);
  }
}

// Function to fetch a single document
export async function getDocData(collectionName: string, docId: string) {
    try {
        const docRef = doc(db, collectionName, docId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }
    } catch (error) {
        console.error(`Error fetching document ${docId} from ${collectionName}:`, error);
        return null;
    }
}

// Function to save a single document
export async function saveDocData(collectionName: string, docId: string, data: any) {
    try {
        const docRef = doc(db, collectionName, docId);
        // Use merge: true to avoid overwriting the entire document
        // This is especially important for updating arrays with arrayUnion/arrayRemove
        await setDoc(docRef, data, { merge: true });
    } catch (error) {
        console.error(`Error saving document ${docId} in ${collectionName}:`, error);
    }
}


// Specific create/update/delete functions
export async function saveActivity(activity: Activity) {
  const docRef = doc(db, 'activities', activity.id);
  await setDoc(docRef, activity);
}

export async function deleteActivity(id: string) {
  const docRef = doc(db, 'activities', id);
  await deleteDoc(docRef);
}

export async function savePromotion(promotion: Promotion) {
    const docRef = doc(db, 'promotions', promotion.id);
    await setDoc(docRef, promotion);
}

export async function deletePromotion(id: string) {
    const docRef = doc(db, 'promotions', id);
    await deleteDoc(docRef);
}

export async function saveTeamMember(member: TeamMember) {
    const docRef = doc(db, 'team', member.id);
    await setDoc(docRef, member);
}

export async function deleteTeamMember(id: string) {
    const docRef = doc(db, 'team', id);
    await deleteDoc(docRef);
}
