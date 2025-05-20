<template>
  <AuthenticatedLayout>
    <Home />
  </AuthenticatedLayout>
</template>

<script setup>
import AuthenticatedLayout from './Layouts/AuthenticatedLayout.vue';
import Home from './Pages/Home.vue';
</script>