

This contains everything you need to run your app locally.


## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
## Razorpay Setup

### Environment Variables

Make sure your `.env` file contains valid Razorpay credentials:

```env
RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXXX
RAZORPAY_KEY_SECRET=your_actual_secret_key_here
VITE_RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXXX
```

### Testing Razorpay Integration

1. Start the development server: `npm run dev`
2. Visit `http://localhost:3000/api/test-razorpay` to test the connection
3. Add items to cart and try checkout

### Common Issues

- **401 Authentication Error**: Check your API keys in `.env`
- **Payment Popup Not Opening**: Ensure Razorpay script loads (check browser console)
- **Signature Verification Failed**: Backend secret key mismatch

### Getting Razorpay Keys

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Navigate to Settings → API Keys
3. Copy your Live/Test keys (use Test keys for development)
### Post-Payment Processing (Firebase & Email)

After a successful payment, the system automatically handles receipt generation, database storage, and email notifications via Firebase Cloud Functions.

#### 1. Firebase Integration Setup

Ensure your `firebase-config.js` is initialized and the following logic is implemented in your checkout handler:

```javascript
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const handlePaymentSuccess = async (response) => {
  try {
    // 1. Generate Receipt & Save to Firestore
    const receiptData = {
      orderId: response.razorpay_order_id,
      paymentId: response.razorpay_payment_id,
      amount: cartTotal,
      currency: "INR",
      status: "paid",
      customerEmail: user.email,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "receipts"), receiptData);
    console.log("Receipt generated with ID: ", docRef.id);

    // 2. Trigger Email Notification
    // This is handled via Firebase Extensions or a Cloud Function
    await triggerConfirmationEmail(receiptData);

  } catch (error) {
    console.error("Error processing post-payment:", error);
  }
};
```

#### 2. Automated Email via Firebase

To send emails, use the **"Trigger Email from Firestore"** extension or a Cloud Function:

**Cloud Function (`index.js`):**
