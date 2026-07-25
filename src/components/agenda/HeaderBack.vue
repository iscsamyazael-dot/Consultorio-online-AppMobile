<template>
    <div class="header-back">
        <ion-button
            fill="clear"
            class="back-btn"
            @click="regresar">
            <ion-icon
                :icon="arrowBackOutline" />
        </ion-button>
        <h2 class="header-back-title">
            {{ titulo }}
        </h2>
    </div>
</template>

<script setup>
    import {
        IonButton,
        IonIcon
    } from '@ionic/vue'
    import { useRouter } from 'vue-router'
    import {
        arrowBackOutline
    } from 'ionicons/icons'
    const props = defineProps({
        titulo: {
            type: String,
            required: true
        },
        ruta: {
            type: String,
            default: ''
        }
    })

    const router = useRouter()
    const regresar = () => {
        if (props.ruta) {
            router.push(props.ruta)
        } else {
            router.back()
        }
    }

</script>