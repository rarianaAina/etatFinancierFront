<script setup lang="ts">
import { ref } from "vue";
import AccountingForm from "./components/FormulaireEcriture.vue";
import BalanceSheet from "./components/BilanComptable.vue";
import IncomeStatement from "./components/CompteDeResultat.vue";
import FinancialRatios from "../src/components/ratios/FinancialRatios.vue";

const activeTab = ref("form");
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <!-- Remplacez "image_url" par le chemin de votre image -->
              <img src="./img/logo.avif" alt="Logo" class="h-16 w-auto" />
            </div>
          </div>
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-2xl font-bold text-indigo-600">IT Corporation</h1>
            </div>
          </div>


          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-2xl font-bold text-indigo-600">
                Etats financier
              </h1>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Tabs -->
      <div class="mb-8">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button
              @click="activeTab = 'form'"
              :class="[
                activeTab === 'form'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
              ]"
            >
              Écriture Comptable
            </button>
            <button
              @click="activeTab = 'balance'"
              :class="[
                activeTab === 'balance'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
              ]"
            >
              Bilan
            </button>
            <button
              @click="activeTab = 'income'"
              :class="[
                activeTab === 'income'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
              ]"
            >
              Compte de Résultat
            </button>
            <button
              @click="activeTab = 'ratios'"
              :class="[
                activeTab === 'ratios'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
              ]"
            >
              Ratios
            </button>
          </nav>
        </div>
      </div>

      <!-- Content -->
      <div class="mt-6">
        <AccountingForm v-if="activeTab === 'form'" />
        <BalanceSheet v-if="activeTab === 'balance'" />
        <IncomeStatement v-if="activeTab === 'income'" />
        <FinancialRatios v-if="activeTab === 'ratios'" />
      </div>
    </div>
  </div>
</template>
