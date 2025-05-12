export async function getClubsByUserId(
    userId: string
): Promise<Organization[]> {
    const response = await fetch(
        `http://localhost:8080/organizations?userId=${userId}`
    );
    const data = await response.json();
    return data.items;
}

export async function getClubById(id: string): Promise<Organization> {
    const response = await fetch(`http://localhost:8080/organizations/${id}`);
    return response.json();
}

export async function getAllClubs(): Promise<Organization[]> {
    const response = await fetch(`http://localhost:8080/organizations/all`);
    const data = await response.json();
    return data.items;
}

export async function getAnnouncementsByClubId(
    id: string
): Promise<Announcement[]> {
    const response = await fetch(
        `http://localhost:8080/announcements?organizationId=${id}`
    );
    const data = await response.json();
    return data.items;
}

export async function getUserById(id: string): Promise<User> {
    const response = await fetch(`http://localhost:8080/users/${id}`);
    return response.json();
}

export async function getEventsByClubId(id: string): Promise<Event[]> {
    const response = await fetch(
        `http://localhost:8080/events?organizationId=${id}`
    );
    const data = await response.json();
    return data.items;
}

export async function getReviewsByClubId(id: string): Promise<Review[]> {
    const response = await fetch(
        `http://localhost:8080/reviews?organizationId=${id}`
    );
    const data = await response.json();
    return data.items;
}

export async function getReviewsByUserId(id: string): Promise<Review[]> {
    const response = await fetch(`http://localhost:8080/reviews?userId=${id}`);
    const data = await response.json();
    return data.items;
}

export async function getCommentsByUserId(id: string): Promise<ClubComment[]> {
    const response = await fetch(`http://localhost:8080/comments?userId=${id}`);
    const data = await response.json();
    return data.items;
}

export async function getCommentsByReviewId(
    id: string
): Promise<ClubComment[]> {
    const response = await fetch(
        `http://localhost:8080/comments?reviewId=${id}`
    );
    const data = await response.json();
    return data.items;
}

export async function getCommentsByParentCommentId(
    id: string
): Promise<ClubComment[]> {
    const response = await fetch(
        `http://localhost:8080/comments?commentId=${id}`
    );
    const data = await response.json();
    return data.items;
}
