import React from "react";
import { View } from "react-native";

import formatValue from "../../utils/formatValue";
import {
  BoxContainer,
  BoxImage,
  BoxLabel,
  BoxText,
  BoxLabelText,
} from "./styles";

interface BoxProps {
  productName: string;
  productPrice: number;
  productPhotoUrl: string;
  isNew?: boolean;
}

const Box: React.FC<BoxProps> = ({
  productName,
  productPrice,
  productPhotoUrl,
  isNew = false,
}) => {
  const imageSource = {
    uri: productPhotoUrl,
  };

  return (
    <BoxContainer>
      <View>
        {isNew && (
          <BoxLabel>
            <BoxLabelText>New</BoxLabelText>
          </BoxLabel>
        )}
        <BoxText>{productName}</BoxText>
        <BoxText>{formatValue(productPrice)}</BoxText>
      </View>
      <BoxImage
        source={imageSource}
      />
    </BoxContainer>
  );
};

export default Box;
