<script setup lang="ts">
import { ref, onMounted } from "vue";
import { computed } from "vue";
import { PlusIcon } from "@heroicons/vue/24/solid";
import AccountingHeader from '../components/AccountingHeader.vue';
import { type AdditionalEntry } from '../../src/types/accounting';
import { type EntryDTO } from "../../src/types/accounting";
const entry = ref({
  date: "",
  description: "",
});

const accounts = [
  { account_id: 1, account_name: "Caisse", account_code: "571" },
  { account_id: 2, account_name: "Banque", account_code: "512" },
  { account_id: 3, account_name: "Clients", account_code: "411" },
  { account_id: 4, account_name: "Fournisseurs", account_code: "401" },
  { account_id: 5, account_name: "Stock de marchandises", account_code: "310" },
  { account_id: 6, account_name: "Immobilisations corporelles", account_code: "218" },
  { account_id: 7, account_name: "Capital social", account_code: "101" },
  { account_id: 8, account_name: "Emprunts", account_code: "164" },
  { account_id: 9, account_name: "Ventes de marchandises", account_code: "707" },
  { account_id: 10, account_name: "Achat de marchandises", account_code: "607" },
  { account_id: 11, account_name: "Salaires", account_code: "641" },
  { account_id: 12, account_name: "Impôts et taxes", account_code: "635" },
  { account_id: 13, account_name: "Apports en nature", account_code: "102" },
  { account_id: 14, account_name: "Réserves légales et statutaires", account_code: "103" },
  { account_id: 15, account_name: "Report à nouveau", account_code: "104" },
  { account_id: 16, account_name: "Subventions d'investissement", account_code: "105" },
  { account_id: 17, account_name: "Réserves réglementées", account_code: "106" },
  { account_id: 18, account_name: "Écart de réévaluation", account_code: "107" },
  { account_id: 19, account_name: "Compte de l'exploitant", account_code: "108" },
  { account_id: 20, account_name: "Immobilisations incorporelles", account_code: "200" },
  { account_id: 21, account_name: "Terrains", account_code: "213" },
  { account_id: 22, account_name: "Constructions", account_code: "214" },
  { account_id: 23, account_name: "Installations techniques, matériels et outillage", account_code: "215" },
  { account_id: 24, account_name: "Immobilisations financières", account_code: "220" },
  { account_id: 25, account_name: "Immobilisations en cours", account_code: "230" },
  { account_id: 26, account_name: "Matières premières", account_code: "300" },
  { account_id: 27, account_name: "Produits finis", account_code: "350" },
  { account_id: 28, account_name: "En-cours de production", account_code: "370" },
  { account_id: 29, account_name: "Fournisseurs locaux", account_code: "4011" },
  { account_id: 30, account_name: "Fournisseurs étrangers", account_code: "4012" },
  { account_id: 31, account_name: "Clients locaux", account_code: "4111" },
  { account_id: 32, account_name: "Clients étrangers", account_code: "4112" },
  { account_id: 33, account_name: "Salaires nets à payer", account_code: "421" },
  { account_id: 34, account_name: "Avances et acomptes au personnel", account_code: "425" },
  { account_id: 35, account_name: "CNaPS", account_code: "431" },
  { account_id: 36, account_name: "Autres organismes sociaux", account_code: "437" },
  { account_id: 37, account_name: "Impôts sur les bénéfices", account_code: "441" },
  { account_id: 38, account_name: "TVA collectée", account_code: "443" },
  { account_id: 39, account_name: "TVA à décaisser", account_code: "445" },
  { account_id: 40, account_name: "Valeurs mobilières de placement", account_code: "500" },
  { account_id: 41, account_name: "Compte courant", account_code: "5121" },
  { account_id: 42, account_name: "Compte en devise", account_code: "5122" },
  { account_id: 43, account_name: "Achats de matières premières", account_code: "601" },
  { account_id: 44, account_name: "Achats de fournitures", account_code: "602" },
  { account_id: 45, account_name: "Locations", account_code: "611" },
  { account_id: 46, account_name: "Charges d'entretien et de réparations", account_code: "612" },
  { account_id: 47, account_name: "Taxes professionnelles", account_code: "631" },
  { account_id: 48, account_name: "TVA non récupérable", account_code: "6351" },
  { account_id: 49, account_name: "Salaires bruts", account_code: "6411" },
  { account_id: 50, account_name: "Cotisations sociales", account_code: "645" },
  { account_id: 51, account_name: "Intérêts sur emprunts", account_code: "661" },
  { account_id: 52, account_name: "Ventes de produits finis", account_code: "701" },
  { account_id: 53, account_name: "Ventes en gros", account_code: "7071" },
  { account_id: 54, account_name: "Autres produits courants", account_code: "750" },
  { account_id: 55, account_name: "Produits financiers", account_code: "760" },
  { account_id: 56, account_name: "Produits exceptionnels", account_code: "770" },
];

const getAccountNameByCode = (accountCode: string) => {
  const account = accounts.find(acc => acc.account_code === accountCode);
  return account ? account.account_name : "Compte Inconnu";
};

const entriesList = ref<EntryDTO[]>([]);
const errorMessageEntry = ref<string>("");

const entries = ref<AdditionalEntry[]>([]);
const errorMessage = ref(""); // Message d'erreur pour les déséquilibres

const addEntryCredit = () => {
  entries.value.push({
    type: 'credit',
    credit: "",
    amountCredit: 0,
  });
};

const addEntryDebit = () => {
  entries.value.push({
    type: 'debit',
    debit: "",
    amountDebit: 0,
  });
};

// Calculer la somme des débits
const totalDebits = computed(() =>
  entries.value.reduce((sum, entry) => sum + (entry.amountDebit || 0), 0)
);

// Calculer la somme des crédits
const totalCredits = computed(() =>
  entries.value.reduce((sum, entry) => sum + (entry.amountCredit || 0), 0)
);

const submitEntry = () => {
  errorMessage.value = ""; // Réinitialiser le message d'erreur

  // Vérifier l'équilibre des écritures comptables
  if (totalDebits.value !== totalCredits.value) {
    alert("Les totaux Débit et Crédit ne correspondent pas.");
    return;
  }

  const entryList = entries.value.map((entryItem) => ({
    accountCode: parseInt(entryItem.debit || entryItem.credit || '0', 10),
    date: entry.value.date,
    description: entry.value.description,
    amount_debit: entryItem.amountDebit || 0,
    amount_credit: entryItem.amountCredit || 0,
  }));
  console.log("Envoi des données au serveur:", entryList);
  fetch("http://localhost:8081/api/entry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entryList),
  })
    .then((response) => response.json())  // Convertir la réponse en JSON
    .then((data) => {
      // if (data.error) {  // Vérifier si un message d'erreur est renvoyé
      //   errorMessage.value = data.error;  // Afficher l'erreur
      // } else {
        console.log("Réponse du serveur:", data);
        resetForm();
        alert("Ecriture comptable ajoutée avec succès");
      // }
    })
    .catch((error) => {
      //errorMessage.value = "Erreur lors de l'ajout des entrées financières : " + error.message;
      console.error("Erreur:", error);
    });
};

const fetchEntries = async () => {
  try {
    const response = await fetch("http://localhost:8081/api/entry");
    if (!response.ok) {
      throw new Error("Erreur de récupération des données");
    }
    const data = await response.json();
    entriesList.value = data;
    console.log(data);
  } catch (error) {
    errorMessageEntry.value = "Erreur lors de la récupération des entrées financières : ";
    console.error("Erreur:", error);
  }
};
const resetForm = () => {
  entry.value = {
    date: "",
    description: "",
  };
  entries.value = [];
  errorMessage.value = ""; // Réinitialiser l'erreur
};

onMounted(() => {
  fetchEntries();
});
// function computed removed to resolve conflict with imported computed
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">
      Nouvelle Écriture Comptable
    </h2>
    <form @submit.prevent="submitEntry" class="space-y-4">
      <AccountingHeader v-model:entry="entry" />

      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <!-- Colonne Débit -->
          <div class="space-y-4">
            <div v-for="(entryItem, index) in entries" :key="index">
              <template v-if="entryItem.type === 'debit'">
                <div class="flex gap-4">
                  <div class="w-1/2">
                    <input
                      type="text"
                      v-model="entryItem.debit"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Compte Débit"
                    />
                  </div>
                  <div class="w-1/2">
                    <input
                      type="number"
                      v-model="entryItem.amountDebit"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Montant Débit"
                    />
                  </div>
                </div>
              </template>
            </div>
          </div>

          <!-- Colonne Crédit -->
          <div class="space-y-4">
            <div v-for="(entryItem, index) in entries" :key="index">
              <template v-if="entryItem.type === 'credit'">
                <div class="flex gap-4">
                  <div class="w-1/2">
                    <input
                      type="text"
                      v-model="entryItem.credit"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Compte Crédit"
                    />
                  </div>
                  <div class="w-1/2">
                    <input
                      type="number"
                      v-model="entryItem.amountCredit"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Montant Crédit"
                    />
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- Totaux Débit et Crédit -->
      <div class="mt-4">
        <p class="text-lg font-bold">
          Total Débit : {{ totalDebits }} | Total Crédit : {{ totalCredits }}
        </p>
        <p v-if="errorMessage" class="text-red-600">{{ errorMessage }}</p>
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <button
          type="button"
          @click="addEntryDebit"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Ajouter un compte Débit
        </button>
        <button
          type="button"
          @click="addEntryCredit"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Ajouter un compte Crédit
        </button>
        <button
          type="submit"
          class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <PlusIcon class="h-5 w-5 mr-2" />
          Valider l'écriture
        </button>
      </div>
    </form>
  </div>

  <div class="bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Entrées Financières</h2>

    <!-- Message d'erreur -->
    <p v-if="errorMessageEntry" class="text-red-600">{{ errorMessageEntry }}</p>

    <!-- Tableau des entrées -->
    <table class="min-w-full table-auto border-collapse border border-gray-300">
  <thead>
    <tr class="bg-gray-200">
      <th class="px-4 py-2 text-left border-b border-gray-300">Date</th>
      <th class="px-4 py-2 text-left border-b border-gray-300">Description</th>
      <th class="px-4 py-2 text-left border-b border-gray-300">Compte</th>
      <th class="px-4 py-2 text-left border-b border-gray-300">Débit</th>
      <th class="px-4 py-2 text-left border-b border-gray-300">Crédit</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(entry, index) in entriesList" :key="index">
      <td class="px-4 py-2 border-b border-gray-300">{{ entry.date }}</td>
      <td class="px-4 py-2 border-b border-gray-300">{{ entry.description }}</td>
      <td class="px-4 py-2 border-b border-gray-300">{{ entry.accountCode }} - {{ getAccountNameByCode(entry.accountCode) }}</td>
      <td class="px-4 py-2 border-b border-gray-300">{{ entry.amount_debit }}</td>
      <td class="px-4 py-2 border-b border-gray-300">{{ entry.amount_credit }}</td>
    </tr>
  </tbody>
</table>

  </div>

</template>
