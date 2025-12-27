// game/systems/job-system.ts
import { JOB_ROLES } from "@/game/data/jobs";

type HasWealthAndJob = {
  jobRoleId?: string;
  stats: {
    wealth: {
      cash: number;
      debt: number;
    };
    // other stat groups can exist, we don't care here
    [k: string]: any;
  };
};

export function getJobRoleById(jobRoleId?: string | null) {
  if (!jobRoleId) return undefined;
  return JOB_ROLES.find((j) => j.id === jobRoleId);
}

/**
 * Pays weekly wage while preserving the exact player type (Player, Character, etc).
 */
export function applyWeeklyJobPay<T extends HasWealthAndJob>(player: T): T {
  const job = getJobRoleById(player.jobRoleId);
  if (!job) return player;

  const pay = job.weeklyPay.amount;
  if (!pay) return player;

  return {
    ...player,
    stats: {
      ...player.stats,
      wealth: {
        ...player.stats.wealth,
        cash: player.stats.wealth.cash + pay,
      },
    },
  };
}
