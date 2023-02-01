<script>
// @ts-nocheck

    import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
    import { slide } from "svelte/transition";

    import app from '../../firestore';

    let email = '';
    let password = '';
    let user;
    let errorLoginMessage = false;
    const login = (evt) => {
        const auth = getAuth(app);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                if(errorLoginMessage) errorLoginMessage = false;
                user = userCredential.user;
            })
            .catch((error) => {
                errorLoginMessage = true;
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('errorCode ', errorCode);
                console.log('errorMessage ', errorMessage);
            });
    }

</script>

<form on:submit|preventDefault={login}>
    <h1>Login</h1>
    <!-- Email input -->
    <div class="form-outline mb-4">
        <label class="form-label" for="email">Email address:</label>
        <input type="email" id="email" placeholder="Email address" bind:value={email} class="form-control" />
    </div>
  
    <!-- Password input -->
    <div class="form-outline mb-4">
        <label class="form-label" for="pass">Password:</label>
        <input type="password" id="pass" placeholder="password" bind:value={password} class="form-control" />
    </div>
  
    <!-- Submit button -->
    <button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>
    
    {#if errorLoginMessage}
        <p transition:slide class="alert alert-danger">Something went wrong with the sign in. Please try again</p>
    {/if}
  </form>



  <style>
    form {
        background-color: white;
        padding: 40px 80px;
        border: 1px solid #dbdddf;
        border-radius: 1%;
        max-width: 700px;
        margin: auto;
    }
    button.btn {
        margin: auto;
        margin-top: 10px;
    }
    input.form-control {
        margin: auto;
    }
    label.form-label {
        margin-bottom: 0px;
        font-size: 13px;
        float: left;
        font-weight: 600;
    }
  </style>