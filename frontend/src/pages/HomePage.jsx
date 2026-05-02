import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import HomeHero from "../components/HomeHero";
import ServiceResults from "../components/ServiceResults";
import ServiceSearchForm from "../components/ServiceSearchForm";

/*
 * Static service catalogue — placeholder data used for the client-side
 * search demo. Will be replaced by GET /api/services in the next iteration
 * once the API layer is connected to the React client.
 */
const SERVICES = [
  {
    id: "srv-1",
    title: "Driving Lessons with Michael",
    category: "driving",
    location: "Dublin 8",
    price: 45,
    rating: 4.9,
  },
  {
    id: "srv-2",
    title: "Math Tutor – Anna",
    category: "tutoring",
    location: "Dublin 2",
    price: 35,
    rating: 4.8,
  },
  {
    id: "srv-3",
    title: "Fade & Beard – Urban Barber",
    category: "barber",
    location: "Dublin 1",
    price: 28,
    rating: 4.7,
  },
  {
    id: "srv-4",
    title: "English Tutor – James",
    category: "tutoring",
    location: "Dublin 6",
    price: 32,
    rating: 4.6,
  },
];

/* HomePage — root landing view; composed of four stacked sections */
function HomePage() {
  /* Controlled form state — updated on every input change */
  const [filters, setFilters] = useState({
    category: "all",
    location: "",
    date: "",
  });

  /*
   * activeFilters is null until the user submits the search form.
   * Keeping it null hides the results section so the page is clean on load.
   */
  const [activeFilters, setActiveFilters] = useState(null);

  /* Field-level validation error messages keyed by input name */
  const [errors, setErrors] = useState({});

  /*
   * Derive visible services from activeFilters.
   * Only recomputes when activeFilters changes (i.e. on form submit),
   * not on every keystroke, so the list never flickers while typing.
   */
  const visibleServices = useMemo(() => {
    if (activeFilters === null) return [];

    return SERVICES.filter((service) => {
      /* Category: "all" skips the filter */
      const categoryMatch =
        activeFilters.category === "all" ||
        service.category === activeFilters.category;

      /* Location: empty string skips the filter; otherwise case-insensitive substring match */
      const locationMatch =
        activeFilters.location.trim() === "" ||
        service.location
          .toLowerCase()
          .includes(activeFilters.location.trim().toLowerCase());

      return categoryMatch && locationMatch;
    });
  }, [activeFilters]);

  /* Keep local filter state in sync with each input element */
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  /* Validate fields, then commit filters to trigger a results update */
  const handleSearch = (event) => {
    event.preventDefault();
    const nextErrors = {};

    /* Location is required — an empty search would return everything */
    if (!filters.location.trim()) {
      nextErrors.location = "Please enter a location.";
    }

    /* Reject dates in the past to avoid meaningless searches */
    if (filters.date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selected = new Date(filters.date);
      if (selected < today) {
        nextErrors.date = "Date cannot be in the past.";
      }
    }

    setErrors(nextErrors);

    /* Only apply filters when there are no validation errors */
    if (Object.keys(nextErrors).length === 0) {
      setActiveFilters(filters);
    }
  };

  return (
    <>
      {/* Hero — headline, CTA buttons, and platform stats */}
      <HomeHero />

      {/* Search section — filter inputs; results appear below on submit */}
      <section className="search-section">
        <h2 className="search-section-title">Find your next appointment</h2>
        <ServiceSearchForm
          filters={filters}
          errors={errors}
          onChange={handleFilterChange}
          onSubmit={handleSearch}
        />
      </section>

      {/*
       * Results section — only mounted after the first successful search.
       * Conditional render (not just hidden) so the page feels clean on load.
       */}
      {activeFilters !== null && (
        <section aria-label="Search results">
          <ServiceResults services={visibleServices} />
        </section>
      )}

      {/* CTA band — full-width blue overview for first-time visitors */}
      <section className="cta">
        <p className="overview-eyebrow">Why BePro</p>
        <h2>BePro connects customers and local professionals in one flow.</h2>
        <p className="overview-copy">
          Fast discovery, reliable booking, and clear schedule management for
          everyone — customers and service providers alike.
        </p>

        <div className="overview-stats">
          <article className="stat-card">
            <p className="stat-value">10,000+</p>
            <p className="stat-label">Active users</p>
          </article>
          <article className="stat-card">
            <p className="stat-value">4.8 / 5</p>
            <p className="stat-label">Average rating</p>
          </article>
          <article className="stat-card">
            <p className="stat-value">50,000+</p>
            <p className="stat-label">Bookings made</p>
          </article>
        </div>

        <div className="overview-actions">
          {/* Routes visitors to the provider catalogue */}
          <Link className="button button-light" to="/providers">
            Find services
          </Link>
          {/* Invites new service providers to register */}
          <Link className="button button-outline-light" to="/register">
            Join as provider
          </Link>
        </div>
      </section>
    </>
  );
}

export default HomePage;
