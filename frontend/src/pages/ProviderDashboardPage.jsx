import PageIntroCard from "../components/PageIntroCard";

function ProviderDashboardPage() {
  return (
    <PageIntroCard
      title="Service Provider Dashboard"
      description="Manage schedule, appointment requests, and availability settings."
    >
      <div className="result-list">
        <article className="result-card">
          <p className="result-title">Today schedule</p>
          <p>3 appointments booked · next at 13:00.</p>
        </article>
        <article className="result-card">
          <p className="result-title">Pending requests</p>
          <p>2 requests waiting for confirmation.</p>
        </article>
        <article className="result-card">
          <p className="result-title">Availability</p>
          <p>Mon-Fri · 09:00-18:00</p>
        </article>
      </div>
    </PageIntroCard>
  );
}

export default ProviderDashboardPage;
