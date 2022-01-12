import React from "react";
import { TextProps, TextStyle } from "react-native";
import styled, { useTheme } from "styled-components/native";
import {
  compose,
  fontSize,
  FontSizeProps,
  textAlign,
  TextAlignProps,
  lineHeight,
  LineHeightProps,
  system,
} from "styled-system";
import baseStyled, { BaseStyledProps } from "../styled";

import BracketRight from "../../icons/BracketLeft";
import BracketLeft from "../../icons/BracketRight";
import { getColor } from "../../styles";
import { FontWeightTypes, getTextStyle } from "./getTextStyle";
import { TextVariants } from "../../styles/theme";

const uppercase = system({
  uppercase: {
    property: "textTransform",
    transform: (value) => (value ? "uppercase" : "none"),
  },
});

const textTransform = system({
  textTransform: {
    property: "textTransform",
  },
});

export interface BaseTextProps
  extends TextProps,
    BaseStyledProps,
    FontSizeProps,
    TextAlignProps,
    LineHeightProps {
  variant?: TextVariants;
  fontWeight?: FontWeightTypes;
  fontFamily?: string;
  fontSize?: number | string | TextVariants;
  color?: string;
  lineHeight?: number | string;
  bracket?: boolean;
  textTransform?: TextStyle["textTransform"];
  uppercase?: boolean;
  children: React.ReactNode;
}

const Base = baseStyled.Text.attrs((p: BaseTextProps) => ({
  fontSize: p.fontSize ? p.fontSize : p.variant ?? "paragraph",
  color: p.color || "neutral.c100",
}))<BaseTextProps>`
  ${(p) => getTextStyle(p)}
  ${compose(lineHeight, fontSize, textAlign, uppercase, textTransform)}
  justify-content: center;
  align-items: center;
`;

const T = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const BracketText = ({ children, color = "neutral.c100", lineHeight, ...props }: BaseTextProps) => {
  const size = lineHeight || getTextStyle(props).lineHeight;
  const theme = useTheme();
  const c: string = theme ? (getColor(theme, color) as string) : "transparent";
  return (
    <T>
      <BracketLeft fill={c} width={size} height={size} />
      <Base {...props} color={color} bracket>
        {children}
      </Base>
      <BracketRight fill={c} width={size} height={size} />
    </T>
  );
};

const Text = ({ children, bracket, ...props }: BaseTextProps) => {
  if (bracket) return <BracketText {...props}>{children}</BracketText>;

  return <Base {...props}>{children}</Base>;
};

export default Text;
