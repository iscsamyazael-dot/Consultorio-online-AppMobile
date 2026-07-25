<template>
  <ion-action-sheet
    :is-open="isOpen"
    header="Cambiar estado"
    :sub-header="paciente"
    :buttons="buttons"
    @didDismiss="cerrar"
  />
</template>

<script setup>

    import { computed } from 'vue'
    import { IonActionSheet } from '@ionic/vue'
    const props = defineProps({
        isOpen:Boolean,
        paciente:String
    })

    const emit = defineEmits([
        'cerrar',
        'estadoSeleccionado'
    ])

    const cerrar = () => {
        emit('cerrar')
    }

    const buttons = computed(() => [
        {
            text:'Marcar como completada',
            role:'selected',
            data:'Completada',
            handler(){
                emit('estadoSeleccionado','Completada')

            }
        },

        {
            text:'Cancelar cita',
            role:'destructive',
            data:'Cancelada',
            handler(){
                emit('estadoSeleccionado','Cancelada')
            }
        },

        {
            text:'Cancelar',
            role:'cancel',
            handler(){
                emit('cerrar')
            }
        }
    ])

</script>