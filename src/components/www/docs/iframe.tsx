'use client';

import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar, ScrollViewport } from '@/components/www/ui/scroll-area';
import { useEffect, useState } from 'react';

export default function Iframe({
  name,
  bigScreen = false,
}: {
  name: string;
  bigScreen?: boolean;
}) {
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);

  useEffect(() => {
    const origin = window.location.origin;
    setIframeUrl(`${origin}/examples/iframe/${name}`);
  }, [name]);

  if (!iframeUrl) return null;

  return (
    <ScrollArea className={cn('h-[400px] rounded-md no-scrollbar')}>
       {/* className={cn('h-[500px] rounded-md', bigScreen && 'w-[1600px]')} */}
      <ScrollViewport className="h-full no-scrollbar">
        <iframe
          src={iframeUrl}
          className="h-[400px] no-scrollbar w-full rounded-md"
        />
        <ScrollBar/>
      </ScrollViewport>
    </ScrollArea>
  );
}
