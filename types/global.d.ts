type Brand<K, T> = K & { __brand: T };

type UserId = Brand<string, "UserID">;
type OrganizationId = Brand<string, "OrganizationID">;
type AnnouncementId = Brand<string, "AnnouncementID">;
type ReviewId = Brand<string, "ReviewID">;
type CommentId = Brand<string, "CommentID">;
type FileId = Brand<string, "FileID">;
type EventId = Brand<string, "EventID">;
type ReportId = Brand<string, "ReportID">;