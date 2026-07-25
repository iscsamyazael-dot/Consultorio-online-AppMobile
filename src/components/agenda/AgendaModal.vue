<template>
    <ion-modal
        :is-open="isOpen"
        css-class="agenda-modal"
        :backdrop-dismiss="true"
        @didDismiss="cerrar">
        <ion-content class="agenda-modal-content">
            <div class="agenda-sheet-content">
                <div class="agenda-sheet-header">
                    <div>
                        <h2>{{ tituloFecha }}</h2>
                    </div>
                    <ion-button
                        fill="clear"
                        @click="cerrar">
                        <ion-icon :icon="closeOutline"/>
                    </ion-button>
                </div>
                <div class="agenda-sheet-body">
                    <ResumenDia
                        :resumen="resumenCitasDia">
                    </ResumenDia>
                    <ListaCitas
                        :citas="listaCitasDia"
                        @ver-detalle="verDetalle">
                    </ListaCitas>
                </div>
            </div>
        </ion-content>
    </ion-modal>
</template>

<script setup>
    import { closeOutline } from 'ionicons/icons'
    import {
        IonModal,
        IonContent,
        IonButton
    } from '@ionic/vue'

    import { IonIcon } from '@ionic/vue';

    import { ref, computed, watch } from 'vue'
    import ApiService from '@/services/ApiServices'
    import ListaCitas from './ListaCitas.vue'
    import ResumenDia from './ResumenDia.vue'
    import { useRouter } from 'vue-router'

    const props = defineProps({
        isOpen: Boolean,
        fecha: Date
    })

    const emit = defineEmits([
        'cerrar',
        'ver-detalle'
    ])

    // Estructura idéntica a SegmentContent.vue para el resumen
    const resumenCitasDia = ref({
        total: 0,
        texto: 'citas programadas',
        estados: [
            {
                nombre: 'Confirmadas',
                total: 0,
                clase: 'confirmado'
            },
            {
                nombre: 'Agendadas',
                total: 0,
                clase: 'agendado'
            },
            {
                nombre: 'Finalizadas', // <-- Agregado
                total: 0,
                clase: 'finalizada'  // <-- Clase CSS correspondiente
            },
            {
                nombre: 'Canceladas',
                total: 0,
                clase: 'cancelado'
            }
        ]
    })

    const listaCitasDia = ref([])

    // Función para consultar la API dentro del modal usando la fecha seleccionada
    const cargarDatosDelDia = async (fechaSeleccionada) => {
    if (!fechaSeleccionada) return

    try {
        // Formateamos la fecha del objeto Date a YYYY-MM-DD de forma limpia
        const anio = fechaSeleccionada.getFullYear()
        const mes = String(fechaSeleccionada.getMonth() + 1).padStart(2, '0')
        const dia = String(fechaSeleccionada.getDate()).padStart(2, '0')
        const fechaFormateada = `${anio}-${mes}-${dia}`

        // Llamamos al nuevo endpoint dedicado
        const res = await ApiService.get(`/api/ionic/CitasPorFecha?fecha=${fechaFormateada}`)
        const dataCitas = res.data

        listaCitasDia.value = dataCitas

        // Actualizamos los contadores de las tarjetas superiores de forma dinámica
        resumenCitasDia.value.total = dataCitas.length
        resumenCitasDia.value.estados[0].total = dataCitas.filter(c => c.estado && c.estado.toLowerCase() === 'confirmada').length
        resumenCitasDia.value.estados[1].total = dataCitas.filter(c => c.estado && (c.estado.toLowerCase() === 'agendado' || c.estado.toLowerCase() === 'agendadas')).length
        resumenCitasDia.value.estados[2].total = dataCitas.filter(c => c.estado && (c.estado.toLowerCase() === 'finalizada' || c.estado.toLowerCase() === 'finalizadas')).length // <-- Conteo para finalizadas
        resumenCitasDia.value.estados[3].total = dataCitas.filter(c => c.estado && c.estado.toLowerCase() === 'cancelada').length

    } catch (error) {
        console.error("Error al cargar las citas de la fecha:", error)
        listaCitasDia.value = []
        resumenCitasDia.value.total = 0
    }
}

    // Cada vez que el modal se abre (isOpen pasa a true) o cambia la fecha, cargamos la API
    watch(() => props.isOpen, (abierto) => {
        if (abierto && props.fecha) {
            cargarDatosDelDia(props.fecha)
        }
    })

    const verDetalle = (cita) => {
        emit('ver-detalle', cita)
    }   

    const cerrar = () => {
        emit('cerrar')
    }

    

    const tituloFecha = computed(() => {
        if (!props.fecha) return ''

        return props.fecha.toLocaleDateString('es-MX', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    })
</script>