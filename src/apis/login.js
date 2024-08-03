export default async function login(email, password, role){
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, role }),
        });

        const data = await response.json();
        return data; // assuming the response format is { data: { token, user } }

    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}
