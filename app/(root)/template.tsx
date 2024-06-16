"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext, useRef } from "react";

// Prevents instant page opening
function FrozenRouter(props: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext ?? {});
  const frozen = useRef(context).current;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}

const variants = {
  initial: { scaleY: 0, originY: 0.5, opacity: 0 },
  animate: { scaleY: 1, originY: 0.5, opacity: 1 },
  exit: { scaleY: 0, originY: 0.5, opacity: 0 },
};

export default function Template({ children }: { children: React.ReactNode }) {
  let pathname = usePathname();
  let searchParams = useSearchParams();
  const [fremer, setFremer] = useState(pathname);

  useEffect(() => {
    setFremer(pathname);
  }, [pathname, searchParams]);

  return (
    <>
      <AnimatePresence mode={"wait"} initial={true}>
        <motion.div
          key={fremer}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.8, ease: [0.27, 0.94, 0.48, 1.0] }}
          className="w-full h-full">
          <FrozenRouter>{children}</FrozenRouter>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
