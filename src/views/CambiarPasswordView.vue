<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <HeaderBack
                 titulo="Cambiar contraseña"/>
                <div class="cambiar-password">
                    <div class="password-card">
                        <div class="password-icon">
                            <ion-icon
                                :icon="lockClosedOutline"/>
                        </div>
                        <h1>
                            Cambiar contraseña
                        </h1>
                        <p class="password-description">
                            Actualiza la contraseña de tu cuenta para mantener
                            tu acceso seguro.
                        </p>
                        <!-- Contraseña actual -->
                        <div class="password-field">
                            <label>
                                Contraseña actual
                            </label>
                            <div class="password-input">
                                <ion-input
                                    :type="mostrarPasswordActual ? 'text' : 'password'"
                                    placeholder="Ingresa tu contraseña actual"
                                    v-model="passwordActual"/>
                                <ion-button
                                    fill="clear"
                                    class="password-toggle"
                                    @click="mostrarPasswordActual = !mostrarPasswordActual">
                                    <ion-icon
                                        :icon="
                                            mostrarPasswordActual
                                                ? eyeOffOutline
                                                : eyeOutline"/>
                                </ion-button>
                            </div>
                        </div>
                        <!-- Nueva contraseña -->
                        <div class="password-field">
                            <label>
                                Nueva contraseña
                            </label>
                            <div class="password-input">
                                <ion-input
                                    :type="mostrarNuevaPassword ? 'text' : 'password'"
                                    placeholder="Ingresa una nueva contraseña"
                                    v-model="nuevaPassword"/>
                                    <ion-button
                                        fill="clear"
                                        class="password-toggle"
                                        @click="mostrarNuevaPassword = !mostrarNuevaPassword">
                                        <ion-icon
                                            :icon="
                                                mostrarNuevaPassword
                                                    ? eyeOffOutline
                                                    : eyeOutline"/>
                                    </ion-button>
                            </div>
                        </div>
                        <!-- Confirmar contraseña -->
                        <div class="password-field">
                            <label>
                                Confirmar nueva contraseña
                            </label>
                            <div class="password-input">
                                <ion-input
                                    :type="mostrarConfirmacion ? 'text' : 'password'"
                                    placeholder="Confirma tu nueva contraseña"
                                    v-model="confirmacionPassword"/>
                                <ion-button
                                    fill="clear"
                                    class="password-toggle"
                                    @click="mostrarConfirmacion = !mostrarConfirmacion">
                                    <ion-icon
                                        :icon="
                                            mostrarConfirmacion
                                                ? eyeOffOutline
                                                : eyeOutline"/>
                                </ion-button>
                            </div>
                        </div>
                        <ion-button
                            expand="block"
                            class="password-button"
                            @click="cambiarPassword">
                            Cambiar contraseña
                        </ion-button>
                    </div>
                </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
    import { ref } from 'vue'
    import {
        IonPage,
        IonContent,
        IonIcon,
        IonInput,
        IonButton,
        toastController
    } from '@ionic/vue'

    import {
        lockClosedOutline,
        eyeOutline,
        eyeOffOutline
    } from 'ionicons/icons'

    import HeaderBack from '@/components/agenda/HeaderBack.vue'
    import ApiService from '@/services/ApiServices'
    const passwordActual = ref('')
    const nuevaPassword = ref('')
    const confirmacionPassword = ref('')
    const mostrarPasswordActual = ref(false)
    const mostrarNuevaPassword = ref(false)
    const mostrarConfirmacion = ref(false)
    
   const mostrarAlerta = async (mensaje, color = 'success') => {
    const toast = await toastController.create({
        message: mensaje,
        duration: 2000,
        color: color,
        position: 'bottom'
    })
    await toast.present()
}
    
    const cambiarPassword = async () => {
        if (!passwordActual.value || !nuevaPassword.value || !confirmacionPassword.value) {
            mostrarAlerta({
                message: 'Por favor completa todos los campos.',
                duration: 2000,
                color: 'warning'
            })
            return
        }
        if (nuevaPassword.value !== confirmacionPassword.value) {
            mostrarAlerta({
                message: 'Las nuevas contraseñas no coinciden.',
                duration: 2000,
                color: 'danger'
            })
            return
        }
        try {
            const response = await ApiService.put('/api/ionic/ActualizarContrasenia', {
                current_password: passwordActual.value,
                new_password: nuevaPassword.value
            })
            mostrarAlerta({
                message: response.data.message || 'Contraseña actualizada correctamente.',
                duration: 2000,
                color: 'success'
            })
            // Limpiar formulario
            passwordActual.value = ''
            nuevaPassword.value = ''
            confirmacionPassword.value = ''
        } catch (error) {
            const mensaje = error.response?.data?.message || 'Error al actualizar la contraseña.'
            mostrarAlerta({
                message: mensaje,
                duration: 2500,
                color: 'danger'
            })
        }
    }
</script>