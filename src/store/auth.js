import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const role = ref('customer')
    const isAuthenticated = ref(false)
    const token = ref('')
    const userId = ref(null)
    const router = useRouter()

    const register = async () => {
        const payload = {
            name: name.value,
            email: email.value,
            password: password.value,
            role: role.value,
        }

        try {
            const response = await axios.post('http://localhost:3000/user/register', payload)
            console.log('Registration successful:', response.data)
            await router.push('/login')
        } catch (error) {
            console.error('Registration failed:', error)
        }
    }

    const login = async () => {
        const payload = {
            email: email.value,
            password: password.value,
        }

        try {
            const response = await axios.post('http://localhost:3000/user/login', payload)
            const data = response.data.data
            name.value = data.user.name
            email.value = data.user.email
            role.value = data.user.role
            userId.value = data.user.id
            token.value = data.token
            isAuthenticated.value = true
            console.log('Login successful:', response.data.message)
            await router.push('/dashboard')
        } catch (error) {
            console.error('Login failed:', error)
        }
    }

    const logout = () => {
        name.value = ''
        email.value = ''
        password.value = ''
        role.value = 'customer'
        token.value = ''
        isAuthenticated.value = false
        userId.value = null
        router.push('/login')
    }

    return { name, email, password, role, isAuthenticated, token, userId, register, login, logout }
})