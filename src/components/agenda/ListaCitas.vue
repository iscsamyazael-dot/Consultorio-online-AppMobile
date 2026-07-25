<template>
    <div class="lista-citas">
        <div
            v-for="cita in citas"
            :key="cita.folio"
            class="cita-row"
            @click="verDetalle(cita)">

            <!-- Folio -->
            <div class="cita-col folio">
                <ion-icon :icon="documentTextOutline"/>
                <span>{{ cita.folio }}</span>
            </div>

            <!-- Paciente -->
            <div class="cita-col paciente">
                <ion-icon :icon="personOutline"/>
                <span>{{ cita.NombrePaciente }}</span>
            </div>

            <!-- Hora -->
            <div class="cita-col hora">
                <ion-icon :icon="timeOutline"/>
                <span>{{ cita.hora }}</span>
            </div>

            <!-- Estado -->
            <div class="cita-col estado-col">
                <span
                    class="estado"
                    :class="cita.estado ? cita.estado.toLowerCase() : ''">
                    {{ cita.estado }}
                </span>
            </div>
        </div>

        <!-- Mensaje si no hay citas -->
        <div v-if="!citas || citas.length === 0" class="no-citas">
            <p>No hay citas programadas.</p>
        </div>
    </div>
</template>

<script setup>
    import { IonIcon } from '@ionic/vue'
    import {
        timeOutline,
        personOutline,
        documentTextOutline 
    } from 'ionicons/icons'

    // Recibe los datos limpios enviados desde el componente padre (SegmentContent.vue)
    defineProps({
        citas: {
            type: Array,
            default: () => []
        }
    })

    const emit = defineEmits([
        'ver-detalle'
    ])

    const verDetalle = (cita) => {
        emit('ver-detalle', cita)
    }
</script>