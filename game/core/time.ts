export const WEEKS_PER_YEAR = 52;

export function weeksToYears(weeksTotal: number) {
  const years = Math.floor(weeksTotal / WEEKS_PER_YEAR);
  const weeks = weeksTotal % WEEKS_PER_YEAR;

  return { years, weeks };
}
