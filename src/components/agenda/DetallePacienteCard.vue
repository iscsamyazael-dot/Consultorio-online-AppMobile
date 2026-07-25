<template>

    <div class="detalle-card">

        <div class="detalle-card-header">

            <ion-icon
                :icon="personCircleOutline"
                class="detalle-icon"/>

            <span>Paciente</span>

        </div>

        <div class="detalle-card-body">

            <div class="paciente-nombre">

                {{ paciente.nombre }}

            </div>

            <div class="paciente-datos">

                <div class="paciente-item">

                    <ion-icon
                        :icon="personOutline"
                        class="detalle-item-icon"/>

                    <span>
                        {{ paciente.sexo }} • {{ paciente.edad }} años
                    </span>

                </div>

                <div class="paciente-item">

                    <ion-icon
                        :icon="callOutline"
                        class="detalle-item-icon"/>

                    <span>
                        {{ paciente.telefono }}
                    </span>

                </div>

            </div>

        </div>

    </div>

</template>

<script setup>

import {
    personCircleOutline,
     personOutline,
    callOutline
} from 'ionicons/icons'

// Recibimos los datos del paciente desde el componente padre (DetalleCitaView)
defineProps({
    paciente: {
        type: Object,
        default: () => ({
            nombre: '',
            sexo: '',
            edad: '',
            telefono: ''
        })
    }
})

</script>