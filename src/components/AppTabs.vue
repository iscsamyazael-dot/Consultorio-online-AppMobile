<template>
    <!-- =====================================
       MENÚ LATERAL
  ====================================== -->
  <ion-menu
    content-id="main-content"
    side="start">
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Consultorio Online
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <!-- Perfil médico -->
        <ion-item
          button
          @click="irPerfil">
          <ion-icon
            slot="start"
            :icon="personCircleOutline"/>
          <ion-label>
            Perfil médico
          </ion-label>
        </ion-item>
        <!-- Configuración -->
        <ion-item
          button
          @click="irConfiguracion">
          <ion-icon
            slot="start"
            :icon="settingsOutline"/>
          <ion-label>
            Configuración
          </ion-label>
        </ion-item>
        <!-- Cerrar sesión -->
        <ion-item
          button
          @click="cerrarSesion">
          <ion-icon
            slot="start"
            :icon="logOutOutline"/>
          <ion-label>
            Cerrar sesión
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>

 <!-- =====================================
       CONTENIDO PRINCIPAL
  ====================================== -->
  <ion-tabs>
    <!-- Aquí se cargan las vistas -->
    <ion-router-outlet
        id="main-content">
    </ion-router-outlet>

    <!-- Barra inferior -->
    <ion-tab-bar slot="bottom">

      <ion-tab-button tab="dashboard" href="/dashboard">
        <ion-icon :icon="homeOutline" />
        <ion-label>Inicio</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="agenda" href="/agenda">
        <ion-icon :icon="calendarOutline" />
        <ion-label>Agenda</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="notificaciones" href="/notificaciones">
        <ion-icon :icon="notificationsOutline"/>
        <ion-label>Avisos</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="configuracion" href="/configuracion">
        <ion-icon :icon="settingsOutline" />
        <ion-label>Configuracion.</ion-label>
      </ion-tab-button>

    </ion-tab-bar>

  </ion-tabs>
</template>

<script setup>
import apiServices from '@/services/apiServices' // Importa tu servicio
import { useRouter } from 'vue-router'
import { menuController } from '@ionic/vue' // Importa menuController
import {
 IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon
} from '@ionic/vue'

import {
  homeOutline,
  calendarOutline,
  notificationsOutline,
  settingsOutline,
  personCircleOutline,
  logOutOutline
} from 'ionicons/icons'

const router = useRouter()
/* =====================================
   NAVEGACIÓN
===================================== */
const irPerfil = async () => {
  await menuController.close() // Cierra el menú primero
  router.push('/perfil')
}

const irConfiguracion = async () => {
  await menuController.close() // Cierra el menú primero
  router.push('/configuracion')
}

// Funcion para cerrar la sesion del login
const cerrarSesion = async () => {
    try {
        // Opcional: Avisar al backend que invalide el token
        await apiServices.post('/api/ionic/logout')
    } catch (error) {
        console.error("Error al cerrar sesión", error)
    } finally {
        // Esto es lo más importante:
        localStorage.removeItem('token')
        await menuController.close()
        router.push('/login')
    }
}

</script>