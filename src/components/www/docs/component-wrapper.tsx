'use client';

import { OpenInV0Button } from '@/components/www/docs/open-in-v0-button';
import { Button } from '@/components/www/ui/button';
import { ScrollArea, ScrollBar, ScrollViewport } from '@/components/www/ui/scroll-area';
import { Fullscreen, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import Iframe from './iframe';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface ComponentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  iframe?: boolean;
  bigScreen?: boolean;
  fullScreen?: boolean;
  tweakpane?: React.ReactNode;
}

export const ComponentWrapper = ({
  className,
  children,
  name,
  iframe = false,
  bigScreen = false,
  fullScreen,
  tweakpane,
}: ComponentWrapperProps) => {
  const [tweakMode, setTweakMode] = useState(false);
  const [key, setKey] = useState(0);

  const isMobile = useIsMobile();

  return (
    <div className="bg-accent rounded-xl p-1.5">

      <div className="absolute top-4 right-4 z-9 bg-background/5 backdrop-blur-sm flex items-center justify-end gap-2 p-1 rounded-[11px]">
        <OpenInV0Button url={`https://test-fixel-ui.vercel.app/r/${name}.json`} />

        <Button
          onClick={() => setKey((prev) => prev + 1)}
          className="flex items-center rounded-lg"
          variant="secondary"
          size="icon-lg"
          asChild
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw aria-label="restart-btn" size={14} />
          </motion.button>
        </Button>

        <Button
          onClick={() => window.open(`/examples/iframe/${name}`, '_blank')}
          className="flex items-center rounded-lg"
          variant="secondary"
          size="icon-lg"
          asChild
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Fullscreen aria-label="fullscreen-btn" size={14} />
          </motion.button>
        </Button>

        {tweakpane && (
          <Button
            onClick={() => setTweakMode((prev) => !prev)}
            className="flex items-center rounded-lg"
            variant="secondary"
            size="icon-lg"
            asChild
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SlidersHorizontal aria-label="tweak-btn" size={14} />
            </motion.button>
          </Button>
        )}
      </div>

      <motion.div
        id="component-wrapper"
        className={cn(
          'max-w-screen max-h-[400px] relative rounded-md bg-background flex flex-col md:flex-row no-scrollbar',
          bigScreen && 'overflow-hidden ',
          className,
        )}
      >
        <ScrollArea className="flex-1 max-h-[400px] overflow-scroll no-scrollbar">
          <ScrollViewport className="h-full">
            <ScrollBar />
            <div className="relative min-h-full flex-1">
              {/* <div className="absolute top-2 right-2 z-10 bg-background flex items-center justify-end gap-2 p-1 rounded-[11px]">
                <OpenInV0Button url={`https://test-fixel-ui.vercel.app/r/${name}.json`} />

                <Button
                  onClick={() => setKey((prev) => prev + 1)}
                  className="flex items-center rounded-lg"
                  variant="secondary"
                  size="icon-lg"
                  asChild
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RotateCcw aria-label="restart-btn" size={14} />
                  </motion.button>
                </Button>

                <Button
                  onClick={() => window.open(`/examples/iframe/${name}`, '_blank')}
                  className="flex items-center rounded-lg"
                  variant="secondary"
                  size="icon-lg"
                  asChild
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Fullscreen aria-label="fullscreen-btn" size={14} />
                  </motion.button>
                </Button>

                {tweakpane && (
                  <Button
                    onClick={() => setTweakMode((prev) => !prev)}
                    className="flex items-center rounded-lg"
                    variant="secondary"
                    size="icon-lg"
                    asChild
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <SlidersHorizontal aria-label="tweak-btn" size={14} />
                    </motion.button>
                  </Button>
                )}
              </div> */}

              {/* {iframe ? (
                <Iframe key={key} name={name} bigScreen={bigScreen} />
              ) : (
                <div
                  key={key}
                  className="flex w-full items-center justify-center px-10 py-16 no-scrollbar"
                >
                  {children}
                </div>
              )} */}
              <div className='px-10 py-16'>
                {children}
              </div>

            </div>
          </ScrollViewport>
        </ScrollArea>

        <motion.div
          initial={false}
          animate={{
            width: isMobile ? '100%' : tweakMode ? '250px' : '0px',
            height: isMobile ? (tweakMode ? '250px' : '0px') : 'auto',
            opacity: tweakMode ? 1 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            restDelta: 0.01,
          }}
          className="relative"
        >
          <div className="absolute inset-0 overflow-y-auto">{tweakpane}</div>
        </motion.div>
      </motion.div>
    </div>
  );
};
