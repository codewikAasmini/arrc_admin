'use client';
import { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
interface IAnimateSection {
  children: ReactNode;
}

const AnimateSection = ({ children }: IAnimateSection) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 }, }} viewport={{ once: true }} >
      {children}
    </motion.div>
  );
};

export default AnimateSection;