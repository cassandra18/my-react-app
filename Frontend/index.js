$(document).ready(function() {
    $('.question-btn').click(function() {
      $(this).next('.answer').slideToggle();
      $(this).toggleClass('active');
    });


    $('a[href="#login"]').click(function(e) {
        e.preventDefault();
        toggleForm('login');
    });

    $('#loginForm').submit(function(e) {
        e.preventDefault();
        const email = $('#login-email').val();
        const password = $('#login-password').val();
        const data = { email, password };

        fetch('https://my-react-app-v8ai.onrender.com/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json();
        })
        .then(data => {
            if (data.token) {
                console.log('Login successful:', data);
                localStorage.setItem('authToken', data.token);
                window.location.href = './dashboard.html';
            } else {
                console.error('Login failed:', data.message);
                alert('Login failed: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Login failed: Please try again later');
        });
    });

    $('#signupForm').submit(function(e) {
        e.preventDefault();
        const username = $('#username').val();
        const email = $('#signup-email').val();
        const password = $('#signup-password').val();
        console.log('Email:', email); // Debug statement to check email
        console.log('Password:', password); // Debug statement to check password
    
        const data = { username, email, password };

        fetch('https://my-react-app-v8ai.onrender.com/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Registration failed');
            }
            else {
                console.log('Registration successful:', response);
                alert('Thank you for signing up');
                window.location.href = './dashboard.html';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Registration failed: Please try again later');
        });
    });

     // Function to handle logout
     function handleLogout() {
        // Debugging: Check if handleLogout is called
        console.log("Logout button clicked");

        // Remove authToken from localStorage
        localStorage.removeItem('authToken');
        // Redirect to login page
        window.location.href = './index.html'; // Adjust path as needed
    }

    // Event listener for logout button click
    $('#logoutBtn').click(function(e) {
        e.preventDefault();
        handleLogout();
    });
});

  