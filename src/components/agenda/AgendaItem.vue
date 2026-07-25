<template>

    <div class="agenda-item">
        <!-- Hora -->
        <div class="agenda-time">
            <ion-icon
                :icon="timeOutline"/>
            <span>{{ hora }}</span>
        </div>
        <!-- Información -->
        <div class="agenda-info">
            <h3>{{ paciente }}</h3>
            <p>{{ motivo }}</p>
        </div>
        <!-- Estado -->
        <div class="agenda-status">
           <EstadoCitaSelect
                :estado="estado"
                @cambiarEstado = "cambiarEstado">
            </EstadoCitaSelect>
        </div>
    </div>

</template>

<script setup>

    import { IonIcon } from '@ionic/vue'
    import { timeOutline } from 'ionicons/icons'
    import { computed } from 'vue'
    import EstadoCitaSelect from './EstadoCitaSelect.vue'

    const props = defineProps({
        id:Number,
        hora: String,
        paciente: String,
        motivo: String,
        estado: String
    })

    const emit = defineEmits([
        'cambiarEstado'
    ])

    const cambiarEstado = (nuevoEstado) => {
        emit('cambiarEstado', {
            id:props.id,
            hora: props.hora,
            paciente: props.paciente,
            motivo: props.motivo,
            estadoAnterior: props.estado,
            estadoNuevo: nuevoEstado
        })
    }

</script>