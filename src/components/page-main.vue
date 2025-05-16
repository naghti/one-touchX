<script setup lang="ts">
import IconTickLeft from '../assets/icon-tick-left.vue';

import { useAppStore } from '../store/app-store.ts';
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted, ref } from 'vue';
import NewsletterBlock from './newsletter-block.vue';

const appStore = useAppStore();

const { booksData } = storeToRefs(appStore);

// Ссылка на html элемент слайдера
const cardList = ref();

// Текущее расстояние между слайдами
// (необходимо для расчёта смещения при смене слайда)
const currentListGap = ref(5);

// Текущее смещение слайдера
const currentListOffsetX = ref(0);

// Текущий слайд
const currentSlide = ref(0);

// Количество карточек товара на одном слайде
const cardsInSlide = ref(1);

// Функция смены слайда при нажатии на кнопки вправо/влево
const onClickCardListControl = (direction: number) => {
    // Создаётся номер следующего слайда
    const nextSlide = currentSlide.value + direction;

    // Если номер следующего слайда выходит за границы - прервать функцию
    if (nextSlide < 0 || nextSlide >= booksData.value.length / cardsInSlide.value) {
        return;
    }

    // Изменение номера текущего слайда
    currentSlide.value += direction;

    // Изменение смещения слайдера
    currentListOffsetX.value += (cardList.value.offsetWidth + currentListGap.value) * -direction;
};

// Функция срабатывает при нажатии на элементы пагинации слайдера
const onClickSliderPagination = (index: number) => {
    // Изменение номера текущего слайда
    currentSlide.value = index;

    // Изменение смещения слайдера
    currentListOffsetX.value = (cardList.value.offsetWidth + currentListGap.value) * -index;
};

// Функция для события изменения ширины устройства
const onResize = () => {
    const deviceWidth = window.innerWidth;

    if (deviceWidth >= 1440) {
        currentListGap.value = 20;
        cardsInSlide.value = 3;
    }
};

// Интерфейс для данных о книге
interface IBook {
    imageName?: string;
    author?: string;
    name?: string;
    type?: string;
    price?: number;
}

// Функция отправляет данные о продукте при нажатии пользователем на кнопку "Купить"
const onBuyItem = (item: IBook) => {
    alert("Куплено!;)");
};

onMounted(() => {
    onResize();
    window.addEventListener('resize', onResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', onResize);
});

const images: Record<string, string>  = import.meta.glob('/src/assets/books/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

function getImageUrl(imageName: string): string {
  const path = `/src/assets/books/${imageName}`;
  return images[path] || ''; 
}

</script>

<template>
    <div class="page-main">
        <div class="page-main__hero hero container">
            <p class="hero__slogan">Книги, которые вознесут вас на олимп</p>

            <router-link class="hero__learn-more button-primary" to="/catalog">Узнать больше</router-link>
        </div>

        <div class="page-main__new new container">
            <h2 class="new__title">Горячие новинки</h2>

            <div class="new__card-list-wrapper">
                <div
                    class="new__card-list"
                    :style="{ transform: `translate3d(${currentListOffsetX}px,0,0)`, gap: `${currentListGap}px` }"
                    ref="cardList"
                >
                    <div v-for="(book, index) in booksData" :key="index" class="new__card-item">
                        <img
                            class="new__card-image"
                            :src="getImageUrl(book.imageName as string)"
                            alt="Обложка книги."
                        />

                        <p class="new__card-name">{{ book.name }}</p>

                        <p class="new__card-type">{{ book.type }}</p>

                        <div class="new__card-wrapper">
                            <p class="new__card-price">{{ book.price }} р.</p>

                            <div class="new__card-button button-secondary" @click="onBuyItem(booksData[index])">
                                купить
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="new__controls">
                <icon-tick-left
                    class="new__control-left"
                    :disabled="currentSlide === 0 || null"
                    @click="onClickCardListControl(-1)"
                />

                <div class="new__pagination-list">
                    <div
                        class="new__pagination-item"
                        :class="index === currentSlide ? 'current' : ''"
                        v-for="(_, index) in booksData.length / cardsInSlide"
                        :key="index"
                        @click="onClickSliderPagination(index)"
                    ></div>
                </div>

                <icon-tick-left
                    class="new__control-right"
                    :disabled="currentSlide === booksData.length / cardsInSlide - 1 || null"
                    @click="onClickCardListControl(1)"
                />
            </div>
        </div>

        <div class="page-main__about about container">
            <div class="about__about-us">
                <div class="about__text-wrapper">
                    <h2 class="about__title">О нас</h2>

                    <p class="about__text">
                        Книжное наследие от мыслителей Древней современности. Это не просто магазин, а настоящий клуб
                        любителей книги, который объединяет в своем культурном пространстве людей самых разных
                        интересов.
                    </p>
                </div>

                <div class="about__image-wrapper about__image-wrapper--about-us"></div>
            </div>

            <div class="about__harmony">
                <div class="about__text-wrapper">
                    <h2 class="about__title">Гармония</h2>

                    <p class="about__text">
                        Наш проект "Гармония" объединяет читателей и авторов в реальности и в интернете. Каждую неделю
                        проводятся встречи онлайн и вживую. Из наших регулярных рубрик вы узнаете много нового о книгах
                        и писателях.
                    </p>
                </div>

                <div class="about__image-wrapper about__image-wrapper--harmony"></div>
            </div>
        </div>

        <newsletter-block />
    </div>
</template>

<style lang="scss" scoped>
.page-main {
    .hero {
        min-height: 540px;
        background: url('@/assets/hero.jpg') no-repeat 55% 50%;
        background-size: cover;

        @media (min-width: 768px) {
            background: url('@/assets/hero.jpg') no-repeat 55% top;
            background-size: cover;
        }

        @media (min-width: 1440px) {
            min-height: 890px;
        }

        &__slogan {
            width: 200px;
            padding: 10px 0;
            font-size: 40px;
            line-height: 60px;
            text-transform: uppercase;
            color: #fff;

            @media (min-width: 768px) {
                width: 260px;
                padding: 20px 0;
            }

            @media (min-width: 1440px) {
                font-size: 80px;
                line-height: 120px;
                width: 600px;
            }
        }

        &__learn-more {
            display: inline-block;
            text-decoration: none;
            text-transform: uppercase;

            @media (min-width: 1440px) {
                font-size: 42px;
            }
        }
    }

    .new {
        @media (min-width: 768px) {
            padding: 0 0 110px;
        }

        &__title {
            padding: 70px 0 40px;
            font-size: 30px;
            text-transform: uppercase;
            text-align: center;
            font-weight: 400;

            @media (min-width: 768px) {
                padding: 90px 0 45px;
                font-size: 48px;
            }

            @media (min-width: 1440px) {
                font-size: 64px;
            }
        }

        &__card-list-wrapper {
            overflow: hidden;

            @media (min-width: 768px) {
                max-width: 340px;
                position: relative;
                left: 50%;
                transform: translateX(-50%);
            }

            @media (min-width: 1440px) {
                max-width: 1300px;
            }
        }

        &__card-list {
            display: flex;
            transition: transform 0.5s ease;
        }

        &__card-item {
            display: grid;
            justify-items: center;
            flex-shrink: 0;
            width: 100%;
            padding: 30px 25px;
            border: 3px solid #000;
            font-family: 'Raleway', sans-serif;

            @media (min-width: 1440px) {
                width: 420px;
                height: 650px;
            }
        }

        &__card-image {
            width: auto;
            height: 200px;
            padding: 0 0 40px;

            @media (min-width: 1440px) {
                width: auto;
                height: 300px;
            }
        }

        &__card-name {
            padding: 0 0 30px;
            font-size: 18px;

            @media (min-width: 1440px) {
                font-size: 24px;
            }
        }

        &__card-type {
            padding: 0 0 30px;
            font-size: 14px;

            @media (min-width: 1440px) {
                font-size: 18px;
            }
        }

        &__card-wrapper {
            display: flex;
            gap: 10px;
            align-items: center;
            justify-content: center;
            width: 100%;
        }

        &__card-price {
            font-size: 22px;
            padding: 5px 10px;

            @media (min-width: 1440px) {
                font-size: 30px;
            }
        }

        &__card-button {
            padding: 5px 10px;
            font-family: 'Forum', sans-serif;
            text-transform: uppercase;
            cursor: pointer;

            @media (min-width: 1440px) {
                font-size: 30px;
            }
        }

        &__controls {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 250px;
            padding: 40px 64px 80px;
            margin: 0 auto;
            font-size: 22px;

            @media (min-width: 768px) {
                position: relative;
                top: -240px;
                width: 420px;
                padding: 0;
            }

            @media (min-width: 1440px) {
                position: static;
                padding: 70px 0 0;
            }
        }

        &__pagination-list {
            display: none;

            @media (min-width: 1440px) {
                display: flex;
                gap: 20px;
            }
        }

        &__pagination-item {
            width: 30px;
            height: 30px;
            border: 3px solid #000;
            border-radius: 50%;
            cursor: pointer;

            &.current {
                background: #000;
            }
        }

        &__control-right {
            transform: rotate(180deg);
        }

        &__control-left,
        &__control-right {
            cursor: pointer;
        }

        &__control-left[disabled],
        &__control-right[disabled] {
            fill: #aaaaaa;
            cursor: unset;
        }
    }

    .about {
        display: grid;
        color: #fff;
        font-size: 18px;
        line-height: 27px;

        &__text-wrapper {
            display: flex;
            flex-direction: column;
            padding: 0 25px 30px;
            min-height: 500px;
            background: #1596c1;
        }

        &__text {
            display: flex;
            align-items: center;
            text-align: center;
            flex-grow: 1;
            font-size: 18px;

            @media (min-width: 1440px) {
                font-size: 24px;
            }
        }

        &__title {
            padding: 30px 0;
            font-size: 30px;
            line-height: 45px;
            font-weight: 400;
            text-transform: uppercase;
            text-align: center;

            @media (min-width: 768px) {
                font-size: 48px;
                line-height: 72px;
            }

            @media (min-width: 1440px) {
                font-size: 64px;
                line-height: 96px;
            }
        }

        &__image-wrapper {
            height: 500px;

            &--about-us {
                background: url('/src/assets/hands-on-book.jpg') 50% 50% no-repeat;
                background-size: cover;
            }

            &--harmony {
                background: url('/src/assets/statue.jpg') 50% 50% no-repeat;
                background-size: cover;
            }
        }

        @media (min-width: 768px) {
            &__about-us {
                .about__text-wrapper {
                    order: 1;
                }
            }

            &__about-us,
            &__harmony {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
            }
        }
    }
}
</style>
