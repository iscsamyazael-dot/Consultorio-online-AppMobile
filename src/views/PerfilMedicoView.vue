<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <HeaderBack
                titulo="Perfil médico"/>
            <div class="perfil-medico" v-if="medicoConfig.length >0">
                <div class="perfil-header">
                    <div class="perfil-avatar">
                        <ion-icon :icon="personCircleOutline" />
                    </div>
                    <h1>{{ medicoConfig[0].nombre }}</h1>
                    <p>{{ medicoConfig[0].especialidad }}</p>
                </div>
                <div class="perfil-card">
                    <div class="perfil-card-header">
                        <ion-icon :icon="briefcaseOutline" />
                        <span>
                            Información profesional
                        </span>
                    </div>
                    <div class="perfil-info">
                        <div class="info-item">
                            <span class="info-label">
                                Cédula profesional
                            </span>
                            <span class="info-value">
                                {{ medicoConfig[0].cedula }}
                            </span>
                        </div>

                        <div class="info-item">
                            <span class="info-label">
                                Especialidad
                            </span>
                            <span class="info-value">
                                {{ medicoConfig[0].especialidad }}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="perfil-card">
                    <div class="perfil-card-header">
                        <ion-icon :icon="businessOutline" />
                        <span>
                            Consultorio
                        </span>
                    </div>
                    <div class="perfil-info">
                        <div class="info-item">
                            <span class="info-label">
                                Nombre
                            </span>
                            <span class="info-value">
                                {{ medicoConfig[0].lugar  }}
                            </span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">
                                Dirección
                            </span>
                            <span class="info-value">
                                {{ medicoConfig[0].direccion  }}
                            </span>
                        </div>
                        <div class="info-item" v-for="(medic, index) in medicoConfig" :key="index">
                            <span class="info-label">
                                Horario
                            </span>
                            <span class="info-value">
                                {{ medic.dias_atencion }}
                                <br>
                                {{ medic.horarios }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
<script setup>

    import { ref, onMounted, computed } from 'vue';
    import ApiService from '@/services/ApiServices'; // Asegúrate de que la ruta sea correcta
    import { useRouter } from 'vue-router'
   

    import {
        IonPage,
        IonContent,
        IonIcon
    } from '@ionic/vue'

    import {
        personCircleOutline,
        briefcaseOutline,
        businessOutline
    } from 'ionicons/icons'

    import HeaderBack from '@/components/agenda/HeaderBack.vue'

    const router = useRouter()

    const regresar = () => {
        router.back()
    }
    // 1. Estado reactivo (equivale a tu data())
   const medicoConfig = ref({});
   const verConfiguracionMedico = async () => {
        try {
            const response = await ApiService.get('/api/ionic/MedicoConfiguracion');
            console.log("Datos recibidos de MedicoConfiguracion:", response.data);
            medicoConfig.value = response.data; // En Composition API usamos .value
        } catch (error) {
            console.error("Error al obtener datos:", error);
        }
    };

    // 2. Ciclo de vida (equivale a mounted())
    onMounted(() => {
        verConfiguracionMedico();
    });



</script>