export const getCategories = (data) => {
  const categoriesOrigin = new Set();
  let types = data.reduce((obj, category) => {
    categoriesOrigin.add(category.hierarchicalCategories.lvl0);
    if (!obj[category.type]) {
      obj[category.type] = 0;
    }
    obj[category.type]++;
    return obj;
  }, {});

  let brands = data.reduce((obj, category) => {
    if (!obj[category.brand]) {
      obj[category.brand] = 0;
    }
    obj[category.brand]++;
    return obj;
  }, {});

  let categories = [...categoriesOrigin].slice(0, 10);
  categories = categories.map((category) => {
    return {
      name: category,
      level: 0,
      isActive: false,
    };
  });
  types = Object.entries(types)
    .sort((a, b) => -a[1] + b[1])
    .slice(0, 5)
    .map(([key, value]) => {
      return { type: key, quantity: value, checked: false };
    });
  brands = Object.entries(brands).sort((a, b) => -a[1] + b[1]);
  return { categories, types, brands };
};
