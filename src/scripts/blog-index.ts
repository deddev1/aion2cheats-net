/** Blog index topic filters + Starwind sort select. */

function initBlogIndexFilters(root: HTMLElement) {
  if (root.dataset.blogFiltersBound === 'true') return;

  const grid = root.querySelector<HTMLElement>('#blog-grid');
  const emptyEl = root.querySelector<HTMLElement>('#blog-empty');
  const sortRoot = root.querySelector<HTMLElement>('#blog-sort-select');
  if (!grid) return;

  const emptyMessage =
    root.getAttribute('data-empty-message') ?? 'No articles match this filter.';

  const filters = [
    ...root.querySelectorAll<HTMLButtonElement>('[data-blog-filter]'),
  ];
  if (!filters.length) return;

  root.dataset.blogFiltersBound = 'true';

  const featuredWrap = root.querySelector<HTMLElement>('[data-blog-featured]');
  const featuredCard = featuredWrap?.querySelector<HTMLElement>('[data-blog-card]');
  const sortSelect = sortRoot?.querySelector<HTMLElement>('[data-sw-select]');
  const sortInput = sortRoot?.querySelector<HTMLInputElement>('[data-sw-select-input]');

  let currentSort = sortInput?.value || sortSelect?.getAttribute('data-value') || 'newest';

  const gridCards = () => [...grid.querySelectorAll<HTMLElement>('[data-blog-card]')];

  const activeTag = () =>
    filters.find((btn) => btn.getAttribute('aria-pressed') === 'true')?.getAttribute(
      'data-blog-filter',
    ) ?? 'all';

  const compareCards = (a: HTMLElement, b: HTMLElement, sort: string) => {
    const tsA = Number(a.getAttribute('data-ts') ?? 0);
    const tsB = Number(b.getAttribute('data-ts') ?? 0);
    const readA = Number(a.getAttribute('data-read-minutes') ?? 0);
    const readB = Number(b.getAttribute('data-read-minutes') ?? 0);
    if (sort === 'oldest') return tsA - tsB;
    if (sort === 'short') return readA - readB;
    if (sort === 'long') return readB - readA;
    return tsB - tsA;
  };

  const setVisible = (el: HTMLElement, match: boolean) => {
    el.classList.toggle('hidden', !match);
    // HTML hidden beats utility `flex` on the card.
    el.toggleAttribute('hidden', !match);
  };

  const apply = (sortOverride?: string) => {
    const tag = activeTag();
    const sort = sortOverride ?? currentSort;
    currentSort = sort;
    const items = gridCards();

    const sorted = [...items].sort((a, b) => compareCards(a, b, sort));
    sorted.forEach((el) => grid.appendChild(el));

    let visibleCount = 0;

    if (featuredWrap && featuredCard) {
      const featuredMatch =
        tag === 'all' || featuredCard.getAttribute('data-tag') === tag;
      setVisible(featuredWrap, featuredMatch);
      if (featuredMatch) visibleCount += 1;
    }

    items.forEach((el) => {
      const match = tag === 'all' || el.getAttribute('data-tag') === tag;
      setVisible(el, match);
      if (match) visibleCount += 1;
    });

    if (emptyEl) {
      emptyEl.classList.toggle('hidden', visibleCount > 0);
      emptyEl.toggleAttribute('hidden', visibleCount > 0);
      emptyEl.textContent = emptyMessage;
    }
  };

  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      filters.forEach((b) => {
        b.setAttribute('aria-pressed', 'false');
        b.classList.remove('is-active');
      });
      btn.setAttribute('aria-pressed', 'true');
      btn.classList.add('is-active');
      apply();
    });
  });

  // Starwind emits starwind:value-change BEFORE it writes the new value to the DOM.
  // Read the next value from event.detail, not from the still-stale input/attribute.
  const onSortChange = (event: Event) => {
    if (!(event instanceof CustomEvent)) return;
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (!sortSelect || (target !== sortSelect && !sortSelect.contains(target))) return;

    const detail = event.detail as { value?: unknown } | null;
    const next =
      typeof detail?.value === 'string' && detail.value
        ? detail.value
        : sortInput?.value || currentSort;

    apply(next);
  };

  document.addEventListener('starwind:value-change', onSortChange);

  // Fallback if the select only updates the hidden input.
  sortInput?.addEventListener('change', () => {
    apply(sortInput.value || 'newest');
  });

  // Sync initial active pill class
  filters.forEach((b) => {
    b.classList.toggle('is-active', b.getAttribute('aria-pressed') === 'true');
  });

  requestAnimationFrame(() => apply());
  window.setTimeout(() => apply(), 0);
}

export function setupBlogIndexFilters() {
  const run = () => {
    document.querySelectorAll<HTMLElement>('[data-blog-index]').forEach((root) => {
      if (!document.contains(root)) return;
      initBlogIndexFilters(root);
    });
  };

  run();
  document.addEventListener('astro:page-load', run);
}
