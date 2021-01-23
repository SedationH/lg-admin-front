<template>
  <div class="add">
    <create-or-edit />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CreateOrEdit from './components/CreateOrEdit.vue'

export default defineComponent({
  name: 'menuAdd',
  components: { CreateOrEdit }
})
</script>
