<script setup>
import {ref, onMounted} from 'vue';
import axios from "axios";
import {useAuthStore} from "@/store/auth.js";
// Mock data for demonstration purposes
const slots = ref([]);
const slotStatusInput = ref('Pending');
const slotType = ref('');
const slotStatus = ref('');

const statTotalBooking = ref();
const statSlot = ref({
    Car: ref({available: 0, occupied: 0, reserved: 0}),
    Motorcycle: ref({available: 0, occupied: 0, reserved: 0})
});
const statPayment = ref();
const statNotification = ref();
const statRevenue = ref();
const statByStatus = ref();

const fetchStatisticSlot = async () => {
    try {
        const response = await axios.get('http://localhost:3000/statistic/slot', {
            headers: {
                'Authorization': `Bearer ${useAuthStore().token}`
            }
        });
        if (response.data.code === 200) {
            // Update each property individually
            Object.keys(response.data.data).forEach(vehicleType => {
                Object.keys(response.data.data[vehicleType]).forEach(status => {
                    statSlot.value[vehicleType][status] = response.data.data[vehicleType][status];
                });
            });
            console.log(statSlot.value.Car.available);
        } else {
            console.error('Failed to fetch statistics:', response.data.message);
        }
    } catch (error) {
        console.error('Error fetching statistics:', error);
    }
}

const fetchStatisticPayment = async () => {
    try {
        const response = await axios.get('http://localhost:3000/statistic/payment', {
            headers: {
                'Authorization': `Bearer ${useAuthStore().token}`
            }
        });
        if (response.data.code === 200) {
            statPayment.value = response.data.data;
        } else {
            console.error('Failed to fetch statistics:', response.data.message);
        }

    } catch (error) {
        console.error('Error fetching statistics:', error);
    }
}

const fetchStatisticNotification = async () => {
    try {
        const response = await axios.get('http://localhost:3000/statistic/notification', {
            headers: {
                'Authorization': `Bearer ${useAuthStore().token}`
            }
        });
        if (response.data.code === 200) {
            statNotification.value = response.data.data;
        } else {
            console.error('Failed to fetch statistics:', response.data.message);
        }
    } catch (error) {
        console.error('Error fetching statistics:', error);
    }
}

const fetchStatisticRevenue = async () => {
    try {
        const response = await axios.get('http://localhost:3000/statistic/revenue', {
            headers: {
                'Authorization': `Bearer ${useAuthStore().token}`
            }
        });
        if (response.data.code === 200) {
            statRevenue.value = response.data.data;
        } else {
            console.error('Failed to fetch statistics:', response.data.message);
        }
    } catch (error) {
        console.error('Error fetching statistics:', error);
    }
}

const fetchTotalBooking = async () => {
    try {
        const response = await axios.get('http://localhost:3000/statistic/totalBooking', {
            headers: {
                'Authorization': `Bearer ${useAuthStore().token}`
            }
        });
        if (response.data.code === 200) {
            statTotalBooking.value = response.data.data;
        } else {
            console.error('Failed to fetch total booking:', response.data.message);
        }
    } catch (error) {
        console.error('Error fetching total booking:', error);
    }
}

const fetchByStatus = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/statistic/bookingByStatus/${slotStatusInput.value}`, {
            headers: {
                'Authorization': `Bearer ${useAuthStore().token}`
            }
        });
        console.log(response.data.code)
        if (response.data.code === 200) {
            statByStatus.value = response.data.data;

        } else if (response.data.code === 500) {
            statByStatus.value = 'none';
        } else {
            console.error('Failed to fetch statistics:', response.data.message);
        }
    } catch (error) {
        statByStatus.value = 'none';

        console.error('Error fetching statistics:', error);
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const fetchSlots = async () => {
    try {
        const response = await axios.get('http://localhost:3000/parkingslot/read/all', {
            headers: {
                'Authorization': `Bearer ${useAuthStore().token}`
            }
        });

        if (response.data.code === 200) {
            slots.value = response.data.data;
            console.log(slots.value)
        } else {
            console.error('Failed to fetch parking slots:', response.data.message);
        }
    } catch (error) {
        console.error('Error fetching parking slots:', error);
    }
};

const handleDelete = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3000/parkingslot/delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${useAuthStore().token}`
            }
        });
        if (response.data.code === 200) {
            alert('Slot deleted successfully');
            await fetchSlots();
        } else {
            console.error('Failed to delete slot:', response.data.message);
        }

    } catch (error) {
        console.error('Error deleting slot:', error);
    }
}

const handleCreate = async () => {
    if (!slotType.value || !slotStatus.value) {
        alert('Please fill in all fields');
        return;
    } else {
        try {
            const response = await axios.post('http://localhost:3000/parkingslot/create', {
                type: slotType.value,
                status: slotStatus.value
            }, {
                headers: {
                    'Authorization': `Bearer ${useAuthStore().token}`
                }
            });

            if (response.data.code === 200) {
                alert('Slot created successfully');
                await fetchSlots();
                slotType.value = '';
                slotStatus.value = '';
            } else {
                console.error('Failed to create slot:', response.data.message);
            }
        } catch (error) {
            console.error('Error creating slot:', error);
        }
    }

}

onMounted(async () => {
    await fetchStatisticSlot();
    await fetchSlots();
    await fetchTotalBooking();
    await fetchStatisticPayment();
    await fetchStatisticNotification();
    await fetchStatisticRevenue();
    await fetchByStatus();
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
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="slot in slots" :key="slot.id">
                    <td>{{ slot.id }}</td>
                    <td>{{ slot.status }}</td>
                    <td>{{ slot.type }}</td>
                    <td>
                        <button>
                            <router-link :to="{ path: '/update_slot', query: { slotId: slot.id } }" class="">Update
                            </router-link>

                        </button>

                        <button class="bg-danger" @click="handleDelete(slot.id)">Delete</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </section>

        <section class="w-100">
            <h2>Create Slot</h2>
            <div class="d-flex justify-center align-center">
                <div class="d-flex flex-column align-center">
                    <select v-model="slotType" class="mb-4">
                        <option value="" disabled>Select Slot Type</option>
                        <option value="Car">Car</option>
                        <option value="Motorcycle">Motorcycle</option>
                    </select>
                    <select v-model="slotStatus" class="mb-4">
                        <option value="" disabled>Select Slot Status</option>
                        <option value="Available">Available</option>
                        <option value="Occupied">Occupied</option>
                        <option value="Reserved">Reserved</option>
                    </select>
                    <button @click="handleCreate()" class="btn btn-primary">Create</button>
                </div>
            </div>
        </section>


        <section>
            <h2>Statistics</h2>
            <p>Total Slots: {{ statTotalBooking }}</p>
            <select v-model="slotStatusInput" @change="fetchByStatus()">
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
            </select>
            <p>Booking by status: {{ statByStatus }}</p>

            <p>
                Slot type count: Car: {{ statSlot.Car.available }} available, {{ statSlot.Car.occupied }} occupied,
                {{ statSlot.Car.reserved }} reserved


            </p>
            <p>Slot type count: Motorcycle: {{ statSlot.Motorcycle.available }} available,
                {{ statSlot.Motorcycle.occupied }} occupied, {{ statSlot.Motorcycle.reserved }} reserved</p>
            <p>Payment: {{ statPayment }}</p>
            <p>Notification: {{ statNotification }}</p>
            <p>Revenue: {{ statRevenue }}</p>


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


</style>
