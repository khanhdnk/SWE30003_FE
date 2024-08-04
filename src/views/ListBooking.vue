<template>
    <div class="container mt-5">
        <h1>My Booking</h1>
        <table class="table table-striped">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Slot ID</th>
                <th scope="col">Start Time</th>
                <th scope="col">End Time</th>
                <th scope="col">Total Price</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(booking, index) in listBooking" :key="booking.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ booking.slotId }}</td>
                <td>{{ formatDate(booking.startTime) }}</td>
                <td>{{ formatDate(booking.endTime) }}</td>
                <td>{{ booking.totalPrice }}</td>
                <td>{{ booking.status }}</td>
                <td>
                    <button class="btn btn-danger" @click="handleDelete(booking.id)">Delete</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/store/auth';
import { useRoute } from 'vue-router';

const route = useRoute();
const slotId = ref(route.query.slotId);

const getListBooking = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/booking/getByUId/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching bookings:', error);
        throw error;
    }
};

const listBooking = ref([]);

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const handleDelete = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3000/booking/delete/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.data.code === 200) {
            listBooking.value = listBooking.value.filter(booking => booking.id !== id);
            alert('Booking deleted successfully!');
        } else {
            console.error('Error deleting booking:', response.data.message);
            alert('Failed to delete booking');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to delete booking');
    }
};

onMounted(async () => {
    listBooking.value = await getListBooking(useAuthStore().userId);
});
</script>

<style scoped>
/* Additional custom styling can be added here */
</style>
