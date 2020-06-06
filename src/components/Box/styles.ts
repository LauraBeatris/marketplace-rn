import styled from "styled-components/native";

export const BoxContainer = styled.View`
  height: 300px;
  background-color: ${({ theme }) => theme.colors.rose};
  width: 100%;
  margin: 20px 0;
  border-radius: 6px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

export const BoxImage = styled.Image`
  min-width: 210px;
  min-height: 190px;
  border-radius: 6px;
`;

export const BoxText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 24px;
  font-weight: bold;
  margin-top: 8px;
`;

export const BoxLabel = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 6px;
  width: 50px;
  height: 24px;
  align-items: center;
  justify-content: center;
`;

export const BoxLabelText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.purple};
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
`;
