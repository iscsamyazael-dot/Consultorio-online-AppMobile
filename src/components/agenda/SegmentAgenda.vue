<template>
  <div class="segment-agenda">

    <button
      v-for="item in opciones"
      :key="item.value"
      :class="['segment-item', { active: props.vistaActual === item.value }]"
      @click="seleccionar(item.value)">
      {{ item.label }}
    </button>

  </div>
</template>

<script setup>

  import { ref, computed } from 'vue'

  import {
    homeOutline,
    todayOutline,
    sunnyOutline,
    calendarOutline,
    gridOutline
  } from 'ionicons/icons'

  const props = defineProps({
    mostrarInicio:{
      type:Boolean,
      default:true
    },
    vistaActual:{
        type:String,
        default:'inicio'
    }
  })

  const emit = defineEmits([
    'cambiar-vista'
  ])

  const opciones = computed(()=>{
    const lista=[]
    if(props.mostrarInicio){
      lista.push({
        label:'Inicio',
        value:'inicio',
        icon:homeOutline
      })

    }

    lista.push(
      {
        label:'Hoy',
        value:'hoy',
        icon:todayOutline
      },

      {
        label:'Mañana',
        value:'manana',
        icon:sunnyOutline
      },

      {
        label:'Semana',
        value:'semana',
        icon:calendarOutline
      },

      {
        label:'Mes',
        value:'mes',
        icon:gridOutline
      }
    )
    return lista
  })

  const seleccionar=(valor)=>{
    emit('cambiar-vista',valor)
  }

</script>