import PageIntroCard from "../components/PageIntroCard";

function CustomerDashboardPage() {
  return (
    <PageIntroCard
      title="Customer Dashboard"
      description="Overview of upcoming appointments, booking history, and notifications."
    >
      <div className="result-list">
        <article className="result-card">
          <p className="result-title">Upcoming appointment</p>
          <p>Math Tutor - Anna · 11 May · 15:00</p>
        </article>
        <article className="result-card">
          <p className="result-title">Booking history</p>
          <p>Driving Lessons with Michael · Completed</p>
        </article>
        <article className="result-card">
          <p className="result-title">Notifications</p>
          <p>Reminder: your next appointment starts in 24 hours.</p>
        </article>
      </div>
    </PageIntroCard>
  );
}

export default CustomerDashboardPage;
