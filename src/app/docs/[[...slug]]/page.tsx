import { getPageImage, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { findNeighbour } from 'fumadocs-core/page-tree';
import Link from 'next/link';
import { Button } from '@/components/www/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  const neighbours = findNeighbour(source.pageTree, page.url);


  return (
    <>
      <div className='pt-10 xl:pt-0 overflow-hidden'>
        <DocsPage breadcrumb={{ enabled: false }} article={{ className: '!p-0 border-none' }} tableOfContent={{ enabled: true, style: 'clerk' }} toc={page.data.toc} full={page.data.full} footer={{ enabled: false }}>
          <div className="-m-px border bg-background px-4 py-6 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] sm:px-6 lg:rounded-t-2xl lg:rounded-b-xl lg:p-8 dark:before:shadow-[0_-1px_--theme(--color-white/8%)]">
            <div className="mx-auto w-full max-w-3xl">
              <div className="flex min-w-0 flex-1 flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    <DocsTitle>{page.data.title}</DocsTitle>
                    <DocsDescription>{page.data.description}</DocsDescription>
                  </div>
                </div>
                <div className="w-full flex-1 *:data-[slot=alert]:first:mt-0">
                  <DocsBody>
                    <MDX
                      components={getMDXComponents({
                        // this allows you to link to other pages with relative file paths
                        a: createRelativeLink(source, page),
                      })}
                    />
                  </DocsBody>
                </div>
              </div>
              <div className="items-center gap-2 pt-8 flex">
                {neighbours.previous && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="shadow-none"
                  >
                    <ChevronLeft />
                    <Link href={neighbours.previous.url}>
                      {neighbours.previous.name}
                    </Link>
                  </Button>
                )}
                {neighbours.next && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="ms-auto shadow-none"
                  >
                    <Link href={neighbours.next.url}>
                      {neighbours.next.name}{" "}
                    </Link>
                    <ChevronRight />
                  </Button>
                )}
              </div>
            </div>
          </div >
          <div className="px-4 py-6 lg:rounded-b-2xl lg:px-8">
            {/* <SiteFooter /> */}
            footer
          </div>
        </DocsPage>
      </div>

    </>

  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<'/docs/[[...slug]]'>,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
