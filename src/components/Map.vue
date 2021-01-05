<template>
    
    <article class="map__container">
        <article class="map__overlay"></article>
        <img :src="`https://api.mapbox.com/styles/v1/xenodesign/ckjjb730s0ghj1aqe4u2rzodg/static/${lon},${lat},10/720x560?access_token=pk.eyJ1IjoieGVub2Rlc2lnbiIsImEiOiJja2pqYXF5bGo1Mm15MnNwa3ZvNXZicWo2In0.c2MJSlLShcMEon71nvPzug`" :alt="`Map of ${location}`">
    </article>

</template>

<script>
export default {
    name: 'Map',
    props: ['location', 'lon', 'lat']
}
</script>

<style scoped lang="scss">

    $color: #94A8B3;

    .map__container {
        position: fixed;
        bottom: 0;
        right: 0;

        .map__overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 5;
            // border: 1px solid red;
        }

        > img {
            transition: 0.33s;
            position: relative;
            display: block;
            opacity: 0.5;
            z-index: 1;
            width: 480px;
            height: 320px;

            @media screen and (min-width: 720px) {
                width: 680px;
                height: 480px;
            }
            @media screen and (min-width: 1280px) {
                width: auto;
                height: auto;
            }
        }
    }

</style>