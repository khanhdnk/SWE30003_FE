<script setup>
import { ref } from 'vue';
import register from "@/apis/register.js";

const email = ref('');
const password = ref('');
const role = ref('customer');



const handleRegister = async () => {
    try {
        const data = await register(email.value, password.value, role.value);
        console.log('Registration successful:', data);
        // Handle successful registration, e.g., redirect user to login page
    } catch (error) {
        console.error('Registration failed:', error.message);
        // Handle registration failure, e.g., show error message to the user
    }
};
</script>

<template>
    <form @submit="handleSubmit">
        <h1>Register</h1>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" v-model="email" required><br><br>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" v-model="password" required><br><br>

        <label for="role">Role:</label>
        <select name="role" id="role" v-model="role" required>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
        </select><br><br>


        <button  @click="handleRegister">Submit</button><br><br>
        <router-link to="/login"  >Login</router-link>
    </form>
</template>

<style scoped>
/* Add your styles here */
</style>
