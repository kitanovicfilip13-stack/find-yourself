import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function saveResultToDb({ userId, segment, city, answers, resultLabel, userInfo }) {
  const { data, error } = await supabase.from('results').insert({
    user_id: userId,
    segment,
    city: city || null,
    answers,
    result_label: resultLabel || null,
    full_name: userInfo?.fullName || null,
    age: userInfo?.age || null,
    phone: userInfo?.phone || null,
    comment: userInfo?.comment || null,
  }).select().single()
  return { data, error }
}

export async function getUserResults(userId) {
  const { data, error } = await supabase
    .from('results')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function deleteResult(id) {
  const { error } = await supabase.from('results').delete().eq('id', id)
  return { error }
}
