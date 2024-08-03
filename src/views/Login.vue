<script setup lang="ts">
import login from "../apis/login.js";
import {ref} from "vue";
import {useRouter} from "vue-router";

const email = ref('')
const password = ref('')
const role = 'customer'
const router = useRouter()

async function handleClick(){
    if (email.value === '' || password.value === '') {
        alert('Please fill in all fields');
    } else {
        // Fetch users data
        const response = await login(email.value, password.value, role);
        if (response.message === 'success') {
            await router.push({ path: '/dashboard' });
        } else {
            alert('Login failed');
        }
    }
}
</script>


<template>
    <form action="">
        <h1>Login</h1>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" v-model="email"><br><br>
        <label for="password">Password: </label>
        <input type="password" id="password" name="password" v-model="password"><br><br>
        <a href="/register">Register</a>
        <br>
        <button @click="handleClick">Submit</button>
    </form>
</template>

<style scoped>

</style>