export const ROUTES = {
  USER_AUTH: 'https://echo-be.vercel.app/api/user_auth',
  USER_LOGIN: 'https://echo-be.vercel.app/api/user_login',
  JOURNAL_UPLOAD: 'https://echo-be.vercel.app/api/journal/upload',
  JOURNAL_LOAD: 'https://echo-be.vercel.app/api/journal/load',
};


export const handleFirstUpload = async (uid, entry, mood) => {
  try {
    const response = await postJournalUpload(uid, entry, mood);
    console.log("First journal entry uploaded:", response);
    return response;
  } catch (error) {
    console.error("Error in handleFirstUpload:", error);
    return null;
  }
};

export async function postUserAuth(uid, name) {
  console.log("Calling postUserAuth with:", uid, name);
  try {
    const res = await fetch(ROUTES.USER_AUTH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: uid, name }), // Changed uid to user_id
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("API Error:", res.status, errorText);
      throw new Error(`Failed to authenticate user: ${res.status}`);
    }
``
    const data = await res.json();
    console.log("User Auth Response:", data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Re-throw so caller can handle it
  }
}

export async function postUserLogin(uid) {
  console.log("POSTING TO: /api/user_login", { uid });

  const response = await fetch(ROUTES.USER_LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: uid }),
  });

  if (!response.ok) throw new Error("Failed to login user");
  return await response.json();
}

export async function postJournalUpload(uid, entry, mood) {
  const response = await fetch(ROUTES.JOURNAL_UPLOAD, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      user_id: uid, 
      prompt: entry, 
      emotions: mood
    }),
  });

  if (!response.ok) throw new Error("Failed to submit journal entry");
  return await response.json();
}

export async function postJournalLoad(uid, date) {
  const formattedDate = new Date(date).toISOString().split('T')[0]; // Line 61
  const response = await fetch(ROUTES.JOURNAL_LOAD, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      user_id: uid, 
      date: formattedDate // Use formattedDate here
    }),
  });

  if (!response.ok) throw new Error("Failed to load journal entry");
  return await response.json();
}

export const submitJournalEntry = async (uid, prompt, emotions) => {
  try {
    const response = await postJournalUpload(uid, prompt, emotions);
    return response;
  } catch (error) {
    console.error("Error submitting journal entry:", error);
    return null;
  }
};