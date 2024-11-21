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

"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

// Define the type for calendar events
interface CalendarEvent {
  title: string;  // Event title
  start: Date;  // Event start time
  end: Date;  // Event end time
  zoomLink?: string;  // Optional Zoom link
}

// Initialize the moment localizer for the calendar
const localizer = momentLocalizer(moment);

const BigCalendar = ({ events }: { events: CalendarEvent[] }) => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);  // Default view is work week
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);  // To store the selected event

  // Handle change of view in the calendar
  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);  // Set the selected view (e.g., "work_week", "day", etc.)
  };

  // Display event details (like Zoom link) when an event is selected
  const handleEventSelect = (event: CalendarEvent) => {
    setSelectedEvent(event);  // Store the selected event
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}  // Pass the events array
        startAccessor="start"  // Start date accessor
        endAccessor="end"  // End date accessor
        views={["work_week", "day"]}  // Available views
        view={view}  // Set current view
        style={{ height: "98%" }}  // Set calendar height
        onView={handleOnChangeView}  // Handle view change
        min={new Date(2025, 1, 0, 8, 0, 0)}  // Min time for the calendar (8 AM)
        max={new Date(2025, 1, 0, 17, 0, 0)}  // Max time for the calendar (5 PM)
        onSelectEvent={handleEventSelect}  // Select an event and show details
      />

      {selectedEvent && (
        <div className="event-details">
          <h4>{selectedEvent.title}</h4>
          <p>Zoom Link: <a href={selectedEvent.zoomLink} target="_blank" rel="noopener noreferrer">{selectedEvent.zoomLink}</a></p>
        </div>
      )}
    </div>
  );
};

export default BigCalendar;

