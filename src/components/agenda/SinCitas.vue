<template>
    <div class="sin-citas">
        <ion-icon
            :icon="calendarClearOutline"
            class="sin-citas-icon"/>
        <h2 class="sin-citas-titulo">No hay Citas programadas para hoy.</h2>
        <p class="sin-citas-titulo">
            Las nuevas citas aparecerán aquí automáticamente.
        </p>
        <ion-button
            fill="outline"
            shape="round"
            tab="agenda" href="/agenda">
            Abrir calendario
        </ion-button>
    </div>
</template>
<script setup>

import {
    IonButton,
    IonIcon
} from '@ionic/vue'

import {
    calendarClearOutline
} from 'ionicons/icons'
</script>