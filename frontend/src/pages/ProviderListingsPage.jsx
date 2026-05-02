import { useMemo, useState } from "react";
import PageIntroCard from "../components/PageIntroCard";

const providers = [
  { id: "p1", name: "Urban Barber", location: "Dublin 1", category: "barber" },
  {
    id: "p2",
    name: "Smart Drive Academy",
    location: "Dublin 8",
    category: "driving",
  },
  { id: "p3", name: "Tutor Anna", location: "Dublin 2", category: "tutoring" },
];

function ProviderListingsPage() {
  const [query, setQuery] = useState("");
  const items = useMemo(() => {
    return providers.filter((provider) => {
      const text = `${provider.name} ${provider.location} ${provider.category}`;
      return text.toLowerCase().includes(query.trim().toLowerCase());
    });
  }, [query]);

  return (
    <PageIntroCard
      title="Service Provider Listings"
      description="Users can search and filter providers before booking."
    >
      <label>
        Search providers
        <input
          type="search"
          placeholder="barber, tutor, Dublin..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <ul className="result-list">
        {items.map((provider) => (
          <li key={provider.id} className="result-card">
            <p className="result-title">{provider.name}</p>
            <p>
              {provider.location} · {provider.category}
            </p>
          </li>
        ))}
      </ul>
    </PageIntroCard>
  );
}

export default ProviderListingsPage;
