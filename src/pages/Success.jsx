import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

function Success() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState(null);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && sessionId) {
        setUser(user);
        await verifyPaymentAndUpdateSubscription(user, sessionId);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [sessionId]);

  const verifyPaymentAndUpdateSubscription = async (user, sessionId) => {
    try {
      // Verifica plata pe backend
      const response = await fetch(`http://localhost:3001/api/verify-payment/${sessionId}`);
      const paymentData = await response.json();

      if (paymentData.success) {
        // Actualizeaza abonamentul in Firestore
        const expiry = new Date();
        expiry.setMonth(expiry.getMonth() + 1);

        await updateDoc(doc(db, 'users', user.uid), {
          abonament: {
            tip: paymentData.planName,
            pret: parseInt(paymentData.planPrice),
            dataActivare: new Date().toISOString(),
            dataExpirare: expiry.toISOString(),
            status: 'activ',
            stripeSessionId: sessionId,
            beneficii: JSON.parse(paymentData.planFeatures),
            istoricPlati: [
              {
                data: new Date().toLocaleDateString('ro-RO'),
                suma: parseInt(paymentData.planPrice),
                descriere: `Plata ${paymentData.planName}`,
                status: 'Platit',
                stripeSessionId: sessionId
              }
            ]
          }
        });

        setSuccess(true);
      } else {
        setError('Plata nu a putut fi verificata');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      setError('Eroare la verificarea platii');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1F1F1F] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <h1 className="text-2xl font-bold">Se verifica plata...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1F1F1F] text-white flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <div className="text-6xl mb-6">❌</div>
          <h1 className="text-4xl font-bold text-red-400 mb-4">Eroare</h1>
          <p className="text-xl text-gray-300 mb-8">{error}</p>
          <Link to="/abonamente">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-green-700">
              Incearca din nou
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#1F1F1F] text-white flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-4xl font-bold text-green-400 mb-4">Plata Reusita!</h1>
          <p className="text-xl text-gray-300 mb-8">
            Abonamentul tau a fost activat cu succes. Poti incepe antrenamentele chiar acum!
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/cont">
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-green-700">
                Vezi Abonamentul
              </button>
            </Link>
            <Link to="/">
              <button className="bg-gray-600 text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-gray-700">
                Acasa
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default Success;