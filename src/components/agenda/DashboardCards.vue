<template>

    <div class="dashboard-cards">
        <div
            v-for="card in cards"
            :key="card.title"
            class="dashboard-card"
            :class="card.class">
            <div class="card-icon">
                <ion-icon :icon="card.icon"></ion-icon>
            </div>

            <div class="card-info">
                <h2>{{ card.value }}</h2>
                <span>{{ card.title }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>

    import { ref, onMounted, computed } from 'vue';
    import ApiService from '@/services/ApiServices'; // Asegúrate de que la ruta sea correcta
    import { useRouter } from 'vue-router';
    import {
        calendarOutline,
        checkmarkCircle,
        timeOutline,
        closeCircle
    } from 'ionicons/icons'

    import { IonIcon } from '@ionic/vue';
    
    const cards = ref([
        {
            title:'Citas Hoy',
            value:0,
            icon:calendarOutline,
            class:'primary'
        },

        {
            title:'Completadas',
            value:0,
            icon:checkmarkCircle,
            class:'success'
        },

        {
            title:'Pendientes',
            value:0,
            icon:timeOutline,
            class:'warning'
        },

        {
            title:'Canceladas',
            value:0,
            icon:closeCircle,
            class:'danger'
        }
    ])

     const router = useRouter()
     const emit = defineEmits(['actualizar-conteo']);
     const cargando = ref(false); // <-- Declaración correcta de la variable
     // 2. Función para consumir la API de estadísticas del dashboard
    const cargarEstadisticasCitas = async () => {
        if (cargando.value) return;
        cargando.value = true;
        
        try {
            const response = await ApiService.get('/api/ionic/ResumenCitasHoy');
            console.log("Datos recibidos de ResumenCitasHoy:", response.data);
            
            cards.value[0].value = response.data.citas_hoy;
            cards.value[1].value = response.data.completadas;
            cards.value[2].value = response.data.pendientes;
            cards.value[3].value = response.data.canceladas;

            emit('actualizar-conteo', {
                totalHoy: response.data.citas_hoy,
                pendientes: response.data.pendientes
            });

        } catch (error) {
            console.error("Error al obtener estadísticas de citas:", error);
        } finally {
            cargando.value = false;
        }
    };

onMounted(() => {
    cargarEstadisticasCitas();
});

defineExpose({
    cargarEstadisticasCitas
})
</script>