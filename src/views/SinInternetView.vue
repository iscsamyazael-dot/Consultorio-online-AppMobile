<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <div class="sin-internet-container">
                <!-- Icono -->
                <div class="sin-internet-icon">
                    <ion-icon
                        :icon="cloudOfflineOutline"/>
                </div>
                <!-- Título -->
                <h1>
                    Sin conexión a Internet
                </h1>
                <!-- Descripción -->
                <p>
                    No pudimos conectarnos a Internet.
                    Verifica tu conexión e intenta nuevamente.
                </p>
                <!-- Botón -->
                <ion-button
                    class="retry-button"
                    @click="reintentar">
                    <ion-icon
                        slot="start"
                        :icon="refreshOutline"/>
                    Reintentar
                </ion-button>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
    import {
        IonPage,
        IonContent,
        IonIcon,
        IonButton
    } from '@ionic/vue'

    import {
        cloudOfflineOutline,
        refreshOutline
    } from 'ionicons/icons'
    const reintentar = () => {
        console.log('Reintentando conexión...')
    }
</script>