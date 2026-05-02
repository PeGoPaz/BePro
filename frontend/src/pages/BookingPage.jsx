import { useState } from "react";
import PageIntroCard from "../components/PageIntroCard";

function BookingPage() {
  const [form, setForm] = useState({
    serviceId: "",
    bookingDate: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.serviceId) nextErrors.serviceId = "Choose a service.";
    if (!form.bookingDate) nextErrors.bookingDate = "Choose booking date.";
    setErrors(nextErrors);
  };

  return (
    <PageIntroCard
      title="Appointment Booking Page"
      description="Booking form with client-side checks for required fields."
    >
      <form className="search-grid" onSubmit={handleSubmit} noValidate>
        <label>
          Service
          <select name="serviceId" value={form.serviceId} onChange={handleChange}>
            <option value="">Select service</option>
            <option value="srv-1">Driving Lessons with Michael</option>
            <option value="srv-2">Math Tutor - Anna</option>
            <option value="srv-3">Urban Barber</option>
          </select>
          {errors.serviceId ? <span className="error">{errors.serviceId}</span> : null}
        </label>
        <label>
          Booking date
          <input
            name="bookingDate"
            type="datetime-local"
            value={form.bookingDate}
            onChange={handleChange}
          />
          {errors.bookingDate ? (
            <span className="error">{errors.bookingDate}</span>
          ) : null}
        </label>
        <label>
          Notes
          <textarea
            name="notes"
            rows="4"
            value={form.notes}
            onChange={handleChange}
            placeholder="Optional message for provider..."
          />
        </label>
        <button className="button button-primary" type="submit">
          Confirm booking
        </button>
      </form>
    </PageIntroCard>
  );
}

export default BookingPage;
