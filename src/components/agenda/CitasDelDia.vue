<template>
    <div class="citas-dia">
        <div class="section-title">
            Citas del Día
        </div>
        <AgendaItem
            v-for="cita in citas"
            :key="cita.id"
            :id="cita.id"
            :hora="cita.hora"
            :paciente="cita.paciente"
            :motivo="cita.observaciones"
            :estado="cita.estado"
            @cambiarEstado = "abrirEstado"
        />
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import ApiService from '@/services/ApiServices'
    import AgendaItem from './AgendaItem.vue'
    
    const citas = ref([])
    const emit = defineEmits(['actualizar-pendientes','citas-cargadas','cambiarEstado']) // <-- 1. Declaramos el evento
    // Función para cargar las citas del día desde la API
    const cargarCitasDelDia = async () => {
        try {
            const response = await ApiService.get('/api/ionic/CitasDelDia');
            console.log("Citas del día recibidas:", response.data);
            citas.value = response.data;
           // 1. Emitimos la cantidad para el control de vistas vacías
            emit('actualizar-pendientes', citas.value.length);

            // 2. Emitimos el arreglo completo para la ProximaConsulta en el padre
            emit('citas-cargadas', response.data);

        } catch (error) {
            console.error("Error al obtener las citas del día:", error);
            emit('actualizar-pendientes', 0);
            emit('citas-cargadas', []);
        }
    };

    onMounted(() => {
        cargarCitasDelDia();
    });

    const abrirEstado = (datos) => {
        console.log('Cita seleccionada:', datos)
        const cita = citas.value.find(c => c.id === datos.id)
        if (cita) {
            cita.estado = datos.estadoNuevo
        }
        emit('cambiarEstado', datos)
    }
</script>