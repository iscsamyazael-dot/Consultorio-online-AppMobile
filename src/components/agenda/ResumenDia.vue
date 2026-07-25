<template>
    <div class="resumen-dia">
        <!-- Total de citas -->
        <div class="resumen-total-card">
            <div class="resumen-icon total">
                <ion-icon :icon="calendarOutline" />
            </div>
            <div class="resumen-total-info">
                <span class="titulo">
                    {{ resumen.total }}
                </span>
                <span class="subtitulo">
                    {{ resumen.texto }}
                </span>
            </div>
        </div>
        <!-- Estados -->
        <div
            v-for="estado in resumen.estados"
            :key="estado.nombre"
            class="resumen-item">
            <div class="resumen-info">
                <div
                    class="resumen-icon"
                    :class="estado.clase">
                    <ion-icon
                        :icon="obtenerIcono(estado.clase)" />
                </div>
                <span>
                    {{ estado.nombre }}
                </span>
            </div>
            <strong class="resumen-contador">
                {{ estado.total }}
            </strong>
        </div>
    </div>
</template>


<script setup>

import { IonIcon } from '@ionic/vue'

import {

    calendarOutline,
    checkmarkCircle,
    timeOutline,
    closeCircle,
    banOutline,
    calendarNumberOutline
} from 'ionicons/icons'

defineProps({

    resumen:{
        type:Object,
        required:true
    }

})

const obtenerIcono=(clase)=>{

    switch(clase){

        case 'confirmado':
            return checkmarkCircle

        case 'agendado':
            return timeOutline
        
        case 'finalizada': // <-- 2. Agrega este caso
            return calendarNumberOutline // o calendarOutline si prefieres

        case 'cancelado':
            return closeCircle

        case 'inasistencia':
            return banOutline

        default:
            return calendarOutline

    }

}

</script>