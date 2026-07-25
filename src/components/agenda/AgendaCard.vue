<template>

    <div class="agenda-card">
        <!-- Hora -->
        <div class="agenda-card-time">
            {{ cita.hora }}
        </div>
        <!-- Información -->
        <div class="agenda-card-content">
            <h3 class="agenda-card-paciente">
                {{ cita.paciente }}
            </h3>
            <p class="agenda-card-folio">
                {{ cita.folio }}
            </p>
        </div>
        <!-- Estado -->
        <div
            class="agenda-card-status"
            :class="estadoClase">
            {{ cita.estado }}
        </div>
    </div>

</template>

<script setup>

    import { computed } from 'vue'
    const props = defineProps({
        cita:{
            type:Object,
            required:true
        }
    })

    const estadoClase = computed(()=>{
        switch(props.cita.estado){
            case 'Agendado':
                return 'agendado'
            case 'Confirmado':
                return 'confirmado'
            case 'Completado':
                return 'completado'
            case 'Cancelado':
                return 'cancelado'
            case 'Inasistencia':
                return 'inasistencia'
            default:
                return ''
        }
    })

</script>