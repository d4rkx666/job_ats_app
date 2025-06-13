import { cookies } from 'next/headers';
import { db, auth } from '@/services/firebase_admin';

export async function getAuth() {
   const session = cookies().get('session')?.value;

   if (!session) return { user: null };

   try {
      const decodedClaims = await auth.verifySessionCookie(session);
      const userDoc = await db.collection(process.env.NEXT_PUBLIC_DATABASE_USER).doc(decodedClaims.uid).get();

      return {
         user: userDoc.exists ? userDoc.data() : null,
      };
   } catch (error) {
      return { user: null };
   }
}

export async function getSysVar() {

   try {
      const sysDoc = await db.collection(process.env.NEXT_PUBLIC_DATABASE_SYSVAR).get();
      const systemData = sysDoc.docs.reduce((acc, doc) => {
         const collectionName = doc.id; 
         acc[collectionName] = doc.data();
         return acc;
      }, {});

      return {
         system: Object.keys(systemData).length > 0 ? systemData : null,
      };
   } catch (error) {
      console.error(error);
      return { system: null };
   }
}