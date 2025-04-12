export const ROUTES = {
  ANONYMOUS_REFLECTION: 'echo-be.vercel.app/api/anonymous',
  FIRST_UPLOAD: 'http://localhost:8000/api/anonymous',
};


// POST Request to submit an anonymous reflection
// This function handles the submission of an anonymous reflection entry
// It sends the entry and mood to the server and handles the response
const handleAnonymousSubmit = async (prompt, emotions) => {
  try {
    const res = await fetch(ROUTES.ANONYMOUS_REFLECTION, {
      method: 'POST',
      params: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        emotions,
      }),
    });

    const data = await res.json();

    if (data.status === 'success') {
      // ✅ Server responded with reflection
      setReflection(data.reflection); // show reflection on screen

      // Now hold onto this data. If user signs up, send it to first_upload route
    }

// FAKE USE ABOVE WHEN SERVER IS REAL
    // const fakeReflections = [
    //   "You're on the right path — keep going.",
    //   "There's more strength in you than you know.",
    //   "It's okay to slow down and breathe.",
    // ];
    
    // const simulatedResponse = {
    //   status: 'success',
    //   reflection: fakeReflections[Math.floor(Math.random() * fakeReflections.length)],
    // };
    
    // // Simulate delay
    // await new Promise((res) => setTimeout(res, 1000));
    
    // setReflection(simulatedResponse.reflection);

  } catch (error) {
    console.error('Error submitting anonymous prompt:', error);
  }
};


// POST Request to save a entry and reflection after user signup
const handleFirstUpload = async (user, prompt, emotions, reflection) => {
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
        emotions,
        reflection,
      }),
    });
  } catch (error) {
    console.error('Error uploading first entry:', error);
  }
};

export { handleAnonymousSubmit, handleFirstUpload };