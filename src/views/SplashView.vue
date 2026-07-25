<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <div class="splash-container">
                <!-- Logo -->
                <div class="splash-logo">
                    <ion-icon
                        :icon="medicalOutline"/>
                </div>
                <!-- Nombre de la aplicación -->
                <div class="splash-brand">
                    <h1>
                        Consultorio Online
                    </h1>
                    <h2>
                        Inteligente
                    </h2>
                </div>
                <!-- Mensaje -->
                <p class="splash-subtitle">
                    Gestión médica inteligente
                </p>

                <!-- Indicador de carga -->
                <div class="splash-loading">
                    <ion-spinner
                        name="crescent"/>
                    <span>
                        Cargando...
                    </span>
                </div>

                <!-- Versión -->
                <span class="splash-version">
                    Versión 1.0
                </span>
            </div>
        </ion-content>
    </ion-page>
</template>


<script setup>
    import { onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import {
        IonPage,
        IonContent,
        IonIcon,
        IonSpinner
    } from '@ionic/vue'

    import {
        medicalOutline
    } from 'ionicons/icons'
    
    const router = useRouter()

    onMounted(() => {
        setTimeout(() => {
            router.replace('/login')
        }, 2500)
    })

</script>