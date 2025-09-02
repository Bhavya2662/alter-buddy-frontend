// Check if mentor is authenticated by examining localStorage
console.log('Checking mentor authentication...');
console.log('MENTOR_TOKEN:', localStorage.getItem('MENTOR_TOKEN') || 'Not found');
console.log('USER_TOKEN:', localStorage.getItem('USER_TOKEN') || 'Not found');

// If no mentor token, we need to login first
if (!localStorage.getItem('MENTOR_TOKEN')) {
    console.log('\n❌ No mentor token found. You need to login as a mentor first.');
    console.log('Please visit: http://localhost:3010/mentor/login');
    console.log('Use credentials: username=testmentor, password=password123');
} else {
    console.log('\n✅ Mentor token found. Authentication should work.');
}