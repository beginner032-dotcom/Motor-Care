import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, where, onSnapshot, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { useAuth } from './useAuth';
import { FuelLog, ServiceLog, PartLog, Expense } from '../types';

export function useAppData() {
  const { user } = useAuth();
  const [fuelLogs, setFuelLogs] = useState<FuelLog[]>([]);
  const [serviceLogs, setServiceLogs] = useState<ServiceLog[]>([]);
  const [partLogs, setPartLogs] = useState<PartLog[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setFuelLogs([]);
      setServiceLogs([]);
      setPartLogs([]);
      setExpenses([]);
      setLoading(false);
      return;
    }

    const userId = user.uid;

    const qFuel = query(collection(db, 'fuel_logs'), where('userId', '==', userId));
    const unsubFuel = onSnapshot(qFuel, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as FuelLog);
      data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setFuelLogs(data);
    });

    const qService = query(collection(db, 'service_logs'), where('userId', '==', userId));
    const unsubService = onSnapshot(qService, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as ServiceLog);
      data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setServiceLogs(data);
    });

    const qPart = query(collection(db, 'part_logs'), where('userId', '==', userId));
    const unsubPart = onSnapshot(qPart, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as PartLog);
      data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setPartLogs(data);
    });

    const qExpense = query(collection(db, 'expenses'), where('userId', '==', userId));
    const unsubExpense = onSnapshot(qExpense, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as Expense);
      data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setExpenses(data);
      setLoading(false); // mark as loaded roughly
    });

    return () => {
      unsubFuel();
      unsubService();
      unsubPart();
      unsubExpense();
    };
  }, [user]);

  const addFuelLog = async (log: Omit<FuelLog, 'id'>) => {
    if (!user) return;
    const newId = Math.random().toString(36).substr(2, 9);
    const docRef = doc(db, 'fuel_logs', newId);
    await setDoc(docRef, { ...log, id: newId, userId: user.uid });

    const expRef = doc(db, 'expenses', newId + '_exp');
    await setDoc(expRef, { id: newId + '_exp', userId: user.uid, category: 'Bensin', amount: log.totalPrice, date: log.date });
  };

  const addServiceLog = async (log: Omit<ServiceLog, 'id'>) => {
    if (!user) return;
    const newId = Math.random().toString(36).substr(2, 9);
    const docRef = doc(db, 'service_logs', newId);
    await setDoc(docRef, { ...log, id: newId, userId: user.uid });

    const expRef = doc(db, 'expenses', newId + '_exp');
    await setDoc(expRef, { id: newId + '_exp', userId: user.uid, category: 'Servis', amount: log.cost, date: log.date });
  };

  const addPartLog = async (log: Omit<PartLog, 'id'>) => {
    if (!user) return;
    const newId = Math.random().toString(36).substr(2, 9);
    const docRef = doc(db, 'part_logs', newId);
    await setDoc(docRef, { ...log, id: newId, userId: user.uid });

    const expRef = doc(db, 'expenses', newId + '_exp');
    await setDoc(expRef, { id: newId + '_exp', userId: user.uid, category: 'Ganti Part', amount: log.price + log.installCost, date: log.date });
  };

  const addExpense = async (log: Omit<Expense, 'id'>) => {
    if (!user) return;
    const newId = Math.random().toString(36).substr(2, 9);
    const expRef = doc(db, 'expenses', newId);
    await setDoc(expRef, { ...log, id: newId, userId: user.uid });
  };

  const clearAllData = async () => {
    if (!user) return;
    const userId = user.uid;
    const collections = ['motors', 'fuel_logs', 'service_logs', 'part_logs', 'expenses'];
    
    for (const coll of collections) {
      const q = query(collection(db, coll), where('userId', '==', userId));
      const snapshot = await getDocs(q);
      for (const docSnapshot of snapshot.docs) {
        await deleteDoc(docSnapshot.ref);
      }
    }
  };

  return { fuelLogs, serviceLogs, partLogs, expenses, loading, addFuelLog, addServiceLog, addPartLog, addExpense, clearAllData };
}
