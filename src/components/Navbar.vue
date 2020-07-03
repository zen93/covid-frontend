<template>
     <b-navbar toggleable="sm" type="dark" variant="dark">

        <b-navbar-brand to="/">IFR Today</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item
                    :active="currentPage === 'faq'"
                    to="faq"
                >
                    FAQ
                </b-nav-item>
                <b-nav-item
                    :active="currentPage === 'donate'"
                    to="donate"
                >
                    Donate
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
export default {
  props: [
    'currentPage'
  ]
}
</script>

<style scoped>
a {
    color: white;
}
a:hover {
    color: rgb(202, 202, 202);
}
.dark-link {
    color: black;
}
.dark-link:hover {
    color: gray;
}
</style>
