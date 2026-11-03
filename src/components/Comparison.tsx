import { products } from '../data/products';
import { useShortlist } from '../hooks/useShortlist';

const rows: { label: string; get: (p: (typeof products)[number]) => string }[] = [
  { label: 'Category', get: (p) => p.category },
  { label: 'GSM', get: (p) => p.gsm },
  { label: 'Composition', get: (p) => p.composition },
  { label: 'Width', get: (p) => p.width },
  { label: 'Hand-feel', get: (p) => p.handfeel },
  { label: 'Best for', get: (p) => p.uses.join(', ') },
];

/** Side-by-side spec table for up to three shortlisted fabrics. */
export default function Comparison() {
  const { compareIds, toggleCompare, maxCompare } = useShortlist();
  const picked = compareIds.map((id) => products.find((p) => p.id === id)).filter(Boolean) as typeof products;

  if (picked.length < 2) {
    return (
      <div className="compare compare--empty" role="status">
        <p>
          Tick <strong>Compare</strong> on two or three shortlisted fabrics to see their specs side by side.
          {picked.length === 1 && ' One selected — pick at least one more.'}
        </p>
      </div>
    );
  }

  return (
    <div className="compare">
      <h3 className="compare__title">Comparing {picked.length} of up to {maxCompare}</h3>
      <div className="compare__scroll" tabIndex={0} role="region" aria-label="Fabric comparison table">
        <table>
          <thead>
            <tr>
              <th scope="col"><span className="sr-only">Specification</span></th>
              {picked.map((p) => (
                <th scope="col" key={p.id}>
                  {p.name}
                  <button type="button" className="link" onClick={() => toggleCompare(p.id)} aria-label={`Remove ${p.name} from comparison`}>
                    remove
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label}>
                <th scope="row">{r.label}</th>
                {picked.map((p) => (
                  <td key={p.id}>{r.get(p)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
