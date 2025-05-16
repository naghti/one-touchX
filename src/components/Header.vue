<script setup lang="ts">
import IconLogo from '../assets/icon-logo.vue';
import IconAccordionTick from '../assets/icon-accordion-tick.vue';
import IconBasket from '../assets/icon-basket.vue';

import { ref } from 'vue';

import { routes } from '../router.ts';

const showNavMenu = ref(false);

const onAccordionClick = () => {
    showNavMenu.value = !showNavMenu.value;
};
</script>

<template>
    <header class="header">
        <div class="header__wrapper container">
            <router-link class="header__logo-link" to="/">
                <icon-logo class="header__logo" />
            </router-link>

            <div class="header__accordion">
                <icon-accordion-tick
                    class="header__accordion-icon"
                    :class="{ 'is-open': showNavMenu }"
                    @click="onAccordionClick"
                />
            </div>

            <nav class="header__navigation-list" :class="{ 'is-open': showNavMenu }">
                <router-link
                    class="header__navigation-item"
                    v-for="(item, index) in routes"
                    :key="index"
                    :to="item.path"
                >
                    {{ item.name }}
                </router-link>
            </nav>

            <router-link to="/basket">
                <icon-basket class="header__basket-icon" />
            </router-link>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    background: #1596c1;
    min-height: 50px;

    &__wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__logo-link {
        display: inline-block;
        line-height: 0;
    }

    &__logo {
        width: 50px;
        height: 30px;

        @media (min-width: 768px) {
            width: 117px;
            height: 40px;
        }

        @media (min-width: 1440px) {
            width: 184px;
            height: 100px;
        }
    }

    &__accordion {
        z-index: 1;
        display: grid;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }

    &__accordion-icon {
        width: 40px;
        height: 11px;
        cursor: pointer;
        transition:
            fill 0.5s ease,
            transform 0.5s ease;

        @media (min-width: 768px) {
            width: 32px;
            height: 9px;
        }

        @media (min-width: 1440px) {
            width: 64px;
            height: 18px;
        }

        &.is-open {
            fill: #000;
            transform: scale(-1);
        }
    }

    &__basket-icon {
        width: 27px;
        height: 32px;

        @media (min-width: 768px) {
            width: 34px;
            height: 40px;
        }

        @media (min-width: 1440px) {
            width: 54px;
            height: 64px;
        }
    }

    &__navigation-list {
        position: absolute;
        top: 0;
        left: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 56px;
        width: 100%;
        padding: 70px;
        transform: translate3d(-50%, -100%, 0);
        background: #fff;
        transition: transform 0.5s ease;

        @media (min-width: 768px) {
            width: 340px;
        }

        @media (min-width: 1440px) {
            width: 420px;
            padding: 120px;
        }

        &.is-open {
            transform: translate3d(-50%, 0, 0);
        }
    }

    &__navigation-item {
        padding: 9px;
        width: 100%;
        text-align: center;
        text-decoration: none;
        color: #000;
    }
}
</style>
