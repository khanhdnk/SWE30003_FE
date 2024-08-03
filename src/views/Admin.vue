<script setup>
import { ref, onMounted } from 'vue';

// Mock data for demonstration purposes
const slots = ref([]);
const statistics = ref({ totalSlots: 0, bookedSlots: 0 });

const fetchMockData = () => {
    // Mock slot data
    slots.value = [
        { id: 1, status: 'AVAILABLE' },
        { id: 2, status: 'BOOKED' },
        { id: 3, status: 'AVAILABLE' },
        { id: 4, status: 'BOOKED' },
    ];

    // Mock statistics data
    statistics.value = {
        totalSlots: slots.value.length,
        bookedSlots: slots.value.filter(slot => slot.status === 'BOOKED').length,
    };
};

const updateSlotStatus = (slotId, newStatus) => {
    const slot = slots.value.find(s => s.id === slotId);
    if (slot) {
        slot.status = newStatus;
        fetchMockData();
    }
};

onMounted(() => {
    fetchMockData();
});
</script>

<template>
    <div>
        <h1>Admin Page</h1>

        <section>
            <h2>Update Parking Slots</h2>
            <table>
                <thead>
                <tr>
                    <th>Slot ID</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="slot in slots" :key="slot.id">
                    <td>{{ slot.id }}</td>
                    <td>{{ slot.status }}</td>
                    <td>
                        <button @click="updateSlotStatus(slot.id, 'AVAILABLE')">Mark as Available</button>
                        <button @click="updateSlotStatus(slot.id, 'BOOKED')">Mark as Booked</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </section>

        <section>
            <h2>Statistics</h2>
            <p>Total Slots: {{ statistics.totalSlots }}</p>
            <p>Booked Slots: {{ statistics.bookedSlots }}</p>
        </section>
    </div>
</template>

<style scoped>
h1, h2 {
    text-align: center;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

th {
    background-color: #f4f4f4;
}

button {
    margin: 0 5px;
    padding: 5px 10px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>
