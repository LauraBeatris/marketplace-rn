import React from "react";

import categories from "../../fixtures/categories";
import Category from "./Category";
import { CategoriesContainer } from "./styles";

export const Categories: React.FC = () => (
  <CategoriesContainer
    data={categories}
    keyExtractor={item => item.id}
    renderItem={({ item }) => (
      <Category name={item.name} icon={item.icon} />
    )}
    horizontal
  />
);

export default Categories;
