import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

### Patterns

| name       | type        | format | required |
|------------|-------------|--------|----------|
| created_at | timestamptz | string | true     |
| patterns   | text[]      | array  | true     |
| id         | uuid        | string | true     |
| file_name  | text        | string | true     |

*/

export const usePatterns = () => useQuery({
    queryKey: ['Patterns'],
    queryFn: () => fromSupabase(supabase.from('Patterns').select('*')),
});

export const usePattern = (id) => useQuery({
    queryKey: ['Patterns', id],
    queryFn: () => fromSupabase(supabase.from('Patterns').select('*').eq('id', id).single()),
});

export const useAddPattern = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newPattern) => fromSupabase(supabase.from('Patterns').insert([newPattern])),
        onSuccess: () => {
            queryClient.invalidateQueries('Patterns');
        },
    });
};

export const useUpdatePattern = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedPattern) => fromSupabase(supabase.from('Patterns').update(updatedPattern).eq('id', updatedPattern.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('Patterns');
        },
    });
};

export const useDeletePattern = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('Patterns').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('Patterns');
        },
    });
};