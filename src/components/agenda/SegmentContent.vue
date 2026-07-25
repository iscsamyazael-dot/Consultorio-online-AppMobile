<template>
    <div class="segment-content">
        <!-- Hoy -->
        <template v-if="vista === 'hoy'">
            <ResumenDia :resumen="ResumenCitas" />
            <ListaCitas :citas="listaCitasActual" @ver-detalle="verDetalleCita" />
        </template>
        <!-- Mañana -->
        <template v-else-if="vista === 'manana'">
            <ResumenDia :resumen="ResumenCitas" />
            <ListaCitas :citas="listaCitasActual" @ver-detalle="verDetalleCita" />
        </template>
        <!-- Semana -->
        <template v-else-if="vista === 'semana'">
            <ResumenDia :resumen="ResumenCitas" />
            <ListaCitas :citas="listaCitasActual" @ver-detalle="verDetalleCita" />
        </template>
        <!-- Mes -->
        <template v-else>
            <CalendarioAgenda/>
        </template>
    </div>
</template>

<script setup>
    import { ref, watch, onMounted } from 'vue'
    import ApiService from '@/services/ApiServices'
    import ResumenDia from './ResumenDia.vue'
    import ListaCitas from './ListaCitas.vue'
    import CalendarioAgenda from './CalendarioAgenda.vue'

    const props = defineProps({
        vista:{
            type:String,
            default:'mes'
        }
    })

    const ResumenCitas= ref({
        total:0,
        texto:'citas programadas',
        estados:[
            {
                nombre:'Confirmadas',
                total:0,
                clase:'confirmado'
            },

            {
                nombre:'Agendadas',
                total:0,
                clase:'agendado'
            },

            {
                nombre: 'Finalizadas', // <-- NUEVA CATEGORÍA
                total: 0,
                clase: 'finalizado'    // Asegúrate de tener o definir esta clase CSS si la requieres
            },

            {
                nombre:'Canceladas',
                total:0,
                clase:'cancelado'
            }
        ]
    })
    
    // Arreglo reactivo para guardar la lista específica de la vista activa
    const listaCitasActual = ref([])

    const cargarDatosPorVista = async (filtroActual) => {
        if (filtroActual === 'mes') return;

        try {
            // 1. Cargamos el resumen de tarjetas
            const resResumen = await ApiService.get(`/api/ionic/ResumenCitas?filtro=${filtroActual}`);
            const dataResumen = resResumen.data;

            ResumenCitas.value.total = dataResumen.citas_total;
            ResumenCitas.value.estados[0].total = dataResumen.confirmadas;
            ResumenCitas.value.estados[1].total = dataResumen.pendientes;
            ResumenCitas.value.estados[2].total = dataResumen.finalizadas; // <-- Mapeamos las finalizadas
            ResumenCitas.value.estados[3].total = dataResumen.canceladas;  // <-- Desplazamos las canceladas al índice 3

            // 2. Cargamos la lista de citas filtrada exactamente para este periodo
            const resLista = await ApiService.get(`/api/ionic/ListaCitasHoyMañanaSemana?filtro=${filtroActual}`);
            listaCitasActual.value = resLista.data;

        } catch (error) {
            console.error("Error al cargar los datos de la agenda:", error);
            listaCitasActual.value = [];
        }
    }

    onMounted(() => {
        cargarDatosPorVista(props.vista);
    });

    watch(() => props.vista, (nuevaVista) => {
        cargarDatosPorVista(nuevaVista);
    });

    const verDetalleCita = (cita) => {
        console.log('Detalle de cita:', cita);
    }
</script>