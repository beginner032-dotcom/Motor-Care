import { useState, useEffect } from 'react';
import { activeMotorId, setActiveMotorId } from '../mockData';
import { subscribeToMotors } from '../services/db';
import { MotorData } from '../types';
import { useAuth } from './useAuth';

export function useActiveMotor() {
  const { user } = useAuth();
  const [motors, setMotors] = useState<MotorData[]>([]);
  const [motor, setMotor] = useState<MotorData | null>(null);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToMotors(user.uid, (updatedMotors) => {
      setMotors(updatedMotors);
      if (updatedMotors.length > 0) {
        const active = updatedMotors.find(m => m.id === activeMotorId) || updatedMotors[0];
        setMotor({ ...active });
      } else {
        setMotor(null);
      }
    }, (error) => {
      console.error("Failed to fetch motors:", error);
    });

    return () => unsubscribe();
  }, [user]);

  const changeMotor = (id: string) => {
    setActiveMotorId(id);
    const active = motors.find(m => m.id === id) || motors[0];
    setMotor(active ? { ...active } : null);
    window.dispatchEvent(new Event('motorChanged'));
  };

  return { motor, mockMotors: motors, changeMotor };
}
