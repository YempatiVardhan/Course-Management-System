// IT APPEARS THAT BIG CALENDAR SHOWS THE LAST WEEK WHEN THE CURRENT DAY IS A WEEKEND.
// FOR THIS REASON WE'LL GET THE LAST WEEK AS THE REFERENCE WEEK.
// IN THE TUTORIAL WE'RE TAKING THE NEXT WEEK AS THE REFERENCE WEEK.

const getLatestMonday = (): Date => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const latestMonday = today;
    latestMonday.setDate(today.getDate() - daysSinceMonday);
    return latestMonday;
  };
  
  export const adjustScheduleToCurrentWeek = (
    batches: { title: string; start: Date; end: Date }[]
  ): { title: string; start: Date; end: Date }[] => {
    const latestMonday = getLatestMonday();
  
    return batches.map((batches) => {
      const lessonDayOfWeek = batches.start.getDay();
  
      const daysFromMonday = lessonDayOfWeek === 0 ? 6 : lessonDayOfWeek - 1;
  
      const adjustedStartDate = new Date(latestMonday);
  
      adjustedStartDate.setDate(latestMonday.getDate() + daysFromMonday);
      adjustedStartDate.setHours(
        batches.start.getHours(),
        batches.start.getMinutes(),
        batches.start.getSeconds()
      );
      const adjustedEndDate = new Date(adjustedStartDate);
      adjustedEndDate.setHours(
        batches.end.getHours(),
        batches.end.getMinutes(),
        batches.end.getSeconds()
      );
  
      return {
        title: batches.title,
        start: adjustedStartDate,
        end: adjustedEndDate,
      };
    });
  };
  