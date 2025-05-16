<script setup lang="ts">
import IconLogo from '../assets/icon-logo.vue';

import routes from '../router.ts';
</script>

<template>
    <div class="footer">
        <div class="container">
            <div class="footer__wrapper">
                <icon-logo class="footer__logo" />

                <a class="footer__contact" href="tel:+30922040281">+30922040281</a>

                <div class="footer__navigation">
                    <router-link
                        class="footer__link"
                        v-for="(item, index) in routes.options.routes"
                        :key="index"
                        :to="item.path"
                    >
                        {{ item.name }}
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.footer {
    background: #1596c1;

    &__wrapper {
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(3, 1fr);
        padding: 10px 0;

        @media (min-width: 768px) {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
            padding: 30px 0;
        }
    }

    &__logo {
        grid-column: 1 / 3;
        grid-row: 1 / 2;
        width: 190px;
        height: 110px;

        @media (min-width: 768px) {
            width: 160px;
            height: 60px;
        }
    }

    &__contact {
        grid-column: 1 / 3;
        grid-row: 2 / 3;
        font-size: 18px;
        text-decoration: none;
        color: #fff;

        @media (min-width: 1440px) {
            font-size: 24px;
        }
    }

    &__navigation {
        grid-column: 3 / 4;
        grid-row: 1 / 3;
        display: grid;
        gap: 10px;
        justify-content: center;
        align-items: center;

        @media (min-width: 768px) {
            display: flex;
            gap: 20px;
        }
    }

    &__link {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        font-size: 18px;
        text-decoration: none;
        color: #fff;

        @media (min-width: 768px) {
            padding: 10px 15px;
            min-width: 100px;
        }

        @media (min-width: 1440px) {
            font-size: 24px;
            padding: 10px 45px;
        }
    }
}
</style>
