<script>
    let email = '';
    let password = ''; 
    const login = () => {
        console.log(email);
        console.log(password);
    }
</script>

<form>
    <!-- Email input -->
    <div class="form-outline mb-4">
        <input type="email" id="form2Example1" placeholder="Email address" bind:value={email} class="form-control" />
    </div>
  
    <!-- Password input -->
    <div class="form-outline mb-4">
        <input type="password" id="form2Example2" placeholder="password" bind:value={password} class="form-control" />
    </div>
  
    <!-- Submit button -->
    <button type="button" on:click={login} class="btn btn-primary btn-block mb-4">Sign in</button>
  </form>



  <style>
    form {
        background-color: white;
        padding: 50px;
        border: 1px solid #dbdddf;
        border-radius: 1%;
    }
    button.btn {
        margin: auto;
        margin-top: 10px;
    }
    input.form-control {
        max-width: 550px;
        margin: auto;
    }
  </style>