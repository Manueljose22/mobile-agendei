export type IDoctorAvailabilityPeriod = {
  id: string;
  doctorId: string;
  date: string | Date;
  hourStart: string | Date;
  hourEnd: string | Date;
  isBlocked: boolean;
  scheduleRuleId: string | null;
  scheduleExceptionId: string | null;
};

export type IDoctorScheduleException = {
  id: string;
  date: string | Date;
  type: "BLOCK_DAY" | "BLOCK_PERIOD" | "EXTRA_PERIOD";
  startMinute: number | null;
  endMinute: number | null;
  reason?: string | null;
};

export type IDoctorAvailabilityResponse = {
  availabilities: IDoctorAvailabilityPeriod[];
  exceptions: IDoctorScheduleException[];
};
