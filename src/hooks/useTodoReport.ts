// hooks/useTodoReport.ts
import { useState } from 'react';
import { TodoReport } from '@/util/interfaces';
import apiClient from '@/lib/axios';

export const useTodoReport = () => {
    const [report, setReport] = useState<TodoReport | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchReport = async () => {
        try {
            const response = await apiClient.get<TodoReport>('/todos/report');
            setReport(response.data);
        } catch (err) {
            console.error(err);
            setError('Failed to load todo report');
        } finally {
            setLoading(false);
        }
    };

    return { report, loading, error, fetchReport };
};
