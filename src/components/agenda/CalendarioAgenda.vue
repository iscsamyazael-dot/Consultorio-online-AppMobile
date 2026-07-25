<template>
    <div class="calendar-container">
        <!-- Encabezado -->
        <div class="calendar-header">
            <ion-button
                fill="clear"
                @click="mesAnterior">
                <ion-icon :icon="chevronBackOutline"/>
            </ion-button>
            <h2>{{ nombreMes }} {{ anio }}</h2>
            <ion-button
                fill="clear"
                @click="mesSiguiente">
                <ion-icon :icon="chevronForwardOutline"/>
            </ion-button>
        </div>

        <!-- Días de la semana -->
        <div class="calendar-weekdays">
            <span>L</span>
            <span>M</span>
            <span>M</span>
            <span>J</span>
            <span>V</span>
            <span>S</span>
            <span>D</span>
        </div>
        <!-- Días -->
        <div class="calendar-grid">
            <div
                v-for="dia in diasMes"
                :key="dia.fecha || Math.random()"
                class="calendar-day"
                :class="{
                    hoy: dia.hoy,
                    seleccionado: dia.seleccionado,
                    vacio: dia.vacio
                }"
                @click="!dia.vacio && seleccionarDia(dia)">

                <div
                    v-if="!dia.vacio"
                    class="contenido-dia">
                    <span class="numero">
                        {{ dia.numero }}
                    </span>

                    <div
                        v-if="dia.citas.length"
                        class="indicadores">
                        <span
                            v-for="(cita,index) in dia.citas.slice(0,5)"
                            :key="index"
                            class="punto"
                            :class="cita.estado">
                        </span>
                        <span
                            v-if="dia.citas.length > 5"
                            class="mas">
                            +
                        </span>
                    </div>
                </div>
            </div>
         </div>
    </div>
</template>

<script setup>

    import {
        IonButton,
        IonIcon
    } from '@ionic/vue'

    import {
        chevronBackOutline,
        chevronForwardOutline
    } from 'ionicons/icons'

    import { ref, computed, onMounted, watch } from 'vue'
    import ApiService from '@/services/ApiServices'

    const fechaActual = ref(new Date())
    const seleccionado = ref(new Date().getDate())
  

    const meses = [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre'
    ]
    
    const estados = [
    'confirmada',
    'pendiente',
    'consulta',
    'cancelada',
    'finalizada'
    ]
    
    // Función para obtener las citas reales desde la BD conectada a Oracle
    const citasDelMes = ref({})
    const cargarCitasMes = async () => {
        try {
            const anioVal = fechaActual.value.getFullYear()
            const mesVal = String(fechaActual.value.getMonth() + 1).padStart(2, '0')
            const response = await ApiService.get(`/api/ionic/TotalCitasPorDiayMes?anio=${anioVal}&mes=${mesVal}`)
            console.log("CITAS POR DÍA:", response.data)
            
            const nuevoMapa = {}
            for (const [key, data] of Object.entries(response.data || {})) {
                const fechaKey = key.split('T')[0]
                const total = parseInt(data.total_citas) || 0
                
                const estadosArray = data.estados 
                    ? String(data.estados).split(',').map(e => e.trim().toLowerCase()) 
                    : []
                
                nuevoMapa[fechaKey] = Array.from({ length: total }, (_, index) => ({
                    estado: estadosArray[index] || estadosArray[0] || 'pendiente'
                }))
            }
            
            // Asignación limpia que fuerza la actualización de los computed dependientes
            citasDelMes.value = nuevoMapa
            console.log("MAPA DE CITAS ACTUALIZADO:", citasDelMes.value)
        } catch (error) {
            console.error('Error al cargar las citas del mes:', error)
        }
    }
    onMounted(() => {
        cargarCitasMes()
    })

    watch(fechaActual, () => {
        cargarCitasMes()
    })

    //función para imprimir un punto por cada cita//
    const generarCitas = () => {
        const cantidad = Math.floor(Math.random() * 6) // 0 a 5 citas
        return Array.from({ length: cantidad }, () => ({
            estado: estados[Math.floor(Math.random() * estados.length)]
        }))

    }

    const nombreMes = computed(()=>{
        return meses[fechaActual.value.getMonth()]
    })

    const anio = computed(()=>{
        return fechaActual.value.getFullYear()
    })

const diasMes = computed(() => {
    // Al incluir esto al inicio, el computed sabe que debe re-ejecutarse si cambian las citas
    const mapaCitas = citasDelMes.value 
    const anioVal = fechaActual.value.getFullYear()
    const mesVal = fechaActual.value.getMonth()
    const totalDias = new Date(anioVal, mesVal + 1, 0).getDate()
    let primerDia = new Date(anioVal, mesVal, 1).getDay()
    primerDia = (primerDia + 6) % 7
    const hoy = new Date()
    const dias = []

    for (let i = 0; i < primerDia; i++) {
        dias.push({ vacio: true })
    }

    for (let dia = 1; dia <= totalDias; dia++) {
        const mesStr = String(mesVal + 1).padStart(2, '0')
        const diaStr = String(dia).padStart(2, '0')
        const fechaKey = `${anioVal}-${mesStr}-${diaStr}`

        dias.push({
            numero: dia,
            fecha: new Date(anioVal, mesVal, dia),
            fechaKey: fechaKey,
            vacio: false,
            hoy:
                dia === hoy.getDate() &&
                mesVal === hoy.getMonth() &&
                anioVal === hoy.getFullYear(),
            seleccionado: dia === seleccionado.value,
            // Buscamos directamente en el mapa reactivo actualizado
            citas: mapaCitas[fechaKey] || []
        })
    }

        return dias
 })
    
    const emit = defineEmits([
        'seleccionar-fecha'
    ])
    
    const seleccionarDia=(dia)=>{
        seleccionado.value=dia.numero
        emit('seleccionar-fecha',dia)
    }

    const mesAnterior=()=>{
        fechaActual.value=new Date(
            fechaActual.value.getFullYear(),
            fechaActual.value.getMonth()-1,
            1
        )
    }

    const mesSiguiente=()=>{
        fechaActual.value=new Date(
            fechaActual.value.getFullYear(),
            fechaActual.value.getMonth()+1,
            1
        )
    }

</script>