import { ref } from 'vue'
import axios from 'axios'

interface RatiosData {
  currentRatio: number
  quickRatio: number
  debtEquityRatio: number
  returnOnEquity: number
  returnOnAssets: number
}

export function useRatiosApi() {
  const ratios = ref<RatiosData>({
    currentRatio: 0,
    quickRatio: 0,
    debtEquityRatio: 0,
    returnOnEquity: 0,
    returnOnAssets: 0
  })

  const analysis = ref<string>('') // Pour stocker le texte d'analyse

  const fetchRatios = async () => {
    try {
      // Récupérer les ratios depuis l'API
      const response = await axios.post('http://localhost:8081/api/ratios', {
        startDate: new Date().getFullYear() + '-01-01',
        endDate: new Date().toISOString().split('T')[0]
      })
      ratios.value = response.data

      // Envoyer les ratios à votre API backend Spring Boot pour analyse
      const ratiosMessage = `
        Je souhaite analyser, en 2 phrases pour chaque ratio, les ratios suivants pour IT Corporation :
        - Ratio d'endettement = ${ratios.value.debtEquityRatio}
        - Ratio de rentabilité = ${ratios.value.returnOnEquity}
        - Ratio de liquidité = ${ratios.value.currentRatio}
        Saute d'une ligne après chaque ratio
      `

      const analysisResponse = await axios.post('http://localhost:8081/api/analyse-ratios', {
        ratiosMessage
      })

      // Stocker l'analyse dans `analysis`
      const analysisContent = analysisResponse.data.choices?.[0]?.message?.content;
      if (analysisContent) {
        analysis.value = analysisContent;
      } else {
        analysis.value = 'Aucune analyse disponible.';
      }
    } catch (error) {
      console.error('Error fetching or analyzing ratios:', error)
    }
  }

  return {
    ratios,
    analysis,
    fetchRatios
  }
}
