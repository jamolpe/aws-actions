import { Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";
import React, { useState } from "react";

type CopyableTextProps = {
  text: string;
  spanStyle?: string;
};

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 20,
  },
}));
const CopyableText = ({ text, spanStyle }: CopyableTextProps) => {
  const [titleText, setTitleText] = useState(text);
  return (
    <LightTooltip title={titleText} arrow style={{ cursor: "copy" }}>
      <span
        className={spanStyle}
        onMouseOut={() => setTitleText(text)}
        onClick={() => {
          setTitleText("Copied");
          navigator.clipboard.writeText(text);
        }}
      >
        {text}
      </span>
    </LightTooltip>
  );
};

export default CopyableText;
