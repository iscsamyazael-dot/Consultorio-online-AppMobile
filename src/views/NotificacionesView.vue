<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <HeaderBack
                titulo="Notificaciones"
                ruta="/dashboard"/>
            <DashboardContent>
               <div class="notificaciones-container">
                    <ion-list v-if="notificaciones.length > 0" class="notificaciones-lista" lines="none">
                        <ion-item-sliding 
                            v-for="notificacion in notificaciones" 
                            :key="notificacion.id"
                            @ionSwipe="marcarComoLeidaSwipe(notificacion)">
                            <ion-item class="notificacion-ion-item" @click="abrirNotificacion(notificacion)">
                                <div
                                    class="notificacion-item"
                                    :class="{ 'notificacion-no-leida': !notificacion.leida }">
                                    <div class="notificacion-icon" :class="notificacion.tipo">
                                        <ion-icon :icon="obtenerIcono(notificacion.tipo)"/>
                                    </div>
                                    <div class="notificacion-contenido">
                                        <div class="notificacion-header">
                                            <h3>{{ notificacion.titulo }}</h3>
                                            <span>{{ notificacion.fecha }}</span>
                                        </div>
                                        <p>{{ notificacion.mensaje }}</p>
                                    </div>
                                    <div v-if="!notificacion.leida" class="notificacion-indicador"></div>
                                </div>
                            </ion-item>
                        </ion-item-sliding>
                    </ion-list>
                    <div v-else class="empty-state">
                        <ion-icon :icon="notificationsOffOutline" class="empty-icon"></ion-icon>
                        <h3>No tienes notificaciones nuevas.</h3>
                        <p>Los nuevos avisos e inasistencias aparecerán aquí automáticamente.</p>
                    </div>
                </div>
            </DashboardContent>
        </ion-content>
    </ion-page>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import {
        IonPage,
        IonContent,
        IonIcon,
        IonItemSliding,
        IonItem,
        IonList
    } from '@ionic/vue'

    import {
        calendarOutline,
        timeOutline,
        closeCircleOutline,
        alertCircleOutline,
        notificationsOffOutline
    } from 'ionicons/icons'

    import { useRouter } from 'vue-router'
    import ApiService from '@/services/ApiServices'
    import HeaderBack from '@components/agenda/HeaderBack.vue'
    import DashboardContent from '@components/agenda/DashboardContent.vue'

    const router = useRouter()
    const notificaciones = ref ([])

    // Función para cargar las notificaciones desde la API
    const cargarNotificaciones = async () => {
        try {
            const res = await ApiService.get('/api/ionic/notificacionesRecientes')
            notificaciones.value = res.data
        } catch (error) {
            console.error("Error al cargar las notificaciones:", error)
        }
    }

    onMounted(() => {
        cargarNotificaciones()
    })

    const obtenerIcono = (tipo) => {
        switch (tipo) {
            case 'nueva-cita':
                return calendarOutline
            case 'cita-proxima':
                return timeOutline
            case 'cancelada':
                return closeCircleOutline
            case 'inasistencia':
                return alertCircleOutline
            default:
                return calendarOutline
        }
    }

    const abrirNotificacion = async (notificacion) => {
        try {
            // 1. Marcar como leída en el backend si aún no lo está
            if (!notificacion.leida) {
                await ApiService.post(`/api/ionic/notificaciones/${notificacion.id}/leer`)
                notificacion.leida = true 
            }

            // 2. Removerla de la lista visual de inmediato para que desaparezca
            notificaciones.value = notificaciones.value.filter(n => n.id !== notificacion.id)

            // 3. Redirigir al detalle usando history.state
            if (notificacion.folio) {
                router.push({
                    path: '/detalle-cita',
                    state: { folio: notificacion.folio }
                })
            }
        } catch (error) {
            console.error("Error al procesar la notificación:", error)
        }
    }

    const marcarComoLeidaSwipe = async (notificacion) => {
        try {
            if (!notificacion.leida) {
                await ApiService.post(`/api/ionic/notificaciones/${notificacion.id}/leer`)
            }
            // La removemos de la lista de forma inmediata al deslizar
            notificaciones.value = notificaciones.value.filter(n => n.id !== notificacion.id)
        } catch (error) {
            console.error("Error al actualizar la notificación:", error)
        }
    }
</script>