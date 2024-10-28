const username = document.getElementById('username');
const password = document.getElementById('password');
const form = document.getElementById('form');
const errorElement = document.getElementById('error');

// AWS configuration
AWS.config.region = 'us-east-1'; // your AWS region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1_a5XoTNUGa/app-integration?region=us-east-1', // your Identity Pool ID
});

// User pool configuration
const poolData = {
    UserPoolId: 'us-east-1_a5XoTNUGa', // your Cognito User Pool ID
    ClientId: '2jrif93pivt9q3kad1t0qqmtip', // your client ID
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

form.addEventListener('submit', (e) => {
    let messages = [];
    if (username.value === '' || username.value == null){
        messages.push('Username is required');
    }

    if(password.value.length <= 6){
        messages.push('Password must be longer than 6 characters');
    }

    if(password.value.length >= 20){
        messages.push('Password must be less than 20 characters');
    }

    if(messages.length > 0){
        e.preventDefault();
        errorElement.innerText = messages.join(', ');
    } else {
        e.preventDefault();
        // if no error, then authenticate with Amazon Cognito
        const authenticationData = {
            Username: username.value,
            Password: password.value,
        };
        const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

        const userData = {
            Username: username.value,
            Pool: userPool,
        };
        const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function(result) {
                console.log('Login successful!');
                // here you can redirect user to another page or whatever you want to do
            },
            onFailure: function(err) {
                errorElement.innerText = err.message;
                console.error(err);
            },
        });
    }
});
