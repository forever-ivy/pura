"use client";

import React, { forwardRef, useImperativeHandle, useCallback } from "react";
import { motion, useAnimate } from "motion/react";

export interface AnimatedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

export interface AnimatedIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

const PuraIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      // 1. 外层水滴：修复了穿模问题，幅度更克制
      animate(
        ".drop",
        {
          y: [0, -2, 0], // 减小位移幅度，防止顶部被切
          scale: [1, 1.03, 1], // 微调缩放，避免过度膨胀
          strokeWidth: [strokeWidth, strokeWidth + 0.5, strokeWidth],
          opacity: [1, 0.7, 1],
        },
        {
          duration: 4,
          ease: [0.4, 0, 0.2, 1],
          repeat: Infinity,
        },
      );

      // 2. 内层心苗：保持灵动，但位置更稳
      animate(
        ".soul",
        {
          y: [0, -1.5, 0.5, 0],
          scale: [1, 1.1, 0.95, 1.05, 1],
          opacity: [0.8, 1, 0.7, 0.9, 0.8],
        },
        {
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          times: [0, 0.3, 0.6, 0.8, 1],
        },
      );
    }, [animate, strokeWidth]);

    const stop = useCallback(() => {
      animate(
        ".drop, .soul",
        { y: 0, scale: 1, opacity: 1, strokeWidth: strokeWidth },
        { duration: 0.5, ease: "easeInOut" },
      );
    }, [animate, strokeWidth]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.svg
        ref={scope}
        onHoverStart={start}
        onHoverEnd={stop}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`cursor-pointer ${className}`}
        // 移除 overflow visible，确保设计本身就在框内，适应性更好
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />

        {/* 外层水滴 (New Path)
            - 底部锚点在 (12, 22)，给下方留一点点余量
            - 顶部尖端在 (12, 3)，给上方留出足够的动画空间 (y: -2 时到达 y=1，不会穿模)
        */}
        <motion.path
          className="drop"
          style={{ transformOrigin: "center bottom" }}
          d="M12 22a8 8 0 0 1 -8 -8c0 -4 8 -11 8 -11s8 7 8 11a8 8 0 0 1 -8 8z"
        />

        {/* 内层心苗
            - 位置微调，使其重心完美坐落在新水滴的腹部
        */}
        <motion.path
          className="soul"
          style={{ transformOrigin: "center" }}
          d="M12 18c-2.2 0 -3.5 -1.3 -3.5 -2.6c0 -1.3 1.8 -2.6 3.5 -4.4c1.8 1.8 3.5 3.1 3.5 4.4c0 1.3 -1.3 2.6 -3.5 2.6z"
        />
      </motion.svg>
    );
  },
);

PuraIcon.displayName = "PuraIcon";
export default PuraIcon;
