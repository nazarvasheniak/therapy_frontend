export class LocalStorageHelper {
    static getToken(): string {
        const token = localStorage.getItem('Authorization');
        if (!token) return;

        return token
    }

    static saveToken(token: string): boolean {
        if (!token) return false;

        localStorage.setItem('Authorization', token);
        return true;
    }

    static removeToken(): void {
        localStorage.removeItem('Authorization');
    }
}