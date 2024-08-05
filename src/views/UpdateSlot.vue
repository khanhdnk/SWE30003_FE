<script setup>
import axios from "axios";
import {useAuthStore} from "@/store/auth.js";
import {onMounted, ref} from "vue";
import {useRouter, useRoute} from "vue-router";
const router = useRouter();
const route = useRoute();
const slotId = route.query.slotId;
const slot = ref();
const slotType = ref();
const slotStatus = ref();

const fetchSlot = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/parkingslot/read/${slotId}`, {
            headers: {
                'Authorization': `Bearer ${useAuthStore().token}`
            }
        });

        if (response.data.code === 200) {
            slot.value = response.data.data;
        } else {
            console.error('Failed to fetch parking slots:', response.data.message);
        }
    } catch (error) {
        console.error('Error fetching parking slots:', error);
    }
}

async function handleUpdate(){
    if (!slotType.value || !slotStatus.value) {
        alert('Slot type and status are required');
        return;
    }else {

        try {
            const response = await axios.put(`http://localhost:3000/parkingslot/update/${slot.value.id}`, {
                type: slotType.value,
                status: slotStatus.value
            }, {
                headers: {
                    'Authorization': `Bearer ${useAuthStore().token}`
                }
            });

            if (response.data.code === 200) {
                alert('Slot updated successfully');
                router.push('/admin');
            } else {
                console.error('Failed to update slot:', response.data.message);
            }
        } catch (error) {
            console.error('Error updating slot:', error);
        }
    }
}

onMounted(async () => {
    await fetchSlot();
    slotType.value = slot.value.type;
    slotStatus.value = slot.value.status;

});
</script>

<template>
    <div>
        <h1>Admin Page</h1>

        <section>
            <h2>Update Parking Slots</h2>
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
            <button @click="handleUpdate()">Update</button>
        </section>
    </div>
</template>

<style scoped>

</style>