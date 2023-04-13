import { Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";
import React, { useEffect, useState } from "react";
import stylesGeneral from "../../styles/styles.module.scss";

type CopyableTextProps = {
  title: string;
  spanText: string;
  spanStyle?: string;
};

type LightTooltipProps = { copied: boolean } & TooltipProps;

const LightTooltip = styled(
  ({ className, copied, ...props }: LightTooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  )
)(({ theme, copied }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: copied ? stylesGeneral.focusColor : "black",
    boxShadow: theme.shadows[1],
    fontSize: 20,
  },
}));
const CopyableText = ({ title, spanStyle, spanText }: CopyableTextProps) => {
  const [titleText, setTitleText] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    setTitleText(title);
    setCopied(false);
  }, [title]);
  return (
    <LightTooltip
      placement="top"
      title={titleText}
      arrow
      copied={copied}
      style={{ cursor: "copy" }}
    >
      <span
        className={spanStyle}
        onMouseOut={() => {
          setTitleText(title);
          setCopied(false);
        }}
        onClick={() => {
          setTitleText("Copied");
          setCopied(true);
          navigator.clipboard.writeText(title);
        }}
      >
        {spanText}
      </span>
    </LightTooltip>
  );
};

export default CopyableText;
