"use client";

export default function LoginPage() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password"),
      }),
    });

    console.log(await response.json());
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl mb-2">Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input name="username" type="text" className="block my-2" />

        <label>Password</label>
        <input name="password" type="text" className="block my-2" />

        <button
          type="submit"
          className="bg-blue-500 px-4 py-2 rounded text-white"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        Having trouble? Make sure your username and password hash to the same
        thing 😉
      </p>
    </div>
  );
}
