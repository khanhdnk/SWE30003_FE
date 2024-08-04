<script setup>
import { useAuthStore } from '@/store/auth';
import router from "@/router/router.js";

const authStore = useAuthStore();

// Initialize store state
authStore.init();

const handleLogin = async () => {
    await authStore.login();
    await router.push('/dashboard');
};
</script>

<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow-lg">
                    <div class="card-header bg-primary text-white text-center">
                        <h4>Login</h4>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="handleLogin">
                            <div class="form-group mb-3">
                                <label for="email">Email</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    id="email"
                                    v-model="authStore.email"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div class="form-group mb-3">
                                <label for="password">Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="password"
                                    v-model="authStore.password"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                            <div class="form-group mb-3">
                                <label for="role">Role</label>
                                <select class="form-control" id="role" v-model="authStore.role">
                                    <option value="customer">Customer</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div class="d-grid">
                                <button type="submit" class="btn btn-primary btn-block">Login</button>
                            </div>
                        </form>
                    </div>
                    <div class="card-footer text-center">
                        <small class="text-muted">Don't have an account? <RouterLink to="/register">Sign up</RouterLink></small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    margin-top: 100px;
}

.card {
    border-radius: 10px;
}

.card-header {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.btn-block {
    width: 100%;
}
</style>