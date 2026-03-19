/**
 * Teacher Reinforcement Request & Session Models
 * Aligned to /api/teacher endpoints
 */

// ─── Requests List ────────────────────────────────────────────────────────────

export interface TeacherRequestItemDTO {
  requestId: number;
  studentName: string;
  subjectName: string;
  sessionType: string;
  reason: string;
  statusName: string;
  statusId: number;
  createdAt: string;
  isGroupal: boolean;
  participantCount: number;
  preferredDayName: string | null;
  preferredStartTime: string | null;
  preferredEndTime: string | null;
}

export interface TeacherRequestsPageDTO {
  items: TeacherRequestItemDTO[];
  totalCount: number;
  page: number;
  size: number;
  totalPages: number;
}

// ─── Modalities ─────────────────────────────────────────────────────

export interface ModalityDTO {
  idModality: number;
  modality: string;   // e.g. "Virtual", "Presencial"
  state: boolean;
}

// ─── Work Area Types ─────────────────────────────────────────────────────────

export interface WorkAreaTypeDTO {
  workAreaTypeId: number;
  workAreaType: string;
  state: boolean;
}

// ─── Accept / Reschedule body ─────────────────────────────────────────────────

export interface AcceptRescheduleBodyDTO {
  scheduledDate: string;        // YYYY-MM-DD
  startTime: string;            // HH:mm (legacy frontend)
  endTime: string;              // HH:mm (legacy frontend)
  timeSlotId?: number | null;   // contrato actual backend
  modalityId: number;
  estimatedDuration: string;    // HH:mm
  reason?: string;
  workAreaTypeId: number | null; // legacy frontend
  workAreaId?: number | null;    // contrato actual backend
}

// ─── Reject / Cancel body ─────────────────────────────────────────────────────

export interface ReasonBodyDTO {
  reason?: string;
}

// ─── Generic API response ────────────────────────────────────────────────────

export interface ApiActionResponseDTO {
  id: number;
  status: string;
  message: string;
}

// ─── Sessions ────────────────────────────────────────────────────────────────

export interface VirtualLinkBodyDTO {
  url: string;
}

export interface AttendanceEntryDTO {
  participantId: number;
  attended: boolean;
}

export interface SessionParticipantDTO {
  attendanceId: number;
  participantId: number;
  studentName: string;
  attended: boolean;
}

export interface RegisterAttendanceBodyDTO {
  performedId: number;
  attendances: AttendanceEntryDTO[];
}

// ─── Active Sessions ─────────────────────────────────────────────────────────

/** DTO retornado por GET /api/teacher/sessions/active (TeacherActiveSessionItemDTO) */
export interface TeacherHistoryItemDTO {
  scheduledId: number;
  subjectName: string;
  scheduledDate: string;
  startTime: string;
  endTime: string;
  modality: string;
  estimatedDuration: string;
  /** Estado actual: "Espera espacio" | "Reprogramado" | "Programado" */
  statusName: string;
  sessionType: string;
  participantCount: number;
  virtualLink: string | null;
}

// ─── Session History (Completed) ─────────────────────────────────────────────

/** DTO retornado por GET /api/teacher/history/sessions (lista paginada) */
export interface TeacherSessionHistoryItemDTO {
  scheduledId: number;
  subjectName: string;
  scheduledDate: string;
  modality: string;
  estimatedDuration: string;
  timeSlot: string;
  statusName: string;
  sessionType: string;
  studentCount: number;
  totalParticipants: number;
  attendedCount: number;
  attendancePercentage: number;
  resourceCount: number;
}

export interface HistoryParticipantDTO {
  participantId: number;
  studentName: string;
  attended: boolean;
}

/** DTO retornado por GET /api/teacher/history/sessions/{scheduledId} (detalle) */
export interface TeacherSessionHistoryDetailDTO {
  scheduledId: number;
  subjectName: string;
  scheduledDate: string;
  modality: string;
  timeSlot: string;
  sessionType: string;
  statusName: string;
  estimatedDuration: string;
  observation: string | null;
  actualDuration: string | null;
  totalParticipants: number;
  attendedCount: number;
  attendancePercentage: number;
  attendance: HistoryParticipantDTO[];
  resources: string[];
  virtualLink: string | null;
}

export interface TeacherSessionHistoryPageDTO {
  items: TeacherSessionHistoryItemDTO[];
  page: number;
  size: number;
  totalCount: number;
  totalPages: number;
}

// ─── Legacy / kept for auth-service compatibility ────────────────────────────

/** @deprecated Use TeacherRequestItemDTO */
export interface TeacherRequestRowDTO {
  requestId: number;
  requestDateTime: string;
  studentName: string;
  subjectCode: string;
  subjectName: string;
  topic: string;
  sessionType: string;
  status: string;
  totalCount: number;
}

export interface StatusSummaryDTO {
  statusId: number;
  status: any;
  total: number;
}

export interface UpdateStatusResponseDTO {
  requestId: number;
  status: string;
  message: string;
}

export interface ReinforcementRequestStatusDTO {
  idReinforcementRequestStatus: number;
  nameState: string;
  state: boolean;
}

/** @deprecated Use TeacherRequestItemDTO */
export interface ReinforcementRequestDTO {
  reinforcementRequestId: number;
  requestedDay: number;
  reason: string;
  fileUrl: string;
  createdAt: string;
  studentId: number;
  teacherId: number;
  topicId: number;
  timeSlotId: number;
  modalityId: number;
  sessionTypeId: number;
  requestStatusId: number;
  periodId: number;
}
