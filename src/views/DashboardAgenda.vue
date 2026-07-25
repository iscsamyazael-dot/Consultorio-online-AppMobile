<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <HeaderAgenda></HeaderAgenda>
      <SegmentAgenda
        :vistaActual = "vistaActual"   
        @cambiar-vista="cambiarVista">
      </SegmentAgenda>
          <DashboardContent v-if="vistaActual === 'inicio'">
            <DashboardCards
              ref="dashboardCardsRef"
              @actualizar-conteo ="manejarConteoCitas">
            </DashboardCards>
            <SinCitas
              v-if="totalCitasHoy === 0">
            </SinCitas>
          <div v-else>
            <ProximaConsulta 
              :cita="primeraCita"
              @cambiarEstado="manejarActualizacionEstado"/>
            <CitasDelDia 
              @actualizar-pendientes="manejarPendientesLista"
              @citas-cargadas="manejarCitasCargadas"
              @cambiarEstado="manejarActualizacionEstado"/>
          </div>
          </DashboardContent>
        <SegmentContent
            v-if="
              vistaActual === 'hoy' ||
              vistaActual === 'manana' ||
              vistaActual === 'semana' "
              :vista="vistaActual">
        </SegmentContent>
      </ion-content>
  </ion-page>
</template>
<script setup>
  
  
  import { watch, ref,computed,onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'

  import ApiService from '@/services/ApiServices'
  import { IonPage, IonContent } from '@ionic/vue'
  import HeaderAgenda from '@components/agenda/HeaderAgenda.vue'
  import SegmentAgenda from '@components/agenda/SegmentAgenda.vue'
  import DashboardContent from '../components/agenda/DashboardContent.vue';
  import DashboardCards from '@/components/agenda/DashboardCards.vue'
  import ProximaConsulta from '@/components/agenda/ProximaConsulta.vue';
  import CitasDelDia from '@/components/agenda/CitasDelDia.vue';
  import SinCitas from '@/components/agenda/SinCitas.vue';
  import SegmentContent from '@/components/agenda/SegmentContent.vue';
  
  const route = useRoute()
  const router = useRouter()
  const vistaActual = ref('inicio')
  
  watch(
    () => route.fullPath,
    () => {
        vistaActual.value = 'inicio'
    }
  )

 
  const cambiarVista = (vista) => {
      if (vista === 'mes') {
          router.push('/agenda')
          return
      }
      vistaActual.value = vista
  }

  const totalCitasHoy = ref(0);
  const citasPendientes = ref(0);

  const manejarConteoCitas = (stats) => {
        totalCitasHoy.value = stats.totalHoy;
        //citasPendientes.value = stats.pendientes;
  };

  // Función que recibe la cantidad real de registros traídos por la lista del día
  const manejarPendientesLista = (cantidad) => {
      citasPendientes.value = cantidad;
  };

  // Variable reactiva para almacenar la lista de citas en el padre
  const listaCitas = ref([])

// Propiedad computada que obtiene siempre la primera cita de la lista con seguridad
  const primeraCita = computed(() => {
      return (listaCitas.value && listaCitas.value.length > 0) ? listaCitas.value[0] : null
  })

// Función que recibe las citas cuando CitasDelDia las descarga de la API
  const manejarCitasCargadas = (citasRecibidas) => {
      listaCitas.value = citasRecibidas
  }
  
  const dashboardCardsRef = ref(null)
// FUNCIÓN CENTRALIZADA PARA GUARDAR Y ACTUALIZAR EL ESTADO
  const manejarActualizacionEstado = async ({ id, estadoNuevo }) => {
      try {
          const response = await ApiService.post(`/api/ionic/actualizarCita/${id}/estado`, {
              estado: estadoNuevo
          })

          if (response.data) {
              // Buscamos la cita en la lista general del padre y actualizamos su estado
              const citaIndex = listaCitas.value.findIndex(c => c.id === id)
              if (citaIndex !== -1) {
                  listaCitas.value[citaIndex].estado = estadoNuevo

                  // Si el estado es finalizada, completada o cancelada, la removemos de la lista activa
                  if (['Finalizada', 'Completada', 'Cancelada'].includes(estadoNuevo)) {
                      listaCitas.value.splice(citaIndex, 1)
                  }
              }
              
              if (dashboardCardsRef.value) {
                dashboardCardsRef.value.cargarEstadisticasCitas()
              }

              console.log("Estado actualizado y contadores refrescados con éxito");
          }
      } catch (error) {
          console.error("Error al actualizar el estado de la cita:", error)
      }
  }
</script>