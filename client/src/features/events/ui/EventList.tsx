'use client';

const events = [
  {
    date: "November 16, 2024 – March 3, 2025",
    title: "7 Billion Project",
    location: "Sun Lah, Seoul, KR"
  },
  {
    date: "Jan 21, 2025",
    title: "Sound Installation",
    location: "Seoul Museum of Art, Seoul, KR"
  }
];

export function EventList() {
  return (
    <main className="space-y-12">
      {events.map((event, index) => (
        <div key={index} className="space-y-1">
          <p className="text-lg">{event.date}</p>
          <p className="text-lg">{event.title}</p>
          <p className="text-lg">{event.location}</p>
        </div>
      ))}
    </main>
  );
} 