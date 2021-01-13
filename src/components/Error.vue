<template>
    
    <article :class="'error ' + error">
        
        <div class="error_content">

            <h3>{{ copy_en.TITLE_ERROR }} <span class="light">{{ copy_jp.TITLE_ERROR }}</span></h3>

            <p>{{ copy_en.BODY_ERROR }}<br><span class="light">{{ copy_jp.BODY_ERROR }}</span> </p>

        </div>

    </article>

</template>

<script>
export default {
  name: 'Error',
  props: ['error', 'copy_en', 'copy_jp']
}
</script>

<style lang="scss" scoped>


    ///////////////////////////////
    // ERROR STYLES
    ///////////////////////////////

    article.error {
        position: fixed;
        width: 100%;
        width: 100vw;
        height: 100%;
        height: 100vh;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: var(--color__error);
        z-index: var(--zBelowSearch);
        color: var(--color__white);

        .error_content {
            position: fixed;
            bottom: calc(var(--base) * 6);
            left: 0;
            padding: 0 calc(var(--base) * 3);

            @media screen and (min-width: 720px) {
                padding: 0 96px;
            }
            @media screen and (min-width: 1280px) {
                padding: 0 196px;
            }
            @media screen and (min-width: 1600px) {
                padding: 0 248px;
            }
        }
    }

</style>