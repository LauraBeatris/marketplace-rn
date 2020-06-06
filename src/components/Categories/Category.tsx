import React from "react";

import {
  CategoryContainer,
  CategoryName,
  CategoryIconContainer,
} from "./styles";
import { Category as CategoryProps } from "./types";

const Category: React.FC<Omit<CategoryProps, "id">> = ({ name, icon: Icon }) => (
  <CategoryContainer>
    <CategoryIconContainer>{Icon}</CategoryIconContainer>
    <CategoryName>{name}</CategoryName>
  </CategoryContainer>
);

export default Category;
