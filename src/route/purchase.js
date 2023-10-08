// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
  static #list = []

  static #count = 0

  constructor(img, title, description, price) {
    this.id = ++Product.#count
    this.img = img
    this.title = title
    this.description = description
    this.price = price
  }

  static add = (img, title, description, price) => {
    const newProduct = new Product(
      img,
      title,
      description,
      price,
    )

    this.#list.push(newProduct)
  }

  static getList = () => {
    return this.#list
  }

  static getById = (id) => {
    return this.#list.find((product) => product.id === id)
  }

  static getRandomList = (id) => {
    const filteredList = this.#list.filter(
      (product) => product.id !== id,
    )

    const shuffedList = filteredList.sort(
      () => Math.random() - 0.5,
    )

    return shuffedList.slice(0, 3)
  }
}

Product.add(
  'https://picsum.photos/200/300',
  "Комп'ютер COBRA Advanced (I11F.8.H1S2.15T.13356) Intel",
  'Intel Core i3-10100F (3.6 - 4.3 ГГц) / RAM 8 ГБ / HDD 1 ТБ + SSD 240 ГБ / GeForce GTX 1050 Ti, 4 ГБ / без ОД / LAN / Linux',
  [{ id: 1, text: 'Готовий до відправки' }],
  40000,
)

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-index',

    data: {
      list: Product.getList(),
      img: 'https://picsum.photos/200/300',
      title:
        "Комп'ютер COBRA Advanced (I11F.8.H1S2.15T.13356) Intel",
      description:
        'Intel Core i3-10100F (3.6 - 4.3 ГГц) / RAM 8 ГБ / HDD 1 ТБ + SSD 240 ГБ / GeForce GTX 1050 Ti, 4 ГБ / без ОД / LAN / Linux',
      price: 27000,
      isTop: true,
      isReady: true,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

router.get('/purchase-alert', function (req, res) {
  res.render('purchase-alert', {
    style: 'purchase-alert',

    data: {
      info: 'right',
      link: 'google.com',
    },
  })
})

// ================================================================

router.get('/purchase-product', function (req, res) {
  const id = Number(req.query.id)

  res.render('purchase-product', {
    style: 'purchase-product',

    data: {
      list: Product.getRandomList(id),
      product: Product.getById(id),
    },
  })

  console.log(id)
})

// ================================================================

// Підключаємо роутер до бек-енду
module.exports = router
