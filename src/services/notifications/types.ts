export type INotification = {
    id: string;
    title: string;
    message: string;
    type: string;
    data?: unknown;
    isRead: boolean;
    appointmentId?: string | null;
    rescheduleProposalId?: string | null;
    createdAt: string;
};

export type INotificationsResponse = { notifications: INotification[] };