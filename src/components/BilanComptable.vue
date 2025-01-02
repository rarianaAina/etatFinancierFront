<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface AccountBalanceDTO {
  accountCode: string;
  accountName: string;
  debitTotal: number;
  creditTotal: number;
  balance: number;
}

interface BalanceSheetDTO {
  assets: { [key: string]: AccountBalanceDTO[] };
  liabilities: { [key: string]: AccountBalanceDTO[] };
  totalAssets: number;
  totalLiabilities: number;
}

const balanceSheet = ref<BalanceSheetDTO>({
  assets: {},
  liabilities: {},
  totalAssets: 0,
  totalLiabilities: 0
})

const startDate = ref(new Date().getFullYear() + '-01-01')
const endDate = ref(new Date().toISOString().split('T')[0])

const fetchBalanceSheet = async () => {
  try {
    const response = await axios.post(`http://localhost:8081/api/reports/balance-sheet`, {
      startDate: startDate.value,
      endDate: endDate.value
    })
    balanceSheet.value = response.data
  } catch (error) {
    console.error('Error fetching balance sheet:', error)
  }
}

onMounted(fetchBalanceSheet)
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Bilan Comptable</h2>
    
    <!-- Date selection -->
    <div class="mb-6 flex space-x-4">
      <div>
        <label for="start-date" class="text-gray-600">Date de début</label>
        <input 
          id="start-date" 
          type="date" 
          v-model="startDate" 
          class="mt-1 p-2 border rounded" 
        />
      </div>
      <div>
        <label for="end-date" class="text-gray-600">Date de fin</label>
        <input 
          id="end-date" 
          type="date" 
          v-model="endDate" 
          class="mt-1 p-2 border rounded" 
        />
      </div>
      <button 
        @click="fetchBalanceSheet" 
        class="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Mettre à jour
      </button>
    </div>
    
    <div class="grid grid-cols-2 gap-8">
      <!-- Actif -->
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-4">Actif</h3>
        <div v-for="(accounts, category) in balanceSheet.assets" :key="category" class="mb-6">
          <h4 class="font-medium text-gray-600 mb-2">{{ category }}</h4>
          <div v-for="account in accounts" :key="account.accountCode" class="border-b pb-2">
            <div class="flex justify-between items-center">
              <span>{{ account.accountName }}</span>
              <span class="text-gray-600">{{ account.balance.toLocaleString('fr-FR') }} €</span>
            </div>
          </div>
        </div>
        <div class="mt-4 pt-2 border-t font-semibold">
          <div class="flex justify-between">
            <span>Total Actif</span>
            <span>{{ balanceSheet.totalAssets.toLocaleString('fr-FR') }} €</span>
          </div>
        </div>
      </div>

      <!-- Passif -->
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-4">Passif</h3>
        <div v-for="(accounts, category) in balanceSheet.liabilities" :key="category" class="mb-6">
          <h4 class="font-medium text-gray-600 mb-2">{{ category }}</h4>
          <div v-for="account in accounts" :key="account.accountCode" class="border-b pb-2">
            <div class="flex justify-between items-center">
              <span>{{ account.accountName }}</span>
              <span class="text-gray-600">{{ Math.abs(account.balance).toLocaleString('fr-FR') }} €</span>
            </div>
          </div>
        </div>
        <div class="mt-4 pt-2 border-t font-semibold">
          <div class="flex justify-between">
            <span>Total Passif</span>
            <span>{{ Math.abs(balanceSheet.totalLiabilities).toLocaleString('fr-FR') }} €</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>