"use client";

export class SpeedWeekAPI {
    
    public static URL(path: string): string {
        return `${ process.env.NEXT_PUBLIC_BASE_API_URL }${ path }`;
    }

    public static async fetch<T extends keyof SpeedWeekAPI.$_RequestSchema>(path: T | `${ T }?${ string }`, init?: RequestInit): Promise<SpeedWeekAPI.Response<SpeedWeekAPI.$_RequestSchema[T]>> {
        const response = await window.fetch(this.URL(path as string), {
            ...init,
            credentials: "include",
        });

        const json = await response.json();

        return {
            success: response.ok,
            ...json
        }
    }
}