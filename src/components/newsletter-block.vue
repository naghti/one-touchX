<script setup lang="ts">
import { ref } from 'vue';

// Инпут для ввода пользователем своего email
const userInputEmail = ref('');

// Функция выполняется при нажатии на кнопку "Отправить"
const onClickSubmit = () => {
    // Регулярное выражения для проверки валидности введённого email
    const regex =
        /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/;

    if (regex.test(userInputEmail.value)) {
        alert('Форма успешно отправлена');
        userInputEmail.value = '';
    } else {
        alert('Неправильно введён email');
    }
};
</script>

<template>
    <div class="newsletter container">
        <h2 class="newsletter__title">Хотите знать о книгах всё?</h2>

        <p class="newsletter__text">Подпишитесь на нашу новостную рассылку</p>

        <div class="newsletter__wrapper">
            <label class="newsletter__label">
                <input class="newsletter__input" v-model="userInputEmail" />
            </label>

            <button class="newsletter__submit" type="button" @click="onClickSubmit">Отправить</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.newsletter {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 70px;
    padding-bottom: 90px;
    text-align: center;

    @media (min-width: 768px) {
        padding-top: 90px;
    }

    @media (min-width: 1440px) {
        padding-bottom: 140px;
    }

    &__title {
        max-width: 220px;
        padding: 0 0 10px;
        font-size: 30px;
        font-weight: 400;
        text-transform: uppercase;

        @media (min-width: 768px) {
            max-width: unset;
            padding: 0 0 20px;
        }

        @media (min-width: 1440px) {
            font-size: 42px;
        }
    }

    &__text {
        max-width: 220px;
        padding: 0 0 40px;
        font-size: 18px;

        @media (min-width: 768px) {
            max-width: unset;
            padding: 0 0 20px;
        }

        @media (min-width: 1440px) {
            padding: 0 0 60px;
            font-size: 24px;
        }
    }

    &__wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        @media (min-width: 768px) {
            max-width: 580px;
            flex-direction: row;
            gap: 20px;
        }

        @media (min-width: 1440px) {
            max-width: 1080px;
        }
    }

    &__label {
        width: 100%;
        padding: 0 0 10px;

        @media (min-width: 768px) {
            padding: 0;
        }
    }

    &__input {
        width: inherit;
        height: 50px;
        padding: 0 15px;
        border: 3px solid #000;
        text-align: left;
    }

    &__submit {
        min-width: 190px;
        max-width: 190px;
        height: 50px;
        padding: 0 15px;
        background: none;
        border: 3px solid #000;
        font-family: 'Forum', sans-serif;
        font-size: 24px;
        text-transform: uppercase;
        cursor: pointer;

        @media (min-width: 768px) {
            padding: 0;
        }

        @media (min-width: 1440px) {
            min-width: 310px;
            max-width: 310px;
            font-size: 30px;
        }
    }
}
</style>
