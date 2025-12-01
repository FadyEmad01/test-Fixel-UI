import { index } from '__registry__';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface PageProps {
  params: Promise<{ name: string }>;
}

// Helper function to unwrap values from demoProps structure
function unwrapValues(obj: Record<string, any>): Record<string, any> {
  if (obj !== null && typeof obj === 'object' && !Array.isArray(obj)) {
    if ('value' in obj) {
      return obj.value;
    }
    const result: Record<string, any> = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = unwrapValues(obj[key]);
      }
    }
    return result;
  }
  return obj;
}

// Helper function to flatten first level of nested objects
function flattenFirstLevel<T>(input: Record<string, any>): T {
  return Object.values(input).reduce((acc, current) => {
    return { ...acc, ...current };
  }, {} as T);
}

export default async function IframePage({ params }: PageProps) {
  const { name } = await params;
  const registryEntry = index[name];

  if (!registryEntry || !registryEntry.component) {
    notFound();
  }

  const Component = registryEntry.component;
  
  // Get demoProps if they exist
  const demoProps = (Component as any)?.demoProps;
  const componentProps = demoProps ? unwrapValues(demoProps) : {};
  const flattenedProps: Record<string, any> = Object.keys(componentProps).length > 0 
    ? flattenFirstLevel(componentProps) 
    : {};

  return (
    <div className="flex min-h-screen w-dvw items-center justify-center p-4 ">
      <Suspense fallback={
        <div className="flex items-center justify-center text-sm text-muted-foreground">
          Loading...
        </div>
      }>
        <Component {...(flattenedProps as any)} />
      </Suspense>
    </div>
  );
}

// Generate static params for all components in the registry
export function generateStaticParams() {
  return Object.keys(index)
    .filter((name) => {
      const entry = index[name];
      // Only generate pages for components that have a component (not style-only entries)
      return entry?.component && entry.type !== 'registry:style';
    })
    .map((name) => ({
      name,
    }));
}

