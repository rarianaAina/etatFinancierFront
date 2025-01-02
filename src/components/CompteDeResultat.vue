<!-- <script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface AccountBalanceDTO {
  accountCode: string;
  accountName: string;
  debitTotal: number;
  creditTotal: number;
  balance: number;
}

interface IncomeStatementDTO {
  revenues: AccountBalanceDTO[];
  expenses: AccountBalanceDTO[];
  totalRevenues: number;
  totalExpenses: number;
  netIncome: number;
}

const incomeStatement = ref<IncomeStatementDTO>({
  revenues: [],
  expenses: [],
  totalRevenues: 0,
  totalExpenses: 0,
  netIncome: 0
})

const startDate = ref(new Date().getFullYear() + '-01-01')
const endDate = ref(new Date().toISOString().split('T')[0])

const fetchIncomeStatement = async () => {
  try {
    const response = await axios.get(`http://localhost:8081/api/reports/income-statement`, {
      params: {
        startDate: startDate.value,
        endDate: endDate.value
      }
    })
    incomeStatement.value = response.data
    updateChartData()
  } catch (error) {
    console.error('Error fetching income statement:', error)
  }
}

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: 'Produits',
      data: [],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    },
    {
      label: 'Charges',
      data: [],
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1
    }
  ]
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Évolution des Produits et Charges'
    }
  }
}

const updateChartData = () => {
  chartData.value.datasets[0].data = incomeStatement.value.revenues.map(r => r.balance)
  chartData.value.datasets[1].data = incomeStatement.value.expenses.map(e => Math.abs(e.balance))
  chartData.value.labels = incomeStatement.value.revenues.map(r => r.accountName)
}

onMounted(fetchIncomeStatement)
</script> -->

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface AccountBalanceDTO {
  accountCode: string;
  accountName: string;
  debitTotal: number;
  creditTotal: number;
  balance: number;
}

interface IncomeStatementDTO {
  revenues: AccountBalanceDTO[];
  expenses: AccountBalanceDTO[];
  totalRevenues: number;
  totalExpenses: number;
  netIncome: number;
}

const incomeStatement = ref<IncomeStatementDTO>({
  revenues: [],
  expenses: [],
  totalRevenues: 0,
  totalExpenses: 0,
  netIncome: 0
})

const startDate = ref<string>(new Date().getFullYear() + '-01-01')
const endDate = ref<string>(new Date().toISOString().split('T')[0])

const fetchIncomeStatement = async () => {
  try {
    const response = await axios.post('http://localhost:8081/api/reports/income-statement', {
      startDate: startDate.value,
      endDate: endDate.value
    })
    incomeStatement.value = response.data
    updateChartData()
  } catch (error) {
    console.error('Error fetching income statement:', error)
  }
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    tension: number;
  }[];
}

const chartData = ref<ChartData>({
  labels: [],
  datasets: [
    {
      label: 'Produits',
      data: [],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    },
    {
      label: 'Charges',
      data: [],
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1
    }
  ]
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Évolution des Produits et Charges'
    }
  }
}

const updateChartData = () => {
 
  chartData.value.datasets[0].data = incomeStatement.value.revenues.map(r => Math.abs(r.balance))
  chartData.value.datasets[1].data = incomeStatement.value.expenses.map(e => Math.abs(e.balance))
  
  chartData.value.labels = [...new Set([
    ...incomeStatement.value.revenues.map(r => r.accountName),
    ...incomeStatement.value.expenses.map(e => e.accountName)
  ])]
}


onMounted(fetchIncomeStatement)
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Compte de Résultat</h2>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Données financières -->
      <div class="space-y-6">
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-gray-700 mb-4">Résumé Financier</h3>
          <div class="space-y-3">
            <!-- Formulaire pour la sélection des dates -->
            <div class="flex space-x-4">
              <div>
                <label for="start-date" class="text-gray-600">Date de début</label>
                <input id="start-date" type="date" v-model="startDate" class="mt-1 p-2 border rounded" />
              </div>
              <div>
                <label for="end-date" class="text-gray-600">Date de fin</label>
                <input id="end-date" type="date" v-model="endDate" class="mt-1 p-2 border rounded" />
              </div>
            </div>
            <button 
              @click="fetchIncomeStatement" 
              class="mt-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Mettre à jour les résultats
            </button>

            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Total Produits</span>
                <span class="font-medium">{{ Math.abs(incomeStatement.totalRevenues).toLocaleString('fr-FR') }} €</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Total Charges</span>
                <span class="font-medium">{{ Math.abs(incomeStatement.totalExpenses).toLocaleString('fr-FR') }} €</span>
              </div>
              <div class="flex justify-between items-center font-semibold">
                <span>Résultat Net</span>
                <span :class="incomeStatement.netIncome >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ incomeStatement.netIncome.toLocaleString('fr-FR') }} €
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Détail des produits -->
        <div class="mt-4">
          <h4 class="font-medium mb-2">Détail des Produits</h4>
          <div v-for="revenue in incomeStatement.revenues" :key="revenue.accountCode" class="border-b pb-2">
            <div class="flex justify-between items-center">
              <span>{{ revenue.accountName }}</span>
              <span>{{ Math.abs(revenue.balance).toLocaleString('fr-FR') }} €</span>
            </div>
          </div>
        </div>

        <!-- Détail des charges -->
        <div class="mt-4">
          <h4 class="font-medium mb-2">Détail des Charges</h4>
          <div v-for="expense in incomeStatement.expenses" :key="expense.accountCode" class="border-b pb-2">
            <div class="flex justify-between items-center">
              <span>{{ expense.accountName }}</span>
              <span>{{ Math.abs(expense.balance).toLocaleString('fr-FR') }} €</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Graphique -->
      <div class="h-[400px]">
        <Line :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>