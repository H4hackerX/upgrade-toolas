// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Modal elements
    const signupModal = document.getElementById('signupModal');
    const loginModal = document.getElementById('loginModal');
    const signupBtn = document.querySelector('.signup-btn');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const showLogin = document.getElementById('showLogin');
    const showSignup = document.getElementById('showSignup');
    
    // Form elements
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
  
    // Open signup modal when signup button is clicked
    if (signupBtn) {
      signupBtn.addEventListener('click', function(e) {
        e.preventDefault();
        signupModal.style.display = 'block';
      });
    }
  
    // Close modal when X is clicked
    closeModalBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        signupModal.style.display = 'none';
        loginModal.style.display = 'none';
      });
    });
  
    // Switch to login modal
    if (showLogin) {
      showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        signupModal.style.display = 'none';
        loginModal.style.display = 'block';
      });
    }
  
    // Switch to signup modal
    if (showSignup) {
      showSignup.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'none';
        signupModal.style.display = 'block';
      });
    }
  
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
      if (e.target === signupModal) {
        signupModal.style.display = 'none';
      }
      if (e.target === loginModal) {
        loginModal.style.display = 'none';
      }
    });
  
    // Signup form submission
    if (signupForm) {
      signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Simple validation
        if (password !== confirmPassword) {
          showError('confirmPassword', 'Passwords do not match');
          return;
        }
        
        if (password.length < 8) {
          showError('password', 'Password must be at least 8 characters');
          return;
        }
        
        // Show loading state
        const submitBtn = signupForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Signing Up...';
        submitBtn.disabled = true;
        
        try {
          // In a real app, you would send this to your backend
          const response = await mockSignupAPI({ name, email, password });
          
          // Show success message
          document.querySelector('.success-message').style.display = 'block';
          document.querySelector('.success-message').textContent = 'Account created successfully!';
          
          // Reset form
          signupForm.reset();
          
          // Close modal after 2 seconds
          setTimeout(() => {
            signupModal.style.display = 'none';
            document.querySelector('.success-message').style.display = 'none';
            
            // Update UI to show user is logged in
            updateUserUI(response.user);
          }, 2000);
        } catch (error) {
          showError('email', error.message);
        } finally {
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
        }
        document.getElementById('signupBtn').addEventListener('click', function() {
          try {
            window.location.href = 'login.html';
          } catch (error) {
            console.error('Redirect failed:', error);
            // Fallback action if redirect fails
            alert('Could not redirect to login page');
          }
        });
      });
    }
  
    // Login form submission
    if (loginForm) {
      loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Show loading state
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Logging In...';
        submitBtn.disabled = true;
        
        try {
          // In a real app, you would send this to your backend
          const response = await mockLoginAPI({ email, password });
          
          // Close modal
          loginModal.style.display = 'none';
          
          // Update UI to show user is logged in
          updateUserUI(response.user);
        } catch (error) {
          showError('loginPassword', error.message);
        } finally {
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
        }
      });
    }
  
    document.getElementById('menubarToggle').addEventListener('click', function(e) {
      e.stopPropagation();
      this.parentElement.classList.toggle('active');
    });
    
    // Close when clicking outside
    document.addEventListener('click', function() {
      const menu = document.querySelector('.menu-container');
      menu.classList.remove('active');
    });
    
    // Prevent dropdown from closing when clicking inside
    document.querySelector('.menubar-dropdown').addEventListener('click', function(e) {
      e.stopPropagation();
    });
    document.addEventListener('DOMContentLoaded', function() {
      const signupBtn = document.querySelector('.signup-btn');
      const accountBtn = document.querySelector('.account-btn');
      
      signupBtn.addEventListener('click', function() {
          // Handle sign up
          console.log('Sign up clicked');
      });
      
      accountBtn.addEventListener('click', function() {
          // Handle account
          console.log('Account clicked');
      });
  });
    
    // Helper function to show error messages
    function showError(fieldId, message) {
      const field = document.getElementById(fieldId);
      const errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      errorElement.textContent = message;
      
      // Remove existing error if any
      const existingError = field.parentNode.querySelector('.error-message');
      if (existingError) {
        existingError.remove();
      }
      
      field.parentNode.appendChild(errorElement);
      errorElement.style.display = 'block';
    }
  
    // Mock API functions (replace with real API calls)
    function mockSignupAPI(userData) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate email already in use
          if (userData.email === 'existing@example.com') {
            reject(new Error('Email already in use'));
          } else {
            resolve({
              success: true,
              user: {
                name: userData.name,
                email: userData.email,
                token: 'mock-jwt-token'
              }
            });
          }
        }, 1000);
      });
    }
  
    function mockLoginAPI(credentials) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate invalid credentials
          if (credentials.password.length < 8) {
            reject(new Error('Invalid email or password'));
          } else {
            resolve({
              success: true,
              user: {
                name: 'Mock User',
                email: credentials.email,
                token: 'mock-jwt-token'
              }
            });
          }
        }, 1000);
      });
    }
  
    // Update UI after login/signup
    function updateUserUI(user) {
      const userMenu = document.querySelector('.user-menu');
      const userIcon = userMenu.querySelector('.user-icon');
      
      // Change icon to show logged in state
      userIcon.classList.remove('fa-user-circle');
      userIcon.classList.add('fa-user');
      
      // Update dropdown with user info
      const userDropdown = userMenu.querySelector('.user-dropdown');
      const welcomeItem = document.createElement('div');
      welcomeItem.className = 'user-welcome';
      welcomeItem.textContent = `Hi, ${user.name.split(' ')[0]}!`;
      welcomeItem.style.padding = '10px 20px';
      welcomeItem.style.fontWeight = '600';
      
      // Insert welcome message at top
      userDropdown.insertBefore(welcomeItem, userDropdown.firstChild);
      
      // Change signup button to logout
      const signupBtn = document.querySelector('.signup-btn');
      signupBtn.textContent = 'Log Out';
      signupBtn.removeEventListener('click', openSignupModal);
      signupBtn.addEventListener('click', logoutUser);
    }
  
    // Logout function
    function logoutUser() {
      // Reset UI
      const userMenu = document.querySelector('.user-menu');
      const userIcon = userMenu.querySelector('.user-icon');
      userIcon.classList.remove('fa-user');
      userIcon.classList.add('fa-user-circle');
      
      // Remove welcome message
      const welcomeItem = document.querySelector('.user-welcome');
      if (welcomeItem) {
        welcomeItem.remove();
      }
      
      // Reset signup button
      const signupBtn = document.querySelector('.signup-btn');
      signupBtn.textContent = 'Sign Up';
      signupBtn.removeEventListener('click', logoutUser);
      signupBtn.addEventListener('click', function(e) {
        e.preventDefault();
        signupModal.style.display = 'block';
      });
      
      // In a real app, you would also clear the JWT token from storage
    }
  
    // Original function to open signup modal
    function openSignupModal(e) {
      e.preventDefault();
      signupModal.style.display = 'block';
    }
    
  });