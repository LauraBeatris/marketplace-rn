import styled from "styled-components/native";

export const Container = styled.View`
  position: absolute;
  bottom: 0px;
  flex-direction: row;
  background: ${({ theme }) => theme.colors.white};
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.5);
`;

export const CartPricing = styled.Text`
  padding: 20px;
`;

export const CartTotalPrice = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.blueSecondary};
  font-weight: bold;
`;

export const CartButton = styled.TouchableOpacity`
  flex-direction: row;
  background: ${({ theme }) => theme.colors.white};

  flex: 1;
  padding: 20px 20px;
  justify-content: space-between;
  align-items: center;
`;

export const CartButtonText = styled.Text`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.blueSecondary};
  margin-left: 15px;
  flex: 1;
  margin-right: auto;
`;
