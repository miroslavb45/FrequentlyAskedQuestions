import Auth from '../authentication/Auth';
export const Validations = {
    notStartingWithSpace: /^(?!\s*$).+/
};

export function isEditableByCurrentUser(author) {
    const activeUser = Auth.getActiveUser();

    return activeUser === author;
};