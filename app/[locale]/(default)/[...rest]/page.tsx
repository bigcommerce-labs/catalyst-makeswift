import { Page as MakeswiftPage } from '@makeswift/runtime/next';
import { getSiteVersion } from '@makeswift/runtime/next/server';
import { notFound } from 'next/navigation';

import { client } from '~/makeswift/client';
import { MakeswiftProvider } from '~/makeswift/provider';

interface CatchAllParams {
  locale: string;
  rest: string[];
}

export async function generateStaticParams() {
  const pages = await client.getPages();

  return pages.map((page) => ({
    path: page.path.split('/').filter((segment) => segment !== ''),
  }));
}

export default async function Page({ params }: { params: CatchAllParams }) {
  const path = `/${params.rest.join('/')}`;

  const snapshot = await client.getPageSnapshot(path, {
    siteVersion: getSiteVersion(),
  });

  if (snapshot == null) return notFound();

  return (
    <MakeswiftProvider>
      <MakeswiftPage snapshot={snapshot} />
    </MakeswiftProvider>
  );
}

export const runtime = 'nodejs';
