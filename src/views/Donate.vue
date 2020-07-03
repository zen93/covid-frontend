<template>
    <div>
        <Navbar
            currentPage="donate"
        />
        <b-container>
            <h1>Donate to support us</h1>
            <p>This website was made by a student with no income streams. We need donations to pay for server hosting and continued development of features. Please donate!</p>
            <p>Here is our <a href="https://www.patreon.com/akshay_sinha">Patreon</a>.</p>
        </b-container>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Donate',
  components: {
    Navbar
  }
}
</script>
