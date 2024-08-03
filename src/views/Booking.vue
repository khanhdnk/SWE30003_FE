<script setup>
import { ref } from 'vue';

const customerId = ref(0);
const slotId = ref(0);
const startTime = ref('');
const endTime = ref('');
const totalPrice = ref(0);
const status = ref('PENDING'); // Assume 'PENDING' is one of the statuses in BookingStatus enum

// const handleSubmit = async (event) => {
//     event.preventDefault();
//
//     try {
//         const booking = new Booking(
//             customerId.value,
//             slotId.value,
//             new Date(startTime.value),
//             new Date(endTime.value),
//             totalPrice.value,
//             status.value
//         );
//
//         await booking.save();
//         alert('Booking created successfully!');
//     } catch (error) {
//         console.error('Error creating booking:', error);
//         alert('Failed to create booking');
//     }
// };
</script>

<template>
    <form @submit="handleSubmit">
        <h1>Create Booking</h1>

        <label for="customerId">Customer ID:</label>
        <input type="number" id="customerId" v-model="customerId" required><br><br>

        <label for="slotId">Slot ID:</label>
        <input type="number" id="slotId" v-model="slotId" required><br><br>

        <label for="startTime">Start Time:</label>
        <input type="datetime-local" id="startTime" v-model="startTime" required><br><br>

        <label for="endTime">End Time:</label>
        <input type="datetime-local" id="endTime" v-model="endTime" required><br><br>

        <label for="totalPrice">Total Price:</label>
        <input type="number" id="totalPrice" v-model="totalPrice" required><br><br>

        <label for="status">Status:</label>
        <select id="status" v-model="status" required>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="CANCELLED">Cancelled</option>
        </select><br><br>

        <button type="submit">Create Booking</button>
    </form>
</template>

<style scoped>

</style>
