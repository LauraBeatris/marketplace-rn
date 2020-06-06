import styled from "styled-components/native";
import { FlatList } from "react-native";

import { Category } from "./types";

export const CategoriesContainer = styled(
  FlatList as new () => FlatList<Category>,
).attrs({
  contentContainerStyle: {
    justifyContent: "center",
    flex: 1,
  },
})`
  padding: 0 10px;
`;

export const CategoryContainer = styled.View`
  display: flex;
  height: 100px;
  margin: 20px 10px;
`;

export const CategoryIconContainer = styled.View`
  width: 62px;
  height: 62px;
  border-radius: 62px;
  padding: 4px;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.white};
`;

export const CategoryName = styled.Text`
  margin-top: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;
