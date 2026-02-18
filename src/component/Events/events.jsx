import { events } from "../../data/eventsData";
import DotGrid from "../DotGrid";
import "./events.css";

const EventCard = ({ event }) => {
  return (
    <div className="event-card">

      {/* Image Section - dark blurred area */}
      <div className="event-card__image-area">
        <img
          src={event.image || "/images/emblazon-logo.svg"}
          alt={event.title}
          className="event-card__image"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "/images/emblazon-logo.svg";
          }}
        />

        {/* Registration Badge - top right, dark bg, orange text */}
        <div className="event-card__status-badge">
          {(event.registrationStatus || "").toUpperCase()}
        </div>

        {/* Category Badge - centered in image area, below status */}
        <span className="event-card__category-badge">
          {(event.category || "").toUpperCase()}
        </span>
      </div>

      {/* Content Section */}
      <div className="event-card__content">
        <h3 className="event-card__title">{event.title}</h3>
        <p className="event-card__description">{event.description}</p>
        <div className="event-card__meta">
          {new Date(event.date).toLocaleDateString("en-IN", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}{" "}
          | {event.time}
        </div>
        <div className="event-card__location">{event.location}</div>
      </div>
    </div>
  );
};


const EventSection = ({ title, events }) => {
  if (!events.length) return null;

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="event-section">
      {title && (
        <h3 className="event-section__title">
          {title}
        </h3>
      )}

      <div className="event-cards-grid">
        {sortedEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

const Event = () => {
  const mainEvents = events.filter(
    (e) =>
      e.category === "Cultural" ||
      e.category === "Fun" ||
      e.category === "Drama"
  );

  const literaryEvents = events.filter(
    (e) => e.category === "Literary/Fine Arts"
  );

  const musicEvents = events.filter(
    (e) => e.category === "Music"
  );

  const danceEvents = events.filter(
    (e) => e.category === "Dance"
  );

  return (
    <section id="events" className="section section-event relative min-h-screen" style={{ paddingTop: "13vh" }}>
      <div className="absolute inset-0 z-0">
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#271E37"
          activeColor="#5227FF"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      <div className="event-container">
        <h2 className="events-main-title">LIST OF EVENTS OF EMBLAZON-2K26</h2>

        <EventSection
          title=""
          events={mainEvents}
        />

        <EventSection
          title="Literary / Fine Art Events"
          events={literaryEvents}
        />

        <EventSection
          title="Music"
          events={musicEvents}
        />

        <EventSection
          title="Dance"
          events={danceEvents}
        />

      </div>
    </section>
  );
};

export default Event;
