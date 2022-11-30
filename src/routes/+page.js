// @ts-nocheck
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { browser } from '$app/environment';
import { goto } from '$app/navigation';

import app from '../firestore';
