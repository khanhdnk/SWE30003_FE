<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import router from "@/router/router.js";

// Define reactive variables
const route = useRoute();
const invoiceLists = ref([]);
const totalPrice = ref(route.query.totalPrice);
console.log(totalPrice.value)
const paymentMethod = ref('');
const errorMessage = ref('');
const paymentMethods = ['Cash', 'CreditCard', 'EWallet'];


// Fetch invoice data when the component is mounted
const fetchInvoiceData = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/invoice/getByUId/${useAuthStore().userId}`);
        invoiceLists.value = response.data.data;
    } catch (error) {
        errorMessage.value = 'Failed to fetch invoice data';
        console.error('Error fetching invoice data:', error);
    }
};

onMounted(fetchInvoiceData);

// Submit payment method
const submitPayment = async (invoiceId, price) => {
    if (!paymentMethod.value) {
        errorMessage.value = 'Payment method is required';
        return;
    }

    try {
        const response = await axios.post('http://localhost:3000/payment/process', {
            invoiceId,
            amount: parseInt(price),
            method: paymentMethod.value,
            email: true,
            sms: true

        });

        if (response.data.code === 200) {
            alert(response.data.message);
            await router.push('/dashboard')
        } else {
            errorMessage.value = response.data.data;
        }
    } catch (error) {
        errorMessage.value = 'Error submitting payment';
        console.error('Error submitting payment:', error);
    }
};
</script>

<template>
    <div class="container mt-5">
        <h1>Payment</h1>

        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

        <div v-if="invoiceLists.length > 0">
            <h3>Invoice Details</h3>
            <div v-for="(invoice, index) in invoiceLists" :key="invoice.id" class="card mb-3">
                <div class="card-body">
                    <p class="card-text"><strong>Slot ID:</strong> {{ invoice.slotId }}</p>
                    <p class="card-text"><strong>Start Time:</strong> {{ new Date(invoice.startTime).toLocaleString() }}</p>
                    <p class="card-text"><strong>End Time:</strong> {{ new Date(invoice.endTime).toLocaleString() }}</p>
                    <p class="card-text"><strong>Total Price:</strong> ${{ invoice.totalPrice }}</p>
                    <p class="card-text"><strong>Status:</strong> {{ invoice.status }}</p>

                    <div class="form-group mt-4">
                        <div class="form-group mt-4">
                            <label for="paymentMethod">Payment Method:</label>
                            <select
                                id="paymentMethod"
                                v-model="paymentMethod"
                                class="form-control"
                            >
                                <option value="" disabled>Select a payment method</option>
                                <option v-for="method in paymentMethods" :key="method" :value="method">
                                    {{ method }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <button class="btn btn-primary mt-3" @click="submitPayment(invoice.id)">Submit Payment</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Additional custom styling can be added here */
</style>
