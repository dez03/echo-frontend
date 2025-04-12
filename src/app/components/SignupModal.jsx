

function SignupModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
        <h2 className="text-lg font-semibold mb-4">Enjoying your reflection?</h2>
        <p className="mb-4">Sign up to save your entries and unlock more insights.</p>
        <a
          href="/signup"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Sign up
        </a>
      </div>
    </div>
  );
}
export default SignupModal;