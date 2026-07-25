<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <HeaderBack
          titulo="Regresar a Agenda"
          ruta="/agenda" >
      </HeaderBack>
      <HeaderAgenda/>
      <DashboardContent>
        <DetallePacienteCard 
            :paciente = "cita.paciente" />
        <br>
        <DetalleCitaCard
            :cita = "cita" />
      <MotivoCitaCard 
            :motivo= "cita.observaciones">
        </MotivoCitaCard>
      <HistorialCitasCard
            :historial="historial"
            :mostrarBoton="true"
            titulo="Historial de citas" 
            @ver-historial="verHistorial"/>
      </DashboardContent>
    </ion-content>
  </ion-page>
</template>

<script setup>
    import ApiService from '@/services/ApiServices'
    import { onIonViewWillEnter } from '@ionic/vue'
    import { useRoute } from 'vue-router'
    import { ref,onMounted,watch } from 'vue'
    import { IonPage, IonContent } from '@ionic/vue'
    import { useRouter } from 'vue-router'
    import HeaderAgenda from '@components/agenda/HeaderAgenda.vue'
    import DetallePacienteCard from '@components/agenda/DetallePacienteCard.vue';
    import DetalleCitaCard from '@components/agenda/DetalleCitaCard.vue';
    import DashboardContent from '@components/agenda/DashboardContent.vue';
    import MotivoCitaCard from '@components/agenda/MotivoCitaCard.vue';
    import HistorialCitasCard from '@components/agenda/HistorialCitasCard.vue';
    import HeaderBack from '@components/agenda/HeaderBack.vue';
    
    const route = useRoute()
    const router = useRouter()
    
   const cita = ref ({
        paciente: {
            nombre: '',
            sexo: '',
            edad: '',
            telefono: ''
        },
        folio: '',
        fecha: '',
        hora: '',
        especialidad: '',
        medico: '',
        tipo: '',
        estado: '',
        observaciones:''
    })

    // Al montar el componente, capturamos el folio de la URL y consultamos el detalle
    const cargarDetalleCita = async (folioCita) => {
        if (!folioCita) return
        try {
            const res = await ApiService.get(`/api/ionic/DetalleCita?folio=${folioCita}`)
            const data = res.data

            // Mapeamos los datos devueltos por tu consulta SQL a la estructura de las tarjetas
            cita.value = {
                folio: data.folio,
                fecha: data.fecha,
                hora: data.hora,
                especialidad: data.especialidad,
                medico: data.medico,
                tipo: data.tipo,
                estado: data.estado,
                observaciones: data.observaciones,
                paciente: {
                    id: data.paciente_id,
                    nombre: data.NombrePaciente,
                    sexo: data.genero,
                    edad: data.edad,
                    telefono: data.telefono
                }
            }
            // Una vez cargado el paciente, traemos sus 3 citas más recientes del historial
            if (data.paciente_id) {
                cargarHistorialPaciente(data.paciente_id)
            }
        } catch (error) {
            console.error("Error al cargar el detalle de la cita:", error)
        }
    }
    
    // 1. Creamos una referencia reactiva para el folio actual
    const folioActual = ref(history.state?.folio || '')

    // 3. Hook nativo de Ionic que se ejecuta cada vez que entras a la vista
    onIonViewWillEnter(() => {
        const folioEntrante = history.state?.folio
        if (folioEntrante) {
            
            // 1. LIMPIAMOS los datos anteriores de inmediato para evitar que se queden colgados en pantalla
            cita.value = {
                paciente: { nombre: '', sexo: '', edad: '', telefono: '' },
                folio: '', fecha: '', hora: '', especialidad: '', medico: '', tipo: '', estado: '', observaciones: ''
            }
            historial.value = []

            // 2. Actualizamos el folio y disparamos la carga de la nueva cita
            folioActual.value = folioEntrante
            cargarDetalleCita(folioEntrante)
            
        }
    })

    // 1. Se ejecuta cuando se carga la vista por primera vez
   onMounted(() => {
        if (folioActual.value) {
            cargarDetalleCita(folioActual.value)
        }
    })
    // 2. IMPORTANTE: Vigila si el folio cambia en la URL estando en la misma vista
    watch(
        folioActual,
        (nuevoFolio) => {
            if (nuevoFolio) {
                cargarDetalleCita(nuevoFolio)
            }
        }
    )

    // 1. Función auxiliar para formatear la fecha como "21 de julio 2026"
    const formatearFechaLegible = (fechaStr) => {
        if (!fechaStr) return ''
        const [anio, mes, dia] = fechaStr.split('-')
        const fecha = new Date(anio, mes - 1, dia)
        
        const nombreMes = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(fecha)
        
        return `${dia} de ${nombreMes} ${anio}`
    }
    

    //Historial del paciente respecto al mes en citas pasadas
    // Variable reactiva para el historial
    const historial = ref([])

    // Función para cargar el historial de citas pasadas del paciente
    const cargarHistorialPaciente = async (pacienteId) => {
        if (!pacienteId) return
        try {
            // Llamada al endpoint adaptado que filtre por paciente y traiga el orden descendente (pasadas)
            const res = await ApiService.get(`/api/ionic/HistorialCitas?paciente_id=${pacienteId}`)
            const data = res.data

            // Tomamos únicamente los primeros 3 registros recientes para esta vista principal
            historial.value = data.slice(0, 3).map(item => ({
                id: item.folio,
                folio: item.folio,
                fecha: formatearFechaLegible(item.fecha),
                hora: item.hora,
                especialidad: item.especialidad,
                estado: item.estado ? item.estado.trim() : ''
            }))
        } catch (error) {
            console.error("Error al cargar el historial del paciente:", error)
        }
    }

    // Modificamos el evento del botón para enviar el paciente actual a la vista completa
    const verHistorial = () => {
        router.push({
            name: 'HistorialCitas', // Asegúrate que este sea el nombre de tu ruta o usa la ruta directa 'historial-citas'
            state: { pacienteId: cita.value.paciente.id,
                    // Pasamos un objeto plano con las propiedades primitivas exactas
                    nombre: cita.value.paciente.nombre,
                    sexo: cita.value.paciente.sexo,
                    edad: cita.value.paciente.edad,
                    telefono: cita.value.paciente.telefono
             } 

        })
    }
    
</script>