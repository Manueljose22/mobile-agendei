export const queryKeys = {
  doctors: {
    all: ["doctors"] as const,
    detail: (id: string) => ["doctors", id] as const,
    services: (id: string) => ["doctors", id, "services"] as const,
  },
  specialities: {
    all: ["specialities"] as const,
  },
  hospitals: {
    all: ["hospitals"] as const,
    detail: (id: string) => ["hospitals", id] as const,
  },
};
