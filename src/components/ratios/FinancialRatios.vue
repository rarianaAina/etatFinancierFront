<script setup lang="ts">
import { ref, onMounted } from "vue";
import RatioCard from "../ratios/RatioCard.vue";
import { useRatiosApi } from "../../composables/useRatiosApi";

const { ratios, analysis, fetchRatios } = useRatiosApi();

onMounted(fetchRatios);
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Analyse des Ratios</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <RatioCard
        title="Ratio de Liquidité"
        :value="ratios.currentRatio"
        :threshold="1.5"
        description="Actifs courants / Passifs courants"
      />

      <RatioCard
        title="Ratio de Solvabilité"
        :value="ratios.quickRatio"
        :threshold="0.5"
        description="Capitaux propres / Dettes totales"
      />

      <RatioCard
        title="ROE"
        :value="ratios.returnOnEquity"
        :threshold="10"
        description="Résultat net / Capitaux propres"
      />

      <RatioCard
        title="ROA"
        :value="ratios.returnOnAssets"
        :threshold="5"
        description="Résultat net / Total actifs"
      />
      <!-- Affiche l'analyse si le ratio est disponible -->

      <RatioCard
        title="Ratio d'Endettement"
        :value="ratios.debtEquityRatio"
        :threshold="0.7"
        description="Dettes totales / Total actifs"
      />
    </div>
    <div class="p-6 bg-white shadow-lg rounded-xl max-w-4xl mx-auto">
      <div>
        <p class="text-2xl font-semibold text-gray-800">Analyse des ratios</p>
      </div>
      <div class="bg-gray-100 p-6 rounded-lg mt-6 shadow-inner">
        <h3
          v-if="
            ratios.returnOnAssets > 0 ||
            ratios.currentRatio > 0 ||
            ratios.debtEquityRatio > 0 ||
            ratios.quickRatio > 0 ||
            ratios.returnOnEquity > 0
          "
          class="text-lg text-gray-900 font-medium"
        >
          {{ analysis }}
        </h3>
      </div>
    </div>
  </div>
</template>
