import { db } from '../lib/firebase';
import { collection, getDocs, doc, setDoc, onSnapshot, query, where, addDoc } from 'firebase/firestore';
import { MotorData } from '../types';
import { mockMotors } from '../mockData';

export const MOTOR_COLLECTION = 'motors';

export async function addMotorToFirebase(userId: string, data: Omit<MotorData, 'id' | 'userId'>) {
  const newId = Math.random().toString(36).substr(2, 9);
  const motorRef = doc(db, MOTOR_COLLECTION, newId);
  await setDoc(motorRef, { ...data, id: newId, userId });
}

// Fetch all motors from Firestore once
export async function fetchMotorsFromFirebase(userId: string): Promise<MotorData[]> {
  const q = query(collection(db, MOTOR_COLLECTION), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const motors: MotorData[] = [];
  querySnapshot.forEach((doc) => {
    motors.push(doc.data() as MotorData);
  });
  return motors;
}

// Sync local mock data to Firestore
export async function syncMockDataToFirebase(userId: string) {
  // Only sync if user has no motors
  const q = query(collection(db, MOTOR_COLLECTION), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    return; // Already has data
  }

  for (const motor of mockMotors) {
    const motorWithUser = { ...motor, userId, id: `${userId}_${motor.id}` };
    const motorRef = doc(db, MOTOR_COLLECTION, motorWithUser.id);
    await setDoc(motorRef, motorWithUser, { merge: true });
  }
}

// Listen to changes in real-time
export function subscribeToMotors(userId: string, callback: (motors: MotorData[]) => void, onError?: (error: any) => void) {
  const q = query(collection(db, MOTOR_COLLECTION), where("userId", "==", userId));
  return onSnapshot(q, (snapshot) => {
    const motors: MotorData[] = [];
    snapshot.forEach((doc) => {
      motors.push(doc.data() as MotorData);
    });
    callback(motors);
  }, (error) => {
    console.error('Firestore Error:', error);
    if (onError) onError(error);
  });
}
