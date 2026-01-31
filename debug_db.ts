
import { createClient } from '@supabase/supabase-js'

const url = "https://gnhbihccsgckebgiluzb.supabase.co"
const key = "sb_publishable_FSKMCnRe1xwBowyYUk89Aw_8UL1SGAH"

const supabase = createClient(url, key)

async function test() {
    console.log("Testing connection...");

    // Test 1: Simple fetch
    const { data, error } = await supabase.from('companies').select('*').limit(1);

    if (error) {
        console.error("Error fetching companies:", error);
    } else {
        console.log("Successfully fetched 1 company.");
        console.log("Columns present:", data && data.length > 0 ? Object.keys(data[0]) : "No data returned");
    }

    // Test 2: Dashboard query specific
    console.log("\nTesting Dashboard query (order by created_at)...");
    const { data: dashData, error: dashError } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

    if (dashError) {
        console.error("Dashboard Query Error:", dashError);
    } else {
        console.log("Dashboard Query Success.");
    }
}

test();
