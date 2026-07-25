<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <HeaderBack
          titulo="Regresar a Detalle de la cita"
          ruta="/agenda" >
      </HeaderBack>
      <HeaderAgenda
          greeting="Buenos días"
          doctor="Dr. Carlos Hernández"
          currentDate="Viernes, 10 de Julio"
      />
      <DashboardContent>
        <DetallePacienteCard 
            :paciente = "cita.paciente" />
        <br>
      <HistorialCitasCard
            :historial="historial"
            :mostrarBoton="false"
            titulo="Últimas citas del paciente"/>
      </DashboardContent>
      
    </ion-content>
  </ion-page>
</template>

<script setup>
    import { ref } from 'vue'
    import { useRoute } from 'vue-router'
    import ApiService from '@/services/ApiServices'
    import { IonPage, IonContent, onIonViewWillEnter } from '@ionic/vue'
    import HeaderAgenda from '@components/agenda/HeaderAgenda.vue'
    import DetallePacienteCard from '@components/agenda/DetallePacienteCard.vue';
    import DashboardContent from '@components/agenda/DashboardContent.vue';
    import HistorialCitasCard from '@components/agenda/HistorialCitasCard.vue';
    import HeaderBack  from '@components/agenda/HeaderBack.vue';

    const route = useRoute()
    const cita = ref ({
        paciente:{
            nombre:'',
            sexo:'',
            edad:'',
            telefono:''
        },
    })

    const historial = ref([])

    // Función para formatear fecha (si ya la tienes en un helper la importas, si no la mantienes aquí)
    const formatearFechaLegible = (fechaStr) => {
        if (!fechaStr) return ''
        const [anio, mes, dia] = fechaStr.split('-')
        const fecha = new Date(anio, mes - 1, dia)
        const nombreMes = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(fecha)
        return `${dia} de ${nombreMes} ${anio}`
    }

    // Función para cargar TODO el historial sin el recorte de 3 elementos
    const cargarHistorialCompleto = async (pacienteId) => {
        if (!pacienteId) return
        try {
            const res = await ApiService.get(`/api/ionic/HistorialCitas?paciente_id=${pacienteId}`)
            const data = res.data

            // Mapeamos todo el arreglo SIN el .slice(0, 3)
            historial.value = data.map(item => ({
                id: item.folio,
                folio: item.folio,
                fecha: formatearFechaLegible(item.fecha),
                hora: item.hora,
                especialidad: item.especialidad,
                estado: item.estado ? item.estado.trim() : ''
            }))
        } catch (error) {
            console.error("Error al cargar el historial completo del paciente:", error)
        }
    }

   onIonViewWillEnter(() => {
        historial.value = []
        // Capturamos el id del paciente que viajó por el router state
        const pacienteId = history.state?.pacienteId
      
        // 3. DEBUG: Esto te dirá en la consola si el ID logró llegar a esta vista
        console.log("ID del paciente recibido:", pacienteId) 

        if (pacienteId) {
            cita.value.paciente = {
            nombre: history.state?.nombre || '',
            sexo: history.state?.sexo || '',
            edad: history.state?.edad || '',
            telefono: history.state?.telefono || ''
        }
            cargarHistorialCompleto(pacienteId)
        } else {
            console.warn("No llegó el pacienteId desde la vista anterior.")
        }
    })

</script>