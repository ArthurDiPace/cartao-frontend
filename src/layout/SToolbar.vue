<template>
  <v-toolbar
    flat
    style="overflow-x:auto; white-space: nowrap;"
  >
    <v-btn
      text
      to="/cartoes"
    >
      <v-icon class="material-icons-outlined mr-2">
        info
      </v-icon>
      Cartões
    </v-btn>
  </v-toolbar>
</template>
  
  <script>
  export default {
      name: 'SToolbar'
  }
  </script>
  
  <style lang="scss" scoped>
  .v-btn {
    text-transform: none;
    letter-spacing: 0;
    font-weight: 400;
  }
  </style>