<script setup>
import { ref, onMounted } from 'vue';
import axios from "axios";
import {useAuthStore} from "@/store/auth.js";
// Mock data for demonstration purposes
const slots = ref([]);
const statistics = ref({ totalSlots: 0, bookedSlots: 0 });
const slotType = ref('');
const slotStatus = ref('');


const fetchSlot = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/parkingslot//read/${id}`, {
            headers: {
                'Authorization': `Bearer ${useAuthStore().token}`
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
}

const fetchSlots = async () => {
    try {
        const response = await axios.get('http://localhost:3000/parkingslot/read/all', {
            headers: {
                'Authorization': `Bearer ${useAuthStore().token}`
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

const handleDelete = async (id) =>{


    try{
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

    }catch(error) {
        console.error('Error deleting slot:', error);
    }
}

const handleCreate = async () =>{
    if (!slotType.value || !slotStatus.value) {
        alert('Please fill in all fields');
        return;
    }else {
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

onMounted(fetchSlots);
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
                    <td>{{slot.type}}</td>
                    <td>
                        <router-link :to="{ path: '/update_slot', query: { slotId: slot.id } }" class="bg-primary text-white" >Update</router-link>

                        <button class="bg-danger" @click="handleDelete(slot.id)">Delete</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </section>

        <section>
            <h2>Create Slot</h2>
            <select v-model="slotType">
                <option value="" disabled>Select Slot Type</option>
                <option value="Car">Car</option>
                <option value="Motorcycle">Motorcycle</option>
            </select>
            <select v-model="slotStatus">
                <option value="" disabled>Select Slot Status</option>
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
                <option value="Reserved">Reserved</option>
            </select>
            <button @click="handleCreate()">Create</button>
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


</style>
