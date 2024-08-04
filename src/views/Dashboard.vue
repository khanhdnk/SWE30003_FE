<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {useAuthStore} from "@/store/auth.js";

const authStore = useAuthStore();
const token = authStore.token;

const slots = ref([]);

const fetchSlots = async () => {
    try {
        const response = await axios.get('http://localhost:3000/parkingslot/read/all', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.data.code === 200) {
            slots.value = response.data.data;
        } else {
            console.error('Failed to fetch parking slots:', response.data.message);
        }
    } catch (error) {
        console.error('Error fetching parking slots:', error);
    }
};

onMounted(() => {
    fetchSlots();
});
</script>

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card shadow-lg">
                    <div class="card-header bg-primary text-white text-center">
                        <h4>Parking Slots Dashboard</h4>
                    </div>
                    <div class="card-body">
                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Type</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="slot in slots" :key="slot.id">
                                <td>{{ slot.id }}</td>
                                <td>{{ slot.type }}</td>
                                <td>{{ slot.status }}</td>
                            </tr>
                            <tr v-if="slots.length === 0">
                                <td colspan="3" class="text-center">No parking slots available</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    margin-top: 50px;
}

.card-header {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
</style>