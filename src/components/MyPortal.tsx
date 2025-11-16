/**
 * File: src/components/MyPortal.tsx
 */

import type React from "react";
import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
  isModalView: boolean;
};

export default function MyPortal({ children, isModalView }: Props) {
  const portalRoot = document.getElementById("portal-root");

  if (!portalRoot || !isModalView) return null;

  return createPortal(<div className="my-portal">{children}</div>, portalRoot);
}
