<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <HeaderBack
                titulo="Configuración"/>
            <div class="configuracion">
                <!-- ==============================
                     NOTIFICACIONES
                =============================== -->
                <div class="config-card">
                    <div class="config-card-header">
                        <ion-icon
                            :icon="notificationsOutline"/>
                        <span>
                            Notificaciones
                        </span>
                    </div>

                    <div class="config-item">
                        <div class="config-item-info">
                            <span class="config-item-title">
                                Notificaciones de citas
                            </span>
                            <span class="config-item-description">
                                Recibe avisos sobre nuevas citas y cambios.
                            </span>
                        </div>
                        <ion-toggle 
                            v-model="notificacionesActivas" />
                    </div>
                </div>
                <!-- ==============================
                     APARIENCIA
                =============================== -->
                <div class="config-card">
                    <div class="config-card-header">
                        <ion-icon
                            :icon="colorPaletteOutline"/>
                        <span>
                            Apariencia
                        </span>
                    </div>


                    <div class="config-item">
                        <div class="config-item-info">
                            <span class="config-item-title">
                                Tema oscuro
                            </span>
                            <span class="config-item-description">
                                Cambiar entre tema claro y oscuro.
                            </span>
                        </div>
                        <ion-toggle 
                             v-model="temaOscuro"
                             @ionChange="cambiarTema"/>
                    </div>
                </div>
                <!-- ==============================
                     SEGURIDAD
                =============================== -->
                <div class="config-card">
                    <div class="config-card-header">
                        <ion-icon
                            :icon="lockClosedOutline"/>
                        <span>
                            Seguridad
                        </span>
                    </div>
                    <div class="config-action"
                         @click="abrirCambiarPassword">
                        <div class="config-action-info">
                            <ion-icon
                                :icon="keyOutline"/>
                            <span>
                                Cambiar contraseña
                            </span>
                        </div>
                        <ion-icon
                            :icon="chevronForwardOutline"/>
                    </div>
                </div>
                <!-- ==============================
                     INFORMACIÓN
                =============================== -->
                <div class="config-card">
                    <div class="config-card-header">
                        <ion-icon
                            :icon="informationCircleOutline"/>
                        <span>
                            Información
                        </span>
                    </div>
                    <div class="config-info">
                        <span>
                            Consultorio Online Inteligente
                        </span>
                        <span>
                            Versión 1.0.0
                        </span>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>


<script setup>
    import {
        IonPage,
        IonContent,
        IonIcon,
        IonToggle
    } from '@ionic/vue'
    import {
        notificationsOutline,
        colorPaletteOutline,
        lockClosedOutline,
        keyOutline,
        chevronForwardOutline,
        informationCircleOutline
    } from 'ionicons/icons'
    import HeaderBack from '@/components/agenda/HeaderBack.vue'
    
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'

    const notificacionesActivas = ref(true)
    const temaOscuro = ref(false)
    const router = useRouter()
    
    const cambiarTema = (event) => {
        const activo = event.detail.checked
        document.documentElement.setAttribute(
            'data-theme',
            activo ? 'dark' : 'light'
        )
    }

    const abrirCambiarPassword = () => {
         router.push('/cambiar-password')
    }


</script>