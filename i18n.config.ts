export default defineI18nConfig(() => ({
  legacy: false,
  messages: {
    en: {
      diary: "diary",
      add: "add",
      list: "list",
      calories: "calories",
      proteins: "proteins",
      fats: "fats",
      carbs: "carbs",
      edit: "edit",
      save: "save",
      cancel: "cancel",
      placeholder: {
        search: "search",
        selectProduct: "select a product",
      },
      measurement: {
        gramm: {
          short: "g",
          long: "grams",
        },
      },
    },
    ru: {
      diary: "журнал",
      add: "добавить",
      list: "список",
      calories: "калории",
      proteins: "белки",
      fats: "жиры",
      carbs: "углеводы",
      edit: "редактировать",
      save: "сохранить",
      cancel: "отменить",
      placeholder: {
        search: "поиск",
        selectProduct: "выберите продукт",
      },
      measurement: {
        gramm: {
          short: "г",
          long: "грамм",
        },
      },
    },
  },
}));
