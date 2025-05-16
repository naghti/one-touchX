import { defineStore } from 'pinia';

import { ref } from 'vue';

interface IBook {
    imageName?: string;
    author?: string;
    name?: string;
    type?: string;
    price?: number;
}

export const useAppStore = defineStore('app-store', () => {
    const booksData = ref<IBook[]>([
        {
            imageName: 'book1.jpg',
            author: 'Р. Брэдбери',
            name: 'Вино из одуванчиков',
            type: 'Тип книги',
            price: 111,
        },
        {
            imageName: 'book2.jpg',
            author: 'Н. Кун',
            name: 'Легенды и мифы Древней Греции',
            type: 'Тип книги',
            price: 222,
        },
        {
            imageName: 'book3.jpg',
            author: 'Ж. Верн',
            name: 'Двадцать тысяч лье под водой',
            type: 'Тип книги',
            price: 111,
        },
        {
            imageName: 'book4.jpg',
            author: 'М. Булкагов',
            name: 'Мастер и Маргарита',
            type: 'Тип книги',
            price: 111,
        },
        {
            imageName: 'book5.jpg',
            author: 'Гомер',
            name: 'Илиада',
            type: 'Тип книги',
            price: 111,
        },
        {
            imageName: 'book6.jpg',
            author: 'Д. Алигьери',
            name: 'Божественная комедия',
            type: 'Тип книги',
            price: 111,
        },
        {
            imageName: 'book7.jpg',
            author: 'В. Гюго',
            name: 'Собор Парижской Богоматери',
            type: 'Тип книги',
            price: 111,
        },
        {
            imageName: 'book8.jpg',
            author: 'Л. Кэрролл',
            name: 'Алиса в Стране чудес и в Зазеркалье',
            type: 'Тип книги',
            price: 111,
        },
        {
            imageName: 'book9.jpg',
            author: 'Д. Дефо',
            name: 'Робинзон Крузо',
            type: 'Тип книги',
            price: 111,
        },
        {
            imageName: 'book10.jpg',
            author: 'О. Уайльд',
            name: 'Портрет Дориана Грея',
            type: 'Тип книги',
            price: 111,
        },
        {
            imageName: 'book11.jpg',
            author: 'А. Грин',
            name: 'Алые паруса',
            type: 'Тип книги',
            price: 111,
        },
        {
            imageName: 'book12.jpg',
            author: 'А. Дюма',
            name: 'Три мушкетера',
            type: 'Тип книги',
            price: 111,
        },
        {
            imageName: 'book13.jpg',
            author: 'А. Пушкин',
            name: 'Евгений Онегин',
            type: 'Тип книги',
            price: 111,
        },
        {
            imageName: 'book14.jpg',
            author: 'Н. Гоголь',
            name: 'Мертвые души',
            type: 'Тип книги',
            price: 111,
        },
        {
            imageName: 'book15.jpg',
            author: 'И. Гончаров',
            name: 'Обломов',
            type: 'Тип книги',
            price: 111,
        },
    ]);
    return { booksData };
});
