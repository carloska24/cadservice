
const API_URL = 'http://localhost:8080/api';

async function main() {
  console.log('Checking login...');
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@cadservice.com', password: 'admin123' }),
    });

    if (res.ok) {
        console.log('Login successful!');
        const data = await res.json();
        console.log('Token received.');
        process.exit(0);
    } else {
        console.log('Login failed:', res.status, res.statusText);
        process.exit(1);
    }
  } catch (error) {
    console.error('Network error:', error.message);
    process.exit(1);
  }
}

main();
