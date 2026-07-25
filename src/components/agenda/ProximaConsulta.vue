<template>
    <div class="next-consultation">
        <div class="section-title">
            Próxima Cita
        </div>
        <div class="consultation-card" v-if="cita">
            <!-- Paciente -->
            <div class="consultation-patient">
                <ion-icon :icon="personCircleOutline"/>
                <div>
                    <h2>{{ cita.paciente }}</h2>
                    <p>{{ cita.observaciones }}</p>
                </div>
            </div>

            <!-- Hora -->
            <div class="consultation-info">
                <div class="info-item">
                    <ion-icon :icon="timeOutline"/>
                    <span>{{ cita.hora }}</span>
                </div>

                <div class="info-item">
                    <ion-icon :icon="timerOutline"/>
                    <span>30 min</span>
                </div>
            </div>

            <!-- Lugar -->
            <div class="consultation-location">
                <ion-icon :icon="locationOutline"/>
                <span>Consultorio 2</span>
            </div>

            <div class="consultation-status">
                <span class="status-title">
                    Estado
                </span>
                <EstadoCitaSelect
                    :estado="cita.estado"
                    @cambiarEstado="manejarCambioEstado"/>
            </div>
        </div>
        
        <!-- Mensaje por si no hay ninguna próxima consulta pendiente -->
        <div v-else class="no-proxima">
            <p>No hay consultas pendientes en puerta.</p>
        </div>
    </div>
</template>

<script setup>
    import { defineProps, defineEmits } from 'vue'
    import EstadoCitaSelect from './EstadoCitaSelect.vue'
    import { IonIcon } from '@ionic/vue';
    import {
        personCircleOutline,
        timeOutline,
        timerOutline,
        locationOutline
    } from 'ionicons/icons'

    // Definimos las props que recibirá del componente padre
    const props = defineProps({
        cita: {
            type: Object,
            default: null
        }
    })

    const emit = defineEmits(['cambiarEstado']);

    const manejarCambioEstado = (nuevoEstado) => {
        // Reenviamos el cambio al componente padre junto con el ID de la cita actual
        emit('cambiarEstado', {
            id: props.cita.id,
            estadoNuevo: nuevoEstado
        })
    }
</script>