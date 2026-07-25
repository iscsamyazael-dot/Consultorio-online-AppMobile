<template>
    <div class="agenda-header">
        <!-- Barra superior -->
        <div class="top-bar">
        <ion-button 
            fill="clear"
            @click="abrirMenu">
            <ion-icon :icon="menuOutline"></ion-icon>
        </ion-button>
        <div class="right-icons">
            <ion-button 
                fill="clear"
                class="notification-button"
                @click="abrirNotificaciones">
                <ion-icon :icon="notificationsOutline"></ion-icon>
            </ion-button>
            <ion-button 
                class="profile-button"
                fill="clear"
                @click="abrirPerfil">
                <ion-icon :icon="personCircleOutline"></ion-icon>
            </ion-button>
        </div>
        </div>
        <!-- Saludo -->
        <div class="welcome">
        <p class="greeting">
             {{ saludoDinamico }}
        </p>
        <h1>
               {{ medicoData.nombre || 'Cargando...' }}
        </h1>
        <span>
             {{ fechaActual }}
        </span>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, computed } from 'vue';
    import ApiService from '@/services/ApiServices'; // Asegúrate de que la ruta sea correcta
    import { useRouter } from 'vue-router'
    import { IonButton,IonIcon,menuController } from '@ionic/vue'
    import { menuOutline, notificationsOutline, personCircleOutline } from 'ionicons/icons';
    
    const router = useRouter()
    defineProps({
        greeting: {
            type: String,
            default: 'Buenos días'
        },
        doctor: {
            type: String,
            default: 'Dr. Carlos Hernández'
        },
        currentDate: {
            type: String,
            default: 'Viernes, 10 de Julio'
        }
    })

    const abrirNotificaciones = () => {
         router.push('/notificaciones')
    }

    const abrirPerfil = () => {
         router.push('/perfil')
    }

    const abrirMenu = async () => {
        await menuController.open()
    }

//Aqui inician las funciones para el consumo de las apis ///
    // --- Lógica Dinámica (esto reemplaza los textos estáticos) ---
    const saludoDinamico = computed(() => {
        const hora = new Date().getHours();
        if (hora < 12) return 'Buenos días';
        if (hora < 19) return 'Buenas tardes';
        return 'Buenas noches';
    });

    const fechaActual = computed(() => {
        const opciones = { weekday: 'long', day: 'numeric', month: 'long' };
        return new Date().toLocaleDateString('es-ES', opciones);
    });
// -------------------------------------------------------------

// 1. Estado reactivo (equivale a tu data())
   const medicoData = ref({});
   const cargarDatosMedico = async () => {
        try {
            const response = await ApiService.get('/api/ionic/MedicoPerfil');
            medicoData.value = response.data; // En Composition API usamos .value
        } catch (error) {
            console.error("Error al obtener datos:", error);
        }
    };

    // 2. Ciclo de vida (equivale a mounted())
    onMounted(() => {
        cargarDatosMedico();
    });



</script>
