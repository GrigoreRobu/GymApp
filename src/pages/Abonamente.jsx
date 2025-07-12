import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { auth, db } from '../../firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const stripePromise = loadStripe('pk_test_your_stripe_public_key_here');

function Abonamente() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const plans = [
    {
      id: 'simplu',
      name: 'Abonament Simplu',
      price: 100,
      priceId: 'price_stripe_id_simplu',
      features: [
        'Acces sala (cardio + greutati)',
        'Fara acces la fitness',
        'Fara acces la sauna',
        'Orar: 08:00-16:00'
      ]
    },
    {
      id: 'vip',
      name: 'Abonament VIP',
      price: 150,
      priceId: 'price_stripe_id_vip',
      features: [
        'Acces complet sala',
        'Clase fitness + yoga',
        'Acces la sauna',
        'Orar: 04:00-23:00'
      ]
    },
    {
      id: 'premium',
      name: 'Abonament Premium',
      price: 200,
      priceId: 'price_stripe_id_premium',
      features: [
        'Acces complet sala',
        'Clase fitness + yoga',
        'Acces sauna & dusuri premium',
        'Orar: 24/7'
      ]
    }
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSelectPlan = async (plan) => {
    if (!user) {
      setError('Trebuie sa te conectezi pentru a cumpara un abonament');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const stripe = await stripePromise;
      
      const response = await fetch('http://localhost:3001/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: plan.priceId,
          userId: user.uid,
          userEmail: user.email,
          planName: plan.name,
          planPrice: plan.price,
          planFeatures: plan.features
        }),
      });

      const { sessionId } = await response.json();

      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        console.error('Stripe error:', error);
        setError('Eroare la redirectionarea catre plata');
      }
    } catch (error) {
      console.error('Eroare la crearea sesiunii de plata:', error);
      setError('Eroare la procesarea platii. Incearca din nou.');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#1F1F1F] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-green-600 mb-4">
            Abonamente
          </h1>
          <p className="text-xl text-gray-300">
            Alege abonamentul potrivit pentru obiectivele tale
          </p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded mb-6 max-w-2xl mx-auto">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-[#3A3A3A] border-2 border-gray-600 hover:border-gray-400 rounded-lg flex flex-col h-full p-6 transition-all duration-300 hover:scale-105"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4 text-green-500">{plan.name}</h2>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400 text-lg"> RON / luna</span>
                </div>
              </div>

              <div className="flex-grow mb-8">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-green-400 mr-3">✓</span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleSelectPlan(plan)}
                disabled={loading}
                className="w-full py-3 px-6 rounded-lg font-bold text-lg transition-colors bg-gray-600 hover:bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Se proceseaza...' : 'Alege Planul'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Abonamente;