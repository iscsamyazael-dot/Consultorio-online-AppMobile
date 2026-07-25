<template>
    <div
        class="estado-chip"
        :class="estadoClass"
        @click="abrirPopover($event)">

        <ion-icon
            :icon="icono"
            class="estado-icon"/>

        <span class="estado-texto">
            {{ estado }}
        </span>

        <ion-icon
            :icon="chevronDownOutline"
            class="estado-flecha"/>
    </div>

    <ion-popover
        class="estado-popover"
        :is-open="popoverAbierto"
        :event="evento"
        @didDismiss="popoverAbierto = false">

        <ion-content>
            <ion-list lines="none">
                <ion-item
                    button
                    @click="seleccionar('Finalizada')">
                    <ion-icon
                        slot="start"
                        :icon="checkmarkCircleOutline"
                        color="success"/>
                    <ion-label>
                        Finalizada
                    </ion-label>
                </ion-item>

                <ion-item
                    button
                    @click="seleccionar('Cancelada')">
                    <ion-icon
                        slot="start"
                        :icon="closeCircleOutline"
                        color="danger"/>
                    <ion-label>
                        Cancelada
                    </ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-popover>

</template>

<script setup>

import {
    IonPopover,
    IonList,
    IonItem,
    IonLabel,
    IonContent,
    IonIcon
} from '@ionic/vue'

import {
    checkmarkCircleOutline,
    closeCircleOutline,
    chevronDownOutline,
    timeOutline
} from 'ionicons/icons'

import { ref, computed } from 'vue'

const props = defineProps({
    estado:String
})

const emit = defineEmits([
    'cambiarEstado'
])

const popoverAbierto = ref(false)
const evento = ref()

const abrirPopover = (ev)=>{
    evento.value = ev
    popoverAbierto.value = true
}

const seleccionar = (estado)=>{
    popoverAbierto.value = false
    emit('cambiarEstado',estado)
}

const icono = computed(()=>{
    switch(props.estado){
        case 'Confirmada':
            return checkmarkCircleOutline
        case 'Agendada':
            return timeOutline
        case 'Cancelada':
            return closeCircleOutline
        case 'Finalizada':
            return checkmarkCircleOutline
        default:
            return timeOutline
    }

})

const estadoClass = computed(()=>{
    switch(props.estado){
        case 'Confirmada':
            return 'estado-confirmada'
        case 'Agendada':
            return 'estado-agendada'
        case 'Cancelada':
            return 'estado-cancelada'
        case 'Finalizada':
            return 'estado-completada'
        default:
            return ''
    }

})

</script>