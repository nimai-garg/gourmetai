import React, { useState } from 'react';
import { db } from '../firebaseConfig'; // Adjust the path as needed
import { doc, setDoc, getDoc } from 'firebase/firestore';

const SubscribeForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = doc(db, "newsletter", "users");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                await setDoc(docRef, {
                    emails: [...(docSnap.data().emails || []), email]
                }, { merge: true });
            } else {
                await setDoc(docRef, {
                    emails: [email]
                });
            }

            setMessage('Subscription successful!');
            setEmail('');
        } catch (error) {
            console.error("Error during subscription:", error);
            setMessage(`Subscription failed: ${error.message}`);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />
                <button type="submit">Subscribe</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SubscribeForm;