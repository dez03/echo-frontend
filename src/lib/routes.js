export const ROUTES = {
  ANONYMOUS_REFLECTION: 'http://localhost:8000/api/anonymous',
  FIRST_UPLOAD: 'http://localhost:8000/api/anonymous',
};


// POST Request to submit an anonymous reflection
// This function handles the submission of an anonymous reflection entry
// It sends the entry and mood to the server and handles the response
const handleAnonymousSubmit = async (prompt, mood) => {
  try {
    const res = await fetch(ROUTES.ANONYMOUS_REFLECTION, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        mood,
      }),
    });

    const data = await res.json();

    if (data.status === 'success') {
      // ✅ Server responded with reflection
      setReflection(data.reflection); // show reflection on screen

      // Now hold onto this data. If user signs up, send it to first_upload route
    }
  } catch (error) {
    console.error('Error submitting anonymous prompt:', error);
  }
};


// POST Request to save a entry and reflection after user signup
const handleFirstUpload = async (user, prompt, mood, reflection) => {
  try {
    await fetch(ROUTES.FIRST_UPLOAD, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: user.displayName,
        uid: user.uid,
        prompt,
        mood,
        reflection,
      }),
    });
  } catch (error) {
    console.error('Error uploading first entry:', error);
  }
};

export { handleAnonymousSubmit, handleFirstUpload };