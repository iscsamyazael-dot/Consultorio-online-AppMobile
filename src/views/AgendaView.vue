<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <HeaderAgenda/>
      <!-- Aquí irán agregando los demás componentes -->
       <SegmentAgenda
          :mostrarInicio="false"
          :vistaActual="vistaActual"
          @cambiar-vista="cambiarVista"
          >
      </SegmentAgenda>

      <!-- Calendario -->
      <DashboardContent v-if="vistaActual === 'mes'">
          <CalendarioAgenda
              @seleccionar-fecha="abrirAgenda">
          </CalendarioAgenda>
      </DashboardContent>

      <!-- Hoy, Mañana, Semana -->
      <SegmentContent
          v-if="
              vistaActual === 'hoy' ||
              vistaActual === 'manana' ||
              vistaActual === 'semana'
          "
          :vista="vistaActual">
      </SegmentContent>

      <AgendaModal
          :isOpen="mostrarAgenda"
          :fecha="fechaSeleccionada"
          :citas="citasSeleccionadas"
          @cerrar="mostrarAgenda=false"
          @ver-detalle="verDetalle">
      </AgendaModal>
    </ion-content>
  </ion-page>
</template>
<script setup>

import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { IonPage, IonContent } from '@ionic/vue'
import HeaderAgenda from '@components/agenda/HeaderAgenda.vue'
import SegmentAgenda from '@components/agenda/SegmentAgenda.vue'
import DashboardContent from '../components/agenda/DashboardContent.vue';
import CalendarioAgenda from '@/components/agenda/CalendarioAgenda.vue';
import AgendaModal from '@/components/agenda/AgendaModal.vue';
import AgendaCard from '@/components/agenda/AgendaCard.vue';
import SegmentContent from '../components/agenda/SegmentContent.vue';

const route = useRoute()
const router = useRouter()

watch(
    () => route.fullPath,
    () => {
        vistaActual.value = 'mes'
    }
)

const mostrarAgenda = ref(false)
const fechaSeleccionada = ref(new Date())
const citasSeleccionadas = ref([])

const vistaActual = ref('mes')

const cambiarVista = (vista) => {
    vistaActual.value = vista
}

const abrirAgenda = (dia) => {
    fechaSeleccionada.value = dia.fecha
    citasSeleccionadas.value = dia.citas
    mostrarAgenda.value = true
}

const verDetalle = (cita) => {
    mostrarAgenda.value = false
    router.push({
        name: 'DetalleCita', // Usamos el nombre de la ruta
        state: { folio: cita.folio } // Viaja seguro y oculto en la memoria de la sesión
    })
}

// const verDetalle=(cita)=>{
//     mostrarAgenda.value=false
//     router.push({
//         path: `/detalle-cita/${cita.folio}`
//         //state: { folio: cita.folio }
//     })
// }

</script>