<template>
    <div class="detalle-card">
        <div class="detalle-card-header">
            <ion-icon
                :icon="chatbubbleEllipsesOutline"
                class="detalle-icon"/>
            <span>Motivo de la cita</span>
        </div>
        <div class="detalle-card-body motivo-cita-body">
            <div
                v-if="motivo"
                class="motivo-texto">
                {{ motivo }}
            </div>
            <div
                v-else
                class="sin-motivo">
                <ion-icon :icon="informationCircleOutline"/>
                <span>
                    No se registró un motivo para esta cita.
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {
        chatbubbleEllipsesOutline,
        informationCircleOutline
    } from 'ionicons/icons'
    import { IonIcon } from '@ionic/vue'
    
    defineProps({
        motivo:{
            type:String,
            default:''
        }
    })
    
</script>