<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <div class="login-container">
                <!-- Encabezado -->
                <div class="login-header">
                    <div class="login-logo">
                        <ion-icon
                            :icon="medicalOutline"/>
                    </div>
                    <h1>
                        Consultorio Online
                    </h1>
                    <p>
                        Inteligente
                    </p>
                    <span>
                        Inicia sesión para continuar
                    </span>
                </div>

                <!-- Formulario -->
                <div class="login-form">
                    <!-- Correo -->
                    <div class="login-field">
                        <label>
                            Correo electrónico
                        </label>
                        <div class="login-input">
                            <ion-icon
                                :icon="mailOutline" />
                            <ion-input
                                v-model="email"
                                type="email"
                                placeholder="correo@consultorio.com"/>
                        </div>
                    </div>

                    <!-- Contraseña -->
                    <div class="login-field">
                        <label>
                            Contraseña
                        </label>
                        <div class="login-input">
                            <ion-icon
                                :icon="lockClosedOutline"/>
                            <ion-input
                                v-model="password"
                                :type="
                                    mostrarPassword
                                        ? 'text'
                                        : 'password'"
                                placeholder="Ingresa tu contraseña"/>

                            <ion-button
                                fill="clear"
                                class="password-toggle"
                                @click="
                                    mostrarPassword =
                                    !mostrarPassword">
                                <ion-icon
                                    :icon="
                                        mostrarPassword
                                            ? eyeOffOutline
                                            : eyeOutline"/>
                            </ion-button>
                        </div>
                    </div>

                    <!-- Recuperar contraseña -->
                    <div class="forgot-password">
                        <span>
                            ¿Olvidaste tu contraseña?
                        </span>
                    </div>
                    <!-- Botón -->
                    <ion-button
                        expand="block"
                        class="login-button"
                        @click="iniciarSesion"
                        :disabled="cargando">
                        {{ cargando ? 'Cargando...' : 'Iniciar sesión' }}
                    </ion-button>
                    <!-- Mensaje de error dinámico en un span -->
                    <br>
                    <span v-if="mensajeError" class="error-text">
                        {{ mensajeError }}
                    </span>
                </div>

                <!-- Pie -->
                <div class="login-footer">
                    <span>
                        Consultorio Online Inteligente
                    </span>
                    <small>
                        © 2026
                    </small>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>


<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import apiServices from '@/services/ApiServices' // Importamos apiService para el consumo de las apis
    
    import {
        IonPage,
        IonContent,
        IonIcon,
        IonInput,
        IonButton
    } from '@ionic/vue'

    import {
        medicalOutline,
        mailOutline,
        lockClosedOutline,
        eyeOutline,
        eyeOffOutline
    } from 'ionicons/icons'

    
    
    const router = useRouter() // 2. Definición global en el setup
    const email = ref('')
    const password = ref('')
    const mostrarPassword = ref(false)
    const cargando = ref(false)
    const mensajeError = ref('') // Variable reactiva para el texto de error
    
    const iniciarSesion = async () => {
        localStorage.removeItem('token'); // <-- Agrega esto para limpiar cualquier token previo
        cargando.value = true
        try {
            const response = await apiServices.post('/api/ionic/login', {
                email: email.value,
                password: password.value
            })

            // Guardamos el token en localStorage
            localStorage.setItem('token', response.data.token)
            
            console.log('Login exitoso:', response.data)
            
            // Redirigir al dashboard (ajusta la ruta según tu router)
            router.push('/dashboard') 
        } catch (error) {
            console.error("Error al iniciar sesión:", error)
            mensajeError.value = error.response?.data?.message || "Usuario o Contraseña no validos"
        } finally {
            cargando.value = false
        }
    }


</script>