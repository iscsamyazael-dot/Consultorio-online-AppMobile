<template>
    <div class="detalle-card">
        <div class="detalle-card-header">
            <ion-icon
                :icon="timeOutline"
                class="detalle-icon"/>

            <span>Historial de citas</span>
        </div>

        <div class="detalle-card-body historial-citas-body">
            <div
                v-if="historial.length > 0">
                <div
                    v-for="cita in historial"
                    :key="cita.id"
                    class="historial-item">
                    <div class="historial-info">
                        <div class="historial-fecha">
                            {{ cita.fecha }}
                        </div>
                        <div class="historial-detalle">
                            {{ cita.hora }} • {{ cita.especialidad }}
                        </div>
                    </div>
                    <span
                        class="estado"
                        :class="estadoClase(cita.estado)">
                        {{ cita.estado }}
                    </span>
                </div>
            </div>
            <div
                v-else
                class="sin-historial">
                <ion-icon :icon="informationCircleOutline"/>
                <span>
                    No existen citas anteriores.
                </span>
            </div>
            <ion-button
                v-if="mostrarBoton"
                 fill="clear"
                class="historial-btn"
                @click="abrirHistorial">
                Ver historial completo
            </ion-button>
        </div>
    </div>
</template>

<script setup>
    import {
        timeOutline,
        informationCircleOutline
    } from 'ionicons/icons'

    import { IonButton, IonIcon } from '@ionic/vue'

    const props = defineProps({
        historial:{
            type:Array,
            default:()=>[]
        },

        mostrarBoton: {
            type: Boolean,
            default: true
        },

        titulo: {
            type: String,
            default: 'Historial Citas'
        }
    })

    const emit = defineEmits([
         'ver-historial'
    ])

    const abrirHistorial = () => {
         emit('ver-historial')
    }



    const estadoClase=(estado)=>{
        console.log("Valor recibido de la BD:", JSON.stringify(estado));
        switch(estado ){
            case 'Finalizada':
                return 'estado-completada'
            case 'Cancelado':
                return 'estado-cancelada'
            case 'Confirmada':
                return 'estado-confirmada'
            case 'Agendado':
                return 'estado-pendiente'
            case 'Inasistencia':
                return 'estado-inasistencia'
            default:
                return ''
        }
    }
</script>