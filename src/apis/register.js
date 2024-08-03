export default async function register(name, email, password, role) {
    try {
        const response = await fetch('http://localhost:3000/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password,
                role
            })
        });

        // Check if the response is not OK (status code not in the range 200-299)
        if (!response.ok) {
            const errorData = await response.json();
            return {
                data: null,
                success: false,
                message: errorData.message || 'Registration failed'
            };
        }

        return await response.json();
    } catch (error) {
        // Handle different types of errors
        if (error instanceof Error) {
            console.error('Registration error:', error.message);
            return {
                data: null,
                success: false,
                message: error.message
            };
        } else {
            console.error('An unknown error occurred during registration:', error);
            return {
                data: null,
                success: false,
                message: 'An unknown error occurred'
            };
        }
    }
}
