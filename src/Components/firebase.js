import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
 
 //should enter your own configurations

const app = initializeApp({ 
    
});
const analytics = getAnalytics(app);
const auth = getAuth();
const storage = getStorage();

export {storage, auth};