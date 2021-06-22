<template>
  <div></div>
</template>

<script>
import authService from '@/hooks/auth/authService.js';
import { onMounted } from 'vue';
export default {
        
        setup() {
            const AuthService = new authService();
            onMounted(() => {
                AuthService.logout();
            });
            return {AuthService};
        },
}
</script>

<style>

</style>