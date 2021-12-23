import React from "react"
import { styled } from "../../stitches.config"

const DEFAULT_TAG = "section"

export const Box = styled("div", {
  // Reset
  m: 0,
  p: 0,
  boxSizing: "border-box",
  display: "grid",
  variants: {
    columns: {
      auto: { gridAutoFlow: "column" },
      free: { gridTemplateColumns: "repeat(1fr)" },
      "auto-free": { gridTemplateColumns: "auto 1fr" },
      "free-auto": { gridTemplateColumns: "1fr auto" },
    },
    width: {
      full: { width: "100%" },
      screen: { width: "100vw" },
    },
    height: {
      full: { height: "100%" },
      screen: { height: "100vh" },
    },
    debug: {
      true: { border: "1px solid magenta" },
    },
    gap: {
      none: { gap: "0px" },
      "xx-tight": { gap: "$0" },
      "x-tight": { gap: "$1" },
      tight: { gap: "$2" },
      normal: { gap: "$3" },
      loose: { gap: "$5" },
      "x-loose": { gap: "$6" },
    },
    direction: {
      horizontal: { gridAutoFlow: "column" },
      vertical: { gridAutoFlow: "row" },
    },
    alignItems: {
      start: { alignItems: "start" },
      center: { alignItems: "center" },
      end: { alignItems: "end" },
      stretch: { alignItems: "stretch" },
    },
    alignContent: {
      start: { alignContent: "start" },
      center: { alignContent: "center" },
      end: { alignContent: "end" },
      stretch: { alignContent: "stretch" },
    },
    alignSelf: {
      start: { alignSelf: "start" },
      center: { alignSelf: "center" },
      end: { alignSelf: "end" },
      stretch: { alignSelf: "stretch" },
    },
    justifyItems: {
      start: { justifyItems: "start" },
      center: { justifyItems: "center" },
      end: { justifyItems: "end" },
      stretch: { justifyItems: "stretch" },
    },
    justifyContent: {
      start: { justifyContent: "start" },
      center: { justifyContent: "center" },
      end: { justifyContent: "end" },
      stretch: { justifyContent: "stretch" },
    },
    justifySelf: {
      start: { justifySelf: "start" },
      center: { justifySelf: "center" },
      end: { justifySelf: "end" },
      stretch: { justifySelf: "stretch" },
    },
  },
  defaultVariants: {
    gap: "normal",
  },
})
