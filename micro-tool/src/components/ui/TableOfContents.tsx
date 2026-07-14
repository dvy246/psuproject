import { useEffect, useState } from 'preact/hooks';

interface TOCItem {
  id: string;
  text: string;
}

export default function TableOfContents() {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // 1. Find all H2s in the guide content
    const content = document.querySelector('.guide-content');
    if (!content) return;

    const headings = Array.from(content.querySelectorAll('h2'));
    
    // 2. Map and ensure ID existence
    const mappedItems = headings.map((h) => {
      let id = h.id;
      if (!id && h.textContent) {
        id = h.textContent
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        h.id = id;
      }
      return {
        id,
        text: h.textContent || '',
      };
    }).filter(item => item.id && item.text);

    setItems(mappedItems);

    // 3. Setup Intersection Observer to track active section
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    headings.forEach((h) => {
      if (h.id) observer.observe(h);
    });

    return () => {
      headings.forEach((h) => {
        if (h.id) observer.unobserve(h);
      });
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <div class="toc-card card">
      <h3 class="toc-title">Table of Contents</h3>
      <nav aria-label="Table of contents">
        <ul class="toc-list">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                class={`toc-link ${activeId === item.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(item.id);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Update URL hash
                    window.history.pushState(null, '', `#${item.id}`);
                    setActiveId(item.id);
                  }
                }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <style>{`
        .toc-card {
          position: sticky;
          top: 5.5rem;
          padding: 1.25rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          max-height: calc(100vh - 7rem);
          overflow-y: auto;
        }
        .toc-title {
          font-size: 0.875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 0.5rem;
        }
        .toc-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .toc-link {
          display: block;
          font-size: 0.8125rem;
          color: var(--text-secondary);
          text-decoration: none;
          line-height: 1.4;
          padding: 0.25rem 0;
          border-left: 2px solid transparent;
          padding-left: 0.75rem;
          transition: border-color 0.2s ease, color 0.2s ease;
        }
        .toc-link:hover {
          color: var(--accent-primary);
        }
        .toc-link.active {
          color: var(--accent-primary);
          border-left-color: var(--accent-primary);
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
