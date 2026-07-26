import { ActivePage } from '../types';

export function getPagePath(page: ActivePage): string {
  if (page === 'home') return '/';
  if (page === 'services') return '/services';
  if (page === 'blog') return '/blog';
  if (page === 'about') return '/about';
  if (page === 'contact') return '/contact';

  if (page.startsWith('service-')) {
    const id = page.replace('service-', '');
    return `/services/${id}`;
  }

  if (page.startsWith('blog-')) {
    const id = page.replace('blog-', '');
    return `/blog/${id}`;
  }

  return '/';
}

export function getActivePageFromPath(pathname: string): ActivePage {
  const cleanPath = pathname.replace(/\/$/, '') || '/';

  if (cleanPath === '/') return 'home';
  if (cleanPath === '/services') return 'services';
  if (cleanPath === '/blog') return 'blog';
  if (cleanPath === '/about') return 'about';
  if (cleanPath === '/contact') return 'contact';

  if (cleanPath.startsWith('/services/')) {
    const id = cleanPath.replace('/services/', '');
    return `service-${id}` as ActivePage;
  }

  if (cleanPath.startsWith('/blog/')) {
    const id = cleanPath.replace('/blog/', '');
    return `blog-${id}` as ActivePage;
  }

  return 'home';
}
