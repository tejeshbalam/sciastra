// This file contains shared JavaScript functions for interactivity and common tasks across multiple pages.

// Function to handle form validation (e.g., login, signup)
function validateForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input');
    let valid = true;

    inputs.forEach(input => {
        if (input.type !== 'submit' && input.value.trim() === '') {
            input.classList.add('error');
            valid = false;
        } else {
            input.classList.remove('error');
        }
    });

    return valid;
}

// Function to display a modal
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
}

// Function to close the modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}

// Function to toggle mobile menu visibility
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('active');
}

// Function to handle logout
function logout() {
    fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Logout successful') {
                window.location.href = '/login.html';
            } else {
                alert('Logout failed. Please try again.');
            }
        })
        .catch(error => console.error('Error logging out:', error));
}

// Event listener for mobile menu toggle
document.getElementById('menu-toggle-btn').addEventListener('click', toggleMobileMenu);

// Event listener for form validation on submit
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        if (!validateForm(form.id)) {
            e.preventDefault();
            alert('Please fill all fields correctly.');
        }
    });
});

// Event listener for opening and closing modals
document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-modal-id');
        showModal(modalId);
    });
});

document.querySelectorAll('.close-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-modal-id');
        closeModal(modalId);
    });
});
