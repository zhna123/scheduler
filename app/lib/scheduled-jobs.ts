import schedule from 'node-schedule';

export const scheduledJobs: { [jobName: string]: schedule.Job } = {};
