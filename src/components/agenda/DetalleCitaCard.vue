<template>

    <div class="detalle-card">

        <div class="detalle-card-header">
            <ion-icon
                :icon="calendarOutline"
                class="detalle-icon"/>
            <span>Información de la cita</span>
        </div>

        <div class="detalle-card-body">

            <!-- Folio -->
            <div class="detalle-box detalle-box-full">

                <div class="detalle-label">
                    <ion-icon
                        :icon="documentTextOutline"
                        class="detalle-item-icon"/>

                    <span>Folio</span>
                </div>

                <div class="detalle-value">
                    {{ cita.folio }}
                </div>

            </div>

            <div class="detalle-grid">

                <!-- Fecha -->
                <div class="detalle-box">

                    <div class="detalle-label">
                        <ion-icon
                            :icon="calendarOutline"
                            class="detalle-item-icon"/>

                        <span>Fecha</span>
                    </div>

                    <div class="detalle-value">
                        {{ cita.fecha }}
                    </div>

                </div>

                <!-- Hora -->
                <div class="detalle-box">

                    <div class="detalle-label">
                        <ion-icon
                            :icon="timeOutline"
                            class="detalle-item-icon"/>

                        <span>Hora</span>
                    </div>

                    <div class="detalle-value">
                        {{ cita.hora }}
                    </div>

                </div>

                <!-- Especialidad -->
                <div class="detalle-box">

                    <div class="detalle-label">
                        <ion-icon
                            :icon="medkitOutline"
                            class="detalle-item-icon"/>

                        <span>Especialidad</span>
                    </div>

                    <div class="detalle-value">
                        {{ cita.especialidad }}
                    </div>

                </div>

                <!-- Médico -->
                <div class="detalle-box">

                    <div class="detalle-label">
                        <ion-icon
                            :icon="personOutline"
                            class="detalle-item-icon"/>

                        <span>Médico</span>
                    </div>

                    <div class="detalle-value">
                        {{ cita.medico }}
                    </div>

                </div>

                <!-- Tipo -->
                <div class="detalle-box">

                    <div class="detalle-label">
                        <ion-icon
                            :icon="bookmarkOutline"
                            class="detalle-item-icon"/>

                        <span>Tipo</span>
                    </div>

                    <div class="detalle-value">
                        {{ cita.tipo }}
                    </div>

                </div>

                <!-- Estado -->
                <div class="detalle-box">

                    <div class="detalle-label">
                        <ion-icon
                            :icon="checkmarkCircleOutline"
                            class="detalle-item-icon"/>

                        <span>Estado</span>
                    </div>

                    <span
                        class="estado"
                        :class="estadoClase">

                        {{ cita.estado }}

                    </span>

                </div>

            </div>

        </div>

    </div>

</template>

<script setup>
    
    import { computed } from 'vue'
    import {
        calendarOutline,
        timeOutline,
        medkitOutline,
        personOutline,
        documentTextOutline,
        bookmarkOutline,
        checkmarkCircleOutline
    } from 'ionicons/icons'
    const props = defineProps({
        cita:{
            type:Object,
            required:true
        }
    })

    const estadoClase = computed(()=>{
        switch(props.cita.estado){
            case 'Confirmada':
                return 'confirmado'
            case 'Agendado':
                return 'agendado'
            case 'Cancelada':
                return 'cancelado'
            case 'Finalizada':
                return 'finalizada'
            default:
                return ''
        }
    })
</script>