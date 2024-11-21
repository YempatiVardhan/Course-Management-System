// "use client";

// import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { useState } from "react";

// // Define the type for calendar events
// interface CalendarEvent {
//   title: string; // Will display the `zoomLink`
//   start: Date;
//   end: Date;
// }

// const localizer = momentLocalizer(moment);

// const BigCalendar = ({ events }: { events: CalendarEvent[] }) => {
//   const [view, setView] = useState<View>(Views.WORK_WEEK);

//   const handleOnChangeView = (selectedView: View) => {
//     setView(selectedView);
//   };

//   return (
//     <Calendar
//       localizer={localizer}
//       events={events}
//       startAccessor="start"
//       endAccessor="end"
//       views={["work_week", "day"]}
//       view={view}
//       style={{ height: "98%" }}
//       onView={handleOnChangeView}
//       min={new Date(2025, 1, 0, 8, 0, 0)}
//       max={new Date(2025, 1, 0, 17, 0, 0)}
//     />
//   );
// };

// export default BigCalendar;

"use client"; // Ensure client-side rendering for React Big Calendar

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

// Type definition for calendar events
interface CalendarEvent {
  title: string;      // Event title
  start: Date;        // Event start time
  end: Date;          // Event end time
  zoomLink?: string;  // Optional Zoom link
}

// Localizer for the calendar using moment.js
const localizer = momentLocalizer(moment);

const BigCalendar = ({ events }: { events: CalendarEvent[] }) => {
  // State for the current calendar view
  const [view, setView] = useState<View>(Views.WORK_WEEK);
  // State for the selected event
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  // Handle view change
  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  // Handle event selection
  const handleEventSelect = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events} // Pass events as props
        startAccessor="start"
        endAccessor="end"
        views={["work_week", "day"]} // Limit available views
        view={view}
        onView={handleOnChangeView}
        onSelectEvent={handleEventSelect}
        min={new Date(2025, 1, 0, 8, 0, 0)} // Start of workday
        max={new Date(2025, 1, 0, 17, 0, 0)} // End of workday
        style={{ height: "98%" }}
      />

      {/* Display selected event details */}
      {selectedEvent && (
        <div className="event-details mt-4">
          <h4>{selectedEvent.title}</h4>
          {selectedEvent.zoomLink && (
            <p>
              Zoom Link:{" "}
              <a
                href={selectedEvent.zoomLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedEvent.zoomLink}
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BigCalendar;
