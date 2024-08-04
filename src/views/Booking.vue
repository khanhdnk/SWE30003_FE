<template>
    <div class="container mt-5">
        <h1>Create Booking</h1>
        <form @submit="handleSubmit">

<!--            <div class="form-group mb-3">-->
<!--                <label for="endTime" class="form-label">End Time:</label>-->
<!--                <input type="datetime-local" id="endTime" v-model="endTime" class="form-control" required>-->
<!--            </div>-->
            <div>
                <p><strong>Current Booking Slot ID:</strong> <span>{{slotId}}</span></p>
            </div>
            <div class="form-group mb-3">
                <p><strong>Charge:</strong> $10</p>
            </div>


            <button type="submit" class="btn btn-primary">Create Booking</button>
        </form>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import axios from "axios";

const customerId = ref(0);
const slotId = ref(0);
const startTime = ref('');
const endTime = ref('');
const totalPrice = ref(10);
const status = ref('PENDING');
import { useAuthStore } from '@/store/auth';
import {useRoute} from "vue-router";
import router from "@/router/router.js";
//get the slot id from the route
const route = useRoute();
//take params

slotId.value = route.query.slotId;
console.log(typeof(parseInt(slotId.value)))
const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const bookingData = {
            customerId: useAuthStore().userId,
            slotId: parseInt(slotId.value),
            //set startTime to Date now
            startTime: new Date().toISOString(),
            //endTime = startTime + 1 day
            endTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
            totalPrice: totalPrice.value,
            status: "Pending"
        };

        const response = await createBooking(bookingData);

        if (response.code === 200) {
            alert(response.message);
            // You might want to reset form fields or redirect the user here
            router.push({ path: '/payment', query: { totalPrice: totalPrice.value } });
        } else {
            alert('Failed to create booking: ' + response.message);
        }
    } catch (error) {
        console.error('Error creating booking:', error);
        alert('Failed to create booking: ' + (error.response?.data?.message || error.message));
    }
};

const createBooking = async (bookingData)=>{
    try {
        const response = await axios.post('http://localhost:3000/booking/create', bookingData);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
}
</script>

<style scoped>
/* Additional custom styling can be added here */
</style>
