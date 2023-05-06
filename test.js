setInterval(() => {
    var requestOptions = {
        method: 'POST',
        redirect: 'follow',
        body: JSON.stringify({ "name": "test", "email": `test+${Date.now()}@gmail.com`, "password": "U2FsdGVkX1+vFFMk2SMUA3HZNBsvc4S/habaNk4xZtE=" }),
        headers: { "Content-Type": "application/json" }
    };

    fetch("https://app.zbrain.ai:3001/sign-up", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}, 1000)